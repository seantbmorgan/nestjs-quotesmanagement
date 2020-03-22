import { Repository, EntityRepository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author-dto';
import { GetAuthorsFilterDto } from './dto/get-authors-filter-dto';
import { Logger } from '@nestjs/common';

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {
  private logger = new Logger('AuthorRepository');

  async createAuthor(
    createAuthorDto: CreateAuthorDto,
    user: User,
  ): Promise<Author> {
    this.logger.log(`
      Create Author 
        createAuthorDto : ${JSON.stringify(createAuthorDto)}
        user            : ${JSON.stringify(user)}
    `);
    const { firstname, lastname } = createAuthorDto;
    const newAuthor = new Author();
    newAuthor.firstname = firstname;
    newAuthor.lastname = lastname;

    const author = await this.getAuthors({ firstname, lastname }, user);
    console.log(author);
    if (author.length) {
      this.logger.log(`
      ${JSON.stringify(author)} exists.
    `);
      return author[0];
    } else {
      this.logger.log(`
      ${JSON.stringify(newAuthor)} does not exit, creating.
    `);
      newAuthor.user = user;
      await newAuthor.save();
      delete newAuthor.user; // Do Not Return User Data to Client
      return newAuthor;
    }
  }

  async getAuthors(
    filterDto: GetAuthorsFilterDto,
    user: User,
  ): Promise<Author[]> {
    const { firstname, lastname } = filterDto;
    const userId = user.id;
    const query = this.createQueryBuilder('author');

    query.where('author.userId = :userId', { userId });

    if (firstname) {
      query.andWhere('author.firstname = :firstname', { firstname });
    }

    if (lastname) {
      query.andWhere('author.lastname = :lastname', { lastname });
    }

    const authors = await query.getMany();
    return authors;
  }
}
