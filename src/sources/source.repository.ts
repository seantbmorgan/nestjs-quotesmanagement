import { Repository, EntityRepository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Logger } from '@nestjs/common';
import { Source } from './source.entity';
import { CreateSourceDto } from './dto/create-source-dto';
import { GetSourcesFilterDto } from './dto/get-sources-filter-dto';

@EntityRepository(Source)
export class SourceRepository extends Repository<Source> {
  private logger = new Logger('AuthorRepository');

  async createSource(
    createSourceDto: CreateSourceDto,
    user: User,
  ): Promise<Source> {
    this.logger.log(`
      Create Source 
        createSourceDto : ${JSON.stringify(createSourceDto)}
        user            : ${JSON.stringify(user)}
    `);
    const { title } = createSourceDto;
    const newSource = new Source();
    newSource.title = title;

    const source = await this.getSources({ title }, user);
    console.log(source);
    if (source.length) {
      this.logger.log(`
      ${JSON.stringify(source)} exists.
    `);
      return source[0];
    } else {
      this.logger.log(`
      ${JSON.stringify(newSource)} does not exit, creating.
    `);
      newSource.user = user;
      await newSource.save();
      delete newSource.user; // Do Not Return User Data to Client
      return newSource;
    }
  }

  async getSources(
    filterDto: GetSourcesFilterDto,
    user: User,
  ): Promise<Source[]> {
    const { title } = filterDto;
    const userId = user.id;
    const query = this.createQueryBuilder('source');

    query.where('source.userId = :userId', { userId });

    if (title) {
      query.andWhere('source.title = :title', { title });
    }

    const sources = await query.getMany();
    return sources;
  }
}
