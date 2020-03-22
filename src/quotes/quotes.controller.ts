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
  UseGuards,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { GetQuotesFilterDto } from './dto/get-quotes-filter.dto';
import { QuoteStatusValidationPipe } from './pipes/quote-status-validation.pipe';
import { Quote } from './quote.entity';
import { QuoteStatus } from './quote-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { UpdateQuoteDto } from './dto/update-quote.dto';

@UseGuards(AuthGuard())
@Controller('quotes')
export class QuotesController {
  constructor(
    private quotesService: QuotesService,
  ) {}

  @Get()
  getQuotes(
    @Query(ValidationPipe) filterDto: GetQuotesFilterDto,
    @GetUser() user: User,
  ) {
    return this.quotesService.getQuotes(filterDto, user);
  }

  @Get('/:id')
  getQuoteById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Quote> {
    return this.quotesService.getQuoteById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createQuote(
    @Body() createQuoteDto: CreateQuoteDto,
    @GetUser() user: User,
  ): Promise<Quote> {
    return this.quotesService.createQuote(createQuoteDto, user);
  }

  @Patch('status/:id')
  updateQuoteStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', QuoteStatusValidationPipe) status: QuoteStatus,
    @GetUser() user: User,
  ): Promise<Quote> {
    return this.quotesService.updateQuoteStatus(id, status, user);
  }

  @Patch('/:id')
  updateQuote(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuoteDto: UpdateQuoteDto,
    @GetUser() user: User,
  ): Promise<Quote> {
    return this.quotesService.updateQuote(id, updateQuoteDto, user);
  }

  @Delete('/:id')
  deleteQuoteById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.quotesService.deleteQuoteById(id, user);
  }
}
