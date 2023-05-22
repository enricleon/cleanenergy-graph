import ApiService from '@/modules/shared/services/api.service';
import GenerationSourceResponse from '@/modules/energy/models/response/generation-source.response';
import TimeAggregationEnum from '@/modules/shared/models/enum/time-aggregation.enum';
import { toISOString } from '@/modules/shared/utils/date.util';

// Ideally this should be placed inside energy module. It should be discovered and injected automatically

export default class EnergyService extends ApiService {
  private RESOURCE = '/generacion';

  async getGenerationSource({
    startDate,
    endDate,
    aggregated
  }: {
    startDate: Date;
    endDate: Date;
    aggregated: TimeAggregationEnum;
  }): Promise<GenerationSourceResponse> {
    const query = {
      start_date: toISOString(startDate),
      end_date: toISOString(endDate),
      time_trunc: aggregated
    };

    return await this.call<GenerationSourceResponse>(
      'GET',
      `${this.RESOURCE}/evolucion-renovable-no-renovable`,
      undefined,
      {
        query
      }
    );
  }
}
