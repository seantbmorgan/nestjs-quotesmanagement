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
export class Source extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(
    quote => Quote,
    quote => quote.source,
    { eager: true },
  )
  quote: Quote[];

  @Column()
  userId: number;

  @ManyToOne(
    type => User,
    user => user.source,
    { eager: false },
  )
  user: User;
}
