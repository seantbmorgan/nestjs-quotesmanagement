import { Module } from '@nestjs/common';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { AuthorsService } from 'src/authors/authors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteRepository } from './quote.repository';

@Module({
  imports: [TypeOrmModule.forFeature([QuoteRepository])],
  controllers: [QuotesController],
  providers: [QuotesService, AuthorsService],
})
export class QuotesModule {}
