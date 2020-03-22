import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetAuthorsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  firstname: string;

  @IsOptional()
  @IsNotEmpty()
  lastname: string;
}
