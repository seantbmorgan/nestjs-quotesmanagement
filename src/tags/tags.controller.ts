import {
  Controller,
  Get,
  ValidationPipe,
  Query,
  Param,
  ParseIntPipe,
  UseGuards,
  Post,
  Patch,
  Delete,
  UsePipes,
  Body,
} from '@nestjs/common';
import { GetTagFilterDto } from './dto/get-tag-filter-dto';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { TagsService } from './tags.service';
import { Tag } from './tag.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateTagDto } from './dto/create-tag-dto';
import { UpdateTagDto } from './dto/update-tag-dto';
import { UpdateResult } from 'typeorm';

@UseGuards(AuthGuard())
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  getTags(
    @Query(ValidationPipe) filterDto: GetTagFilterDto,
    @GetUser() user: User,
  ) {
    return this.tagsService.getTags(filterDto, user);
  }

  @Get('/:id')
  getTagsById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Tag> {
    return this.tagsService.getTagById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTag(
    @Body() createTagDto: CreateTagDto,
    @GetUser() user: User,
  ): Promise<Tag> {
    return this.tagsService.createTag(createTagDto, user);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  updateTag(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTagDto: UpdateTagDto,
    @GetUser() user: User,
  ): Promise<UpdateResult> {
    return this.tagsService.updateTag(id, updateTagDto, user);
  }

  @Delete('/:id')
  deleteTagById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.tagsService.deleteTagById(id, user);
  }
}
