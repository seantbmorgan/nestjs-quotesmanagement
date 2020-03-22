import { Repository, EntityRepository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Logger } from '@nestjs/common';
import { Tag } from './tag.entity';
import { GetTagFilterDto } from './dto/get-tag-filter-dto';
import { CreateTagDto } from './dto/create-tag-dto';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  private logger = new Logger('TagRepository');

  async createTag(createTagDto: CreateTagDto, user: User): Promise<Tag> {
    this.logger.log(`
      Create Tag 
        createTagDto : ${JSON.stringify(createTagDto)}
        user         : ${JSON.stringify(user)}
    `);
    const { name } = createTagDto;
    const newTag = new Tag();
    newTag.name = name;

    const tag = await this.getTags({ name }, user);
    console.log(tag);
    if (tag.length) {
      this.logger.log(`
      ${JSON.stringify(tag)} exists.
    `);
      return tag[0];
    } else {
      this.logger.log(`
      ${JSON.stringify(newTag)} does not exit, creating.
    `);
      newTag.user = user;
      await newTag.save();
      delete newTag.user; // Do Not Return User Data to Client
      return newTag;
    }
  }

  async getTags(filterDto: GetTagFilterDto, user: User): Promise<Tag[]> {
    const { name } = filterDto;
    const userId = user.id;
    const query = this.createQueryBuilder('tag');
    query.where('tag.userId = :userId', { userId });
    if (name) {
      query.andWhere('tag.name = :name', { name });
    }
    const tags = await query.getMany();
    return tags;
  }
}
