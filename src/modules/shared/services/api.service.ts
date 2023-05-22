import { $Fetch } from 'ohmyfetch';

export default class ApiService {
  private $fetch: $Fetch;

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher;
  }

  async call<T>(method: string, url: string, data?: object, extras = {}): Promise<T> {
    console.log(`Starting request to: ${url}`);
    const $res: T = await this.$fetch(url, { method, body: data, ...extras });
    console.log(`Request to: ${url} ended`);
    return $res;
  }
}
