import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetTagFilterDto {
  @IsNotEmpty()
  name: string;
}
