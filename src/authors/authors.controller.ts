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
import { CreateAuthorDto } from './dto/create-author-dto';
import { UpdateAuthorDto } from './dto/update-author-dto';
import { UpdateResult } from 'typeorm';
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

  @Post()
  @UsePipes(ValidationPipe)
  createAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
    @GetUser() user: User,
  ): Promise<Author> {
    return this.authorsService.createAuthor(createAuthorDto, user);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  updateAuthor(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
    @GetUser() user: User,
  ): Promise<UpdateResult> {
    return this.authorsService.updateAuthor(id, updateAuthorDto, user);
  }

  @Delete('/:id')
  deleteAuthorById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.authorsService.deleteAuthorById(id, user);
  }
}
