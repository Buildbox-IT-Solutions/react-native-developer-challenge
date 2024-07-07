import { HttpClient } from "../adapters/AxiosHttpClientAdapter";

interface IResponse {
  body: any;
  status: number;
  statusText: string;
}

interface IUnsplashGateway {
  index: () => Promise<IResponse>;
}

export class UnsplashGateway implements IUnsplashGateway {
  constructor(readonly httpClient: HttpClient) {}

  async index(): Promise<IResponse> {
    return await this.httpClient.request({
      method: "get",
      url: "https://api.unsplash.com/photos/?client_id=muetx3ACnjt02pvQk495pLDHnr928DJQxJYeBZvaeYo",
    });
  }
}
