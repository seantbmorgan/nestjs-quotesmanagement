import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetSourcesFilterDto {
  @IsOptional()
  @IsNotEmpty()
  title: string;
}
