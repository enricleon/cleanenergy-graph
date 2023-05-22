import { GenerationSource } from '@/modules/energy/models/entity/generation-source';

export default interface EnergyState {
  dummy: string;
  generationSource: GenerationSource;
  dates: {
    start: Date;
    end: Date;
  };
}
