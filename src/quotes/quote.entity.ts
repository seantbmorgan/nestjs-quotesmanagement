import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { QuoteStatus } from './quote-status.enum';
import { User } from 'src/auth/user.entity';
import { Author } from 'src/authors/author.entity';
import { Source } from 'src/sources/source.entity';
import { Category } from 'src/categories/category.entity';
import { Tag } from 'src/tags/tag.entity';

@Entity()
export class Quote extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @TODO migrate to author (one to many)
  @Column()
  authorId: number;

  @Column()
  sourceId: string;

  @Column()
  quote: string;

  @Column()
  page: number;

  @Column()
  status: QuoteStatus;

  @Column()
  userId: number;

  @Column()
  created: Date;

  @Column()
  edited: Date;

  @ManyToMany(type => Tag)
  @JoinTable()
  tags: Tag[];

  @ManyToMany(type => Category)
  @JoinTable()
  categories: Category[];

  @ManyToOne(
    type => Source,
    source => source.quote,
    { eager: false },
  )
  source: Source;

  @ManyToOne(
    type => Author,
    author => author.quote,
    { eager: false },
  )
  author: Author;

  @ManyToOne(
    type => User,
    user => user.quote,
    { eager: false },
  )
  user: User;
}
