const baseUrl = 'https://rickandmortyapi.com/api';

type RequestType<T> = Promise<T>;

type RequestBodyType = Record<string, any>;

const requestInterceptor = (url: string, options: any) => {
  if (!options.headers) {
    options.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };
  }

  return { url, options };
};

const responseInterceptor = async (
  response: Response & { _retry?: boolean },
): Promise<any> => {
  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message);
  }

  try {
    const data = await response.json();
    return data;
  } catch (err) {
    return null;
  }
};

const fetchConfig = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const apiUrl = `${baseUrl}${url}`;
  const { url: updatedUrl, options: updatedOptions } = requestInterceptor(
    apiUrl,
    options,
  );

  try {
    const response = await fetch(updatedUrl, updatedOptions);
    const interceptedResponse = await responseInterceptor(response);
    return interceptedResponse;
  } catch (error) {
    return Promise.reject(
      Object.prototype.hasOwnProperty.call(error, 'response.data')
        ? (error as any).response.data
        : error,
    );
  }
};

const api = {
  get: <T>(url: string, options?: RequestInit): RequestType<T> =>
    fetchConfig<T>(url, { ...options, method: 'GET' }),
  post: <T>(url: string, body?: any, options?: RequestInit): RequestType<T> =>
    fetchConfig<T>(url, {
      ...options,
      method: 'POST',
      body: options?.headers ? body : JSON.stringify(body),
    }),
  put: <T>(url: string, body: RequestBodyType): RequestType<T> =>
    fetchConfig<T>(url, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(url: string): RequestType<T> =>
    fetchConfig<T>(url, { method: 'DELETE' }),
  patch: <T>(url: string, body: RequestBodyType): RequestType<T> =>
    fetchConfig<T>(url, { method: 'PATCH', body: JSON.stringify(body) }),
};

export default api;
