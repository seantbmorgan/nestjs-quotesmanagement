import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { QuoteStatus } from "./quote-status.enum";

@Entity()
export class Quote extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    authorId: string;

    @Column()
    sourceId: string;

    @Column()
    quote: string;

    @Column()
    status: QuoteStatus;
}

