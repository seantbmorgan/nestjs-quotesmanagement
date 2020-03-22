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

import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

import { AuthorsService } from './authors.service';
import { GetAuthorsFilterDto } from './dto/get-authors-filter-dto';
import { Author } from './author.entity';

@UseGuards(AuthGuard())
@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Get()
  getAuthors(
    @Query(ValidationPipe) filterDto: GetAuthorsFilterDto,
    @GetUser() user: User,
  ) {
    return this.authorsService.getAuthors(filterDto, user);
  }

  @Get('/:id')
  getAuthorById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Author> {
    return this.authorsService.getAuthorById(id, user);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createQuote(
  //   @Body() createQuoteDto: CreateQuoteDto,
  //   @GetUser() user: User,
  // ): Promise<Quote> {
  //   return this.quotesService.createQuote(createQuoteDto, user);
  // }

  // @Patch('status/:id')
  // updateQuoteStatus(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body('status', QuoteStatusValidationPipe) status: QuoteStatus,
  //   @GetUser() user: User,
  // ): Promise<Quote> {
  //   return this.quotesService.updateQuoteStatus(id, status, user);
  // }

  // @Patch('/:id')
  // updateQuote(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateQuoteDto: UpdateQuoteDto,
  //   @GetUser() user: User,
  // ): Promise<Quote> {
  //   return this.quotesService.updateQuote(id, updateQuoteDto, user);
  // }

  // @Delete('/:id')
  // deleteQuoteById(
  //   @Param('id', ParseIntPipe) id: number,
  //   @GetUser() user: User,
  // ): Promise<void> {
  //   return this.quotesService.deleteQuoteById(id, user);
  // }
}
