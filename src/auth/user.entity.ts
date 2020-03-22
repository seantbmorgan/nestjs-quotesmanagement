import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bycrypt from 'bcrypt';
import { Quote } from 'src/quotes/quote.entity';
import { Author } from 'src/authors/author.entity';
import { Source } from 'src/sources/source.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(
    quote => Quote,
    quote => quote.user,
    { eager: true },
  )
  quote: Quote[];

  @OneToMany(
    author => Author,
    author => author.user,
    { eager: true },
  )
  author: Author[];

  @OneToMany(
    source => Source,
    source => source.user,
    { eager: true },
  )
  source: Source[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bycrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
