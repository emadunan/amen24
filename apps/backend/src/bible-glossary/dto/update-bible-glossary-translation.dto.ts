import { PartialType } from "@nestjs/mapped-types";
import { CreateBibleGlossaryTranslationDto } from "./create-bible-glossary-translation.dto copy";

export class UpdateBibleGlossaryTranslationDto extends PartialType(CreateBibleGlossaryTranslationDto) { }