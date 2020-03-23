import { IsNotEmpty } from 'class-validator';

export class UpdateAuthorDto {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;
}
