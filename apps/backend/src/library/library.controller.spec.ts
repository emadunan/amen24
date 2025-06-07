import { Test, TestingModule } from '@nestjs/testing';
import { LibraryController } from './library.controller';
import { LibraryBookService } from './library-book.service';

describe('LibraryController', () => {
  let controller: LibraryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibraryController],
      providers: [LibraryBookService],
    }).compile();

    controller = module.get<LibraryController>(LibraryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
