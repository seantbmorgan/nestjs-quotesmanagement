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
import { CategoryRepository } from 'src/categories/category.repository';
import { CategoriesService } from 'src/categories/categories.service';
import { TagRepository } from 'src/tags/tags.repository';
import { TagsService } from 'src/tags/tags.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuoteRepository,
      AuthorRepository,
      SourceRepository,
      CategoryRepository,
      TagRepository,
    ]),
    AuthModule,
  ],
  controllers: [QuotesController],
  providers: [
    QuotesService,
    AuthorsService,
    SourcesService,
    CategoriesService,
    TagsService,
  ],
})
export class QuotesModule {}
