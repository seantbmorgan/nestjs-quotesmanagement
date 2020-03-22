import { Module } from '@nestjs/common';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteRepository } from './quote.repository';
import { AuthModule } from 'src/auth/auth.module';
import { AuthorsService } from 'src/authors/authors.service';
import { AuthorRepository } from 'src/authors/author.repository';
import { SourceRepository } from 'src/sources/source.repository';
import { SourcesService } from 'src/sources/sources.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuoteRepository, AuthorRepository, SourceRepository]),
    AuthModule,
  ],
  controllers: [QuotesController],
  providers: [QuotesService, AuthorsService, SourcesService],
})
export class QuotesModule {}
