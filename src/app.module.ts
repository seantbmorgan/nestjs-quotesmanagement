import { Module } from '@nestjs/common';
import { QuotesModule } from './quotes/quotes.module';
import { AuthorsService } from './authors/authors.service';
import { AuthorsModule } from './authors/authors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), QuotesModule, AuthorsModule, AuthModule],
  controllers: [],
  providers: [AuthorsService],
})
export class AppModule {}
