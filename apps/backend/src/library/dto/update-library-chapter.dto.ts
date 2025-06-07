import { PartialType } from '@nestjs/mapped-types';
import { CreateLibraryChapterDto } from './create-library-chapter.dto';

export class UpdateLibraryChapterDto extends PartialType(CreateLibraryChapterDto) { }
