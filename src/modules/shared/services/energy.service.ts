import ApiService from '@/modules/shared/services/api.service';
import GenerationSourceResponse from '@/modules/shared/models/response/generation-source.response';

// Ideally this should be placed inside energy module. It should be discovered and injected automatically

export default class EnergyService extends ApiService {
  private RESOURCE = '/generacion';

  async getGenerationSource(): Promise<GenerationSourceResponse> {
    return await this.call<GenerationSourceResponse>('GET', `${this.RESOURCE}/estructura-generacion`, undefined, {
      query: {
        start_date: '2014-01-01T00:00',
        end_date: '2018-12-31T23:59',
        time_trunc: 'year',
        geo_trunc: 'electric_system',
        geo_limit: 'ccaa',
        geo_ids: 7
      }
    });
  }
}
