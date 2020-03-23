import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Quote } from 'src/quotes/quote.entity';

@Entity()
export class Author extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  userId: number;

  @OneToMany(
    quote => Quote,
    quote => quote.author,
    { eager: true },
  )
  quote: Quote[];

  @ManyToOne(
    type => User,
    user => user.author,
    { eager: false },
  )
  user: User;
}
