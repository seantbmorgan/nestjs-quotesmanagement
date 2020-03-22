import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetCategoryFilterDto {
  @IsNotEmpty()
  name: string;
}
