import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { TagRepository } from './tags.repository';
import { GetTagFilterDto } from './dto/get-tag-filter-dto';
import { CreateTagDto } from './dto/create-tag-dto';
import { Tag } from './tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagRepository)
    private tagRepository: TagRepository,
  ) {}

  async getTags(
    filterDto: GetTagFilterDto,
    user: User,
  ): Promise<Tag[]> {
    return this.tagRepository.getTags(filterDto, user);
  }

  async getTagById(id: number, user: User): Promise<Tag> {
  const tag = await this.tagRepository.findOne({
  where: { id, userId: user.id },
  });
  if (!tag) throw new NotFoundException(`Tag with id id not found`);
  return tag;
  }

  async createTags(createTagDto: CreateTagDto, user: User) {
    return this.tagRepository.createTag(createTagDto, user);
  }
}
