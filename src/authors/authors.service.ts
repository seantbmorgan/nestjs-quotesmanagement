import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorRepository } from './author.repository';
import { GetAuthorsFilterDto } from './dto/get-authors-filter-dto';
import { Author } from './author.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectRepository(AuthorRepository) private authorRepository: AuthorRepository,
    ){}

    async getAuthors(filterDto: GetAuthorsFilterDto, user: User): Promise<Author[]> {
        return this.authorRepository.getAuthors(filterDto, user);
      }

    async createAuthor(createAuthorDto: CreateAuthorDto, user: User){
        return this.authorRepository.createAuthor(createAuthorDto, user)
    }
}
