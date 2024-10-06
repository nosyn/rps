import { Test, TestingModule } from '@nestjs/testing';
import { ReferenceSourceController } from './reference-source.controller';
import { ReferenceSourceService } from './reference-source.service';

describe('ReferenceSourceController', () => {
  let controller: ReferenceSourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReferenceSourceController],
      providers: [ReferenceSourceService],
    }).compile();

    controller = module.get<ReferenceSourceController>(
      ReferenceSourceController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
