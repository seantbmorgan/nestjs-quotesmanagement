import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { TagRepository } from './tags.repository';
import { GetTagFilterDto } from './dto/get-tag-filter-dto';
import { CreateTagDto } from './dto/create-tag-dto';
import { Tag } from './tag.entity';
import { UpdateTagDto } from './dto/update-tag-dto';

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

  async createTag(createTagDto: CreateTagDto, user: User) {
    return this.tagRepository.createTag(createTagDto, user);
  }

  async updateTag(id: number, updateTagDto: UpdateTagDto, user: User) {
    const { name } = updateTagDto;
    const tag = await this.tagRepository
      .createQueryBuilder()
      .update('tag')
      .set({ name })
      .where('id = :id', { id })
      .execute();
    return tag;
  }

  async deleteTagById(id: number, user: User): Promise<void> {
    const result = await this.tagRepository.delete({
      id,
      userId: user.id,
    });
    if (!(await result).affected)
      throw new NotFoundException(`Tag with id ${id} not found`);
  }
}
