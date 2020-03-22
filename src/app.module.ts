import { Module } from '@nestjs/common';
import { QuotesModule } from './quotes/quotes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { AuthorsModule } from './authors/authors.module';
import { SourcesModule } from './sources/sources.module';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    QuotesModule,
    AuthorsModule,
    SourcesModule,
    CategoriesModule,
    TagsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
