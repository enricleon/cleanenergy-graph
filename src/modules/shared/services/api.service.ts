import { $Fetch } from 'ohmyfetch';

export default class ApiService {
  private $fetch: $Fetch;

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher;
  }

  async call<T>(method: string, url: string, data?: object, extras = {}): Promise<T> {
    const $res: T = await this.$fetch(url, { method, body: data, ...extras });
    return $res;
  }
}
