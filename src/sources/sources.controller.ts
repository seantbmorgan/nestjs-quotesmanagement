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

import { SourcesService } from './sources.service';
import { GetSourcesFilterDto } from './dto/get-sources-filter-dto';
import { Source } from './source.entity';

@UseGuards(AuthGuard())
@Controller('sources')
export class SourcesController {
  constructor(private sourcesService: SourcesService) {}

  @Get()
  getSources(
    @Query(ValidationPipe) filterDto: GetSourcesFilterDto,
    @GetUser() user: User,
  ) {
    return this.sourcesService.getSource(filterDto, user);
  }

  @Get('/:id')
  getSrouceById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Source> {
    return this.sourcesService.getSourceById(id, user);
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
