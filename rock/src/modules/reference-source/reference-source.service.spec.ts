import { Test, TestingModule } from '@nestjs/testing';
import { ReferenceSourceService } from './reference-source.service';

describe('ReferenceSourceService', () => {
  let service: ReferenceSourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferenceSourceService],
    }).compile();

    service = module.get<ReferenceSourceService>(ReferenceSourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
