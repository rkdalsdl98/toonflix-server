import { 
    Column, 
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({name: 'reply'})

export class ReplyEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column({
        nullable: false
    })
    comment_id : number

    @Column({
        nullable: true,
        default: ""
    })
    reply_text : string

    @Column({
        nullable: false,
        length: 10
    })
    uptime : string

    @Column({
        nullable: false,
        length:10
    })
    owner : string

    @Column({
        nullable : false
    })
    owner_id : number

    @Column({
        nullable: false,
    })
    day : number
}