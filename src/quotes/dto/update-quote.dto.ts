import { QuoteStatus } from "../quote-status.enum";

export class UpdateQuoteDto{
    quote: string;
    authorId: string;
    sourceId: string;
    status: QuoteStatus
}