export default class TimeSeries {
  public title!: string;
  public data: {
    time: Date;
    percentage: number;
    value: number;
  }[] = [];

  public constructor(init?: Partial<TimeSeries>) {
    Object.assign(this, init);
  }

  // All classes to be used when mapped to a state property in a component needs this
  // https://stackoverflow.com/a/68301358
  public toJSON() {
    return { ...this };
  }
}
