import { Test, TestingModule } from '@nestjs/testing';
import { SysLogsService } from './sys-logs.service';

describe('SysLogsService', () => {
  let service: SysLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SysLogsService],
    }).compile();

    service = module.get<SysLogsService>(SysLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
