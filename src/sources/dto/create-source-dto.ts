import { IsNotEmpty } from 'class-validator';

export class CreateSourceDto {
  @IsNotEmpty()
  title: string;
}
