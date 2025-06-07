import { PartialType } from '@nestjs/mapped-types';
import { CreateLibraryDto } from './create-library-book.dto';

export class UpdateLibraryDto extends PartialType(CreateLibraryDto) { }
