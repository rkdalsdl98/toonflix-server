import { 
    Column, 
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({name: 'comment'})

export class CommentEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number

    @Column({
        nullable: false,
        default: ''
    })
    comment_text : string

    @Column({
        nullable: false,
        length: 10
    })
    uptime : string

    @Column({
        nullable: false,
        default: 0
    })
    like_count: number

    @Column({
        nullable: false,
        length: 10
    })
    owner : string

    @Column({
        nullable: false
    })
    owner_id : number

    @Column({
        nullable: false,
        length: 20
    })
    webtoon_id : string
}