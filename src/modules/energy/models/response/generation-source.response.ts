export default interface GenerationSourceResponse {
  data: {
    type: string;
    id: string;
    attributes: {
      title: string;
      'last-update': string;
      description: null;
    };
    meta: {
      'cache-control': {
        cache: string;
        expireAt: string;
      };
    };
  };
  included: {
    type: string;
    id: string;
    groupId: null;
    attributes: {
      title: string;
      description: null | string;
      color: string;
      type: string;
      magnitude: null;
      composite: boolean;
      'last-update': string;
      values: {
        value: number;
        percentage: number;
        datetime: string;
      }[];
    };
  }[];
}
