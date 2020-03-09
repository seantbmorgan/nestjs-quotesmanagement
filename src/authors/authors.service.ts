import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorsService {
  private authors = [
    {
      id: '1',
      firstname: 'Sean',
      lastname: 'Morgan',
    },
    {
      id: '2',
      firstname: 'Jason',
      lastname: 'Silva',
    },
  ];

  getAuthorsByIds(ids) {
    return this.authors;
  }
}
