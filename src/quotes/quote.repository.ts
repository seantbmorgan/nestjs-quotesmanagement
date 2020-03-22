import { Repository, EntityRepository } from 'typeorm';
import { Quote } from './quote.entity';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { QuoteStatus } from './quote-status.enum';
import { GetQuotesFilterDto } from './dto/get-quotes-filter.dto';
import { User } from 'src/auth/user.entity';
import { Author } from 'src/authors/author.entity';
import { Source } from 'src/sources/source.entity';

@EntityRepository(Quote)
export class QuoteRepository extends Repository<Quote> {
  async createQuote(createQuoteDto: CreateQuoteDto, author: Author, source:Source, user: User): Promise<Quote> {
    const { quote, page } = createQuoteDto;
    const newQuote = new Quote();
    newQuote.user = user;
    newQuote.author = author;
    newQuote.source = source;
    newQuote.quote = quote;
    newQuote.page = page;
    newQuote.status = QuoteStatus.ACTIVE;
    await newQuote.save();
    delete newQuote.user; // Do Not Return User Data to Client
    return newQuote;
  }

  async getQuotes(filterDto: GetQuotesFilterDto, user: User): Promise<Quote[]> {
    const { status, search } = filterDto;
    const userId = user.id;
    const query = this.createQueryBuilder('quote');

    query.where('quote.userId = :userId', { userId });

    if (status) {
      query.andWhere('quote.status = :status', { status });
    }

    if (search) {
      query.andWhere('quote.quote LIKE :search', { search: `%${search}%` });
    }
    query.leftJoinAndSelect("quote.author", "author")
    query.leftJoinAndSelect("quote.source", "source")
    const quotes = await query.getMany();
    return quotes;
  }
}