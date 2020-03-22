import { Module } from '@nestjs/common';
import { SourcesController } from './sources.controller';
import { SourcesService } from './sources.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SourceRepository } from './source.repository';

@Module({
  imports:[TypeOrmModule.forFeature([SourceRepository]), AuthModule],
  controllers: [SourcesController],
  providers: [SourcesService]
})
export class SourcesModule {}
