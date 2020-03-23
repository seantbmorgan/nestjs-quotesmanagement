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
import { CreateSourceDto } from './dto/create-source-dto';
import { UpdateSourceDto } from './dto/update-source-dto';
import { UpdateResult } from 'typeorm';

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

  @Post()
  @UsePipes(ValidationPipe)
  createSource(
    @Body() createSourceDto: CreateSourceDto,
    @GetUser() user: User,
  ): Promise<Source> {
    return this.sourcesService.createSource(createSourceDto, user);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  updateSource(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSourceDto: UpdateSourceDto,
    @GetUser() user: User,
  ): Promise<UpdateResult> {
    return this.sourcesService.updateSource(id, updateSourceDto, user);
  }

  @Delete('/:id')
  deleteSourceById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.sourcesService.deleteSourceById(id, user);
  }
}
