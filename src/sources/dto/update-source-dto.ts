import { IsNotEmpty } from 'class-validator';

export class UpdateSourceDto {
  @IsNotEmpty()
  title: string;
}
