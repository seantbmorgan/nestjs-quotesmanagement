import { IsNotEmpty } from 'class-validator';

export class CreateQuoteDto {
  @IsNotEmpty()
  quote: string;

  authorId: number;

  @IsNotEmpty()
  authorFirstname: string;

  @IsNotEmpty()
  authorLastname: string;

  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  sourceTitle: string;
}
