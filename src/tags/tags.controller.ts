import {
  Controller,
  Get,
  ValidationPipe,
  Query,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { GetTagFilterDto } from './dto/get-tag-filter-dto';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { TagsService } from './tags.service';
import { Tag } from './tag.entity';
import { AuthGuard } from '@nestjs/passport';

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
}
