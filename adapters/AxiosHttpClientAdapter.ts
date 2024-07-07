import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  isAxiosError,
} from "axios";

export interface HttpRequest {
  url: string;
  method: "get" | "post" | "put" | "delete";
  headers?: AxiosHeaders;
  body?: any;
}

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<R>;
}

export class AxiosHttpClientAdapter implements HttpClient {
  async request(data: HttpRequest) {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        headers: data.headers,
        data: data.body,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.request);
      }

      const _error = error as AxiosError<{ message: string }>;

      throw new Error(_error?.response?.data?.message);
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}

export const httpClientFactory = () => new AxiosHttpClientAdapter();
