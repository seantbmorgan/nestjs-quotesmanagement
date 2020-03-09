import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { QuoteStatus } from './quote-status.enum';
import { CreateQuoteDto } from './dto/create-quote.dto';
import * as _ from 'lodash';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { GetQuotesFilterDto } from './dto/get-quotes-filter.dto';
import { QuoteRepository } from './quote.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './quote.entity';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(QuoteRepository) private quoteRepository: QuoteRepository,
  ) {}


  //   getAllQuotes(): Quote[] {
  //     return this.quotes;
  //   }

  //   getQuotesWithFilters(filterDto: GetQuotesFilterDto): Quote[] {
  //     const { status, search } = filterDto;

  //     let quotes = this.getAllQuotes();

  //     if (status) quotes = quotes.filter(quote => quote.status === status);

  //     if (search) quotes = quotes.filter(quote => quote.quote.includes(search));

  //     return quotes;
  //   }

  async getQuoteById(id: number): Promise<Quote> {
    const quote = await this.quoteRepository.findOne(id);
    if (!quote) throw new NotFoundException(`Quote with id ${id} not found`);
    return quote;
  }

  async createQuote(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    return this.quoteRepository.createQuote(createQuoteDto);
  }

  async deleteQuoteById(id: number): Promise<void> {
    const result = this.quoteRepository.delete(id);
    if (!(await result).affected)
      throw new NotFoundException(`Quote with id ${id} not found`);
  }

  //   updateQuote(id, updateQuoteDto: UpdateQuoteDto): Quote {
  //     const newQuote = { id, ...updateQuoteDto };
  //     let updated = false;
  //     this.quotes = this.quotes.map(quote => {
  //       if (quote.id === id) {
  //         quote = newQuote;
  //       }
  //       return quote;
  //     });
  //     if (!updated) throw new NotFoundException(`Quote with id ${id} not found`);
  //     return newQuote;
  //   }

  //   updateQuoteStatus(id: string, status: QuoteStatus): string{
  //     const quote = this.getQuoteById(id);
  //     quote.status = status;
  //     return id;
  //   }
}
