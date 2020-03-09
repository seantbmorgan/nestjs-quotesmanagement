import { Repository, EntityRepository } from 'typeorm';
import { Quote } from './quote.entity';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { QuoteStatus } from './quote-status.enum';

@EntityRepository(Quote)
export class QuoteRepository extends Repository<Quote> {
  async createQuote(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    const { quote, authorId } = createQuoteDto;
    const newQuote = new Quote();
    newQuote.quote = quote;
    newQuote.authorId = authorId;
    newQuote.sourceId = '1';
    newQuote.status = QuoteStatus.ACTIVE;
    await newQuote.save();
    return newQuote;
  }

}
