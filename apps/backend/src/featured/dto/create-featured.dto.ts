import { FeaturedPosition } from "@amen24/shared";
import { IsEnum } from "class-validator";

export class CreateFeaturedDto {
  @IsEnum(FeaturedPosition)
  position: FeaturedPosition;
}
