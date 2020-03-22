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
  import { User } from 'src/auth/user.entity';
  import { Quote } from 'src/quotes/quote.entity';
  
  @Entity()
  export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    userId: string;

    @ManyToMany(type => Quote)
    @JoinTable()
    categories: Quote[];
  
    @ManyToOne(
      type => User,
      user => user.author,
      { eager: false },
    )
    user: User;
  }
  