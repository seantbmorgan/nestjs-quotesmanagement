import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { AuthorsService } from 'src/authors/authors.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { GetQuotesFilterDto } from './dto/get-quotes-filter.dto';
import { QuoteStatusValidationPipe } from './pipes/quote-status-validation.pipe';
import { Quote } from './quote.entity';

@Controller('quotes')
export class QuotesController {
  constructor(
    private quotesService: QuotesService,
    private authorService: AuthorsService,
  ) {}

//   @Get()
//   getQuotes(@Query(ValidationPipe) filterDto: GetQuotesFilterDto): Quote[] {
//       console.log(filterDto)
//     let quotes;
//     if (Object.keys(filterDto).length) {
//       quotes = this.quotesService.getQuotesWithFilters(filterDto);
//     } else {
//       quotes = this.quotesService.getAllQuotes();
//     }
//     const authorIds = quotes.reduce((arr, val) => {
//       arr.push(val.authorId);
//       return arr;
//     }, []);
//     const authors = this.authorService.getAuthorsByIds(authorIds);
//     const data = quotes.reduce((arr, quote) => {
//       const merged = { ...quote, author: undefined };
//       merged.author = authors.find(author => author.id === quote.authorId);
//       arr.push(merged);
//       return arr;
//     }, []);
//     return data;
//   }

  @Get('/:id')
  getQuoteById(@Param('id', ParseIntPipe) id: number): Promise<Quote> {
    return this.quotesService.getQuoteById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createQuote(@Body() createQuoteDto: CreateQuoteDto): Promise<Quote> {
    return this.quotesService.createQuote(createQuoteDto);
  }

//   @Patch('/:id')
//   updateQuote(
//     @Param('id') id: string,
//     @Body() updateQuoteDto: UpdateQuoteDto,
//   ): Quote {
//     return this.quotesService.updateQuote(id, updateQuoteDto);
//   }

//   @Patch('status/:id')
//   updateQuoteStatus(
//     @Param('id') id: string,
//     @Body('status', QuoteStatusValidationPipe) status: QuoteStatus,
//   ): string {
//     return this.quotesService.updateQuoteStatus(id, status);
//   }

  @Delete('/:id')
  deleteQuoteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.quotesService.deleteQuoteById(id);
  }
}
