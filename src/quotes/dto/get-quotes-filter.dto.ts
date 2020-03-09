import { QuoteStatus } from '../quote-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetQuotesFilterDto {
  @IsOptional()
  @IsIn([QuoteStatus.ACTIVE, QuoteStatus.ARCHIVED, QuoteStatus.DELETED])
  status: QuoteStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
