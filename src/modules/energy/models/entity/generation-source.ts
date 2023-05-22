import GenerationSourceResponse from '@/modules/energy/models/response/generation-source.response';
import TimeSeries from '@/modules/shared/models/ui/time-series';

export class GenerationSource {
  public timeSeries!: TimeSeries[];

  public constructor(init?: Partial<GenerationSource>) {
    Object.assign(this, init);
  }

  public static FromResponse(responseModel: GenerationSourceResponse) {
    const model = {
      timeSeries: responseModel.included?.map(
        (serie) =>
          new TimeSeries({
            title: serie.attributes.title,
            data: serie.attributes.values.map((item) => ({
              time: new Date(item.datetime),
              percentage: item.percentage,
              value: item.value
            }))
          })
      )
    };

    return new GenerationSource(model);
  }

  // All classes to be used when mapped to a state property in a component needs this
  // https://stackoverflow.com/a/68301358
  public toJSON() {
    return { ...this };
  }
}
