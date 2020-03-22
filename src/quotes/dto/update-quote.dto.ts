// import { QuoteStatus } from "../quote-status.enum";

// export class UpdateQuoteDto{
//     quote: string;
//     authorId: string;
//     sourceId: string;
//     status: QuoteStatus
// }

import { IsNotEmpty } from 'class-validator';

export class UpdateQuoteDto {
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

  categories: string;

  tags: string;
}
