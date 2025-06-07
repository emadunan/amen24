import { Test, TestingModule } from '@nestjs/testing';
import { LibraryChapterService } from './library-chapter.service';

describe('LibraryChapterService', () => {
  let service: LibraryChapterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LibraryChapterService],
    }).compile();

    service = module.get<LibraryChapterService>(LibraryChapterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
