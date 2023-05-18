import { 
    Column, 
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
} from "typeorm";

@Entity({
    name: 'webtoon'
})

export class WebtoonEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column({
        nullable: false,
        length: 50,
        unique: true
    })
    webtoon_id : string

    @Column({
        nullable: false,
        length: 50,
    })
    title : string

    @Column({
        nullable: false,
        length: 255,
    })
    thumb : string

    @Column({
        nullable: false,
        default: 0
    })
    like_count : number

    @Column({
        nullable: false,
        default: 0
    })
    comment_count : number

    @Column({
        nullable: false,
        default: 200
    })
    price : number

    @Column({
        nullable: false,
    })
    day : number

    @Column({
        nullable: false
    })
    company : string

    @Column({
        nullable: false,
        length: 50
    })
    genre : string
}