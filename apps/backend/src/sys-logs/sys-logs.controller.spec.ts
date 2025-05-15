import { Test, TestingModule } from '@nestjs/testing';
import { SysLogsController } from './sys-logs.controller';
import { SysLogsService } from './sys-logs.service';

describe('SysLogsController', () => {
  let controller: SysLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SysLogsController],
      providers: [SysLogsService],
    }).compile();

    controller = module.get<SysLogsController>(SysLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
