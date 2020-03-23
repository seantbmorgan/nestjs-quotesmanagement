import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorRepository } from './author.repository';
import { GetAuthorsFilterDto } from './dto/get-authors-filter-dto';
import { Author } from './author.entity';
import { User } from 'src/auth/user.entity';
import { UpdateAuthorDto } from './dto/update-author-dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorRepository)
    private authorRepository: AuthorRepository,
  ) {}

  async getAuthors(
    filterDto: GetAuthorsFilterDto,
    user: User,
  ): Promise<Author[]> {
    return this.authorRepository.getAuthors(filterDto, user);
  }

  async getAuthorById(id: number, user: User): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!author) throw new NotFoundException(`Author with id ${id} not found`);
    return author;
  }

  async createAuthor(createAuthorDto: CreateAuthorDto, user: User) {
    return this.authorRepository.createAuthor(createAuthorDto, user);
  }

  async updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto, user: User) {
    const { firstname, lastname } = updateAuthorDto;
    const author = await this.authorRepository
      .createQueryBuilder('author')
      .update('author')
      .set({ firstname, lastname })
      .where('id = :id', { id })
      .execute();
    return author;
  }

  async deleteAuthorById(id: number, user: User): Promise<void> {
    const result = await this.authorRepository.delete({
      id,
      userId: user.id,
    });
    if (!(await result).affected)
      throw new NotFoundException(`Author with id ${id} not found`);
  }
}
