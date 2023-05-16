import { 
    Column, 
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({name: 'episode'})

export class EpisodeEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number

    @Column({
        nullable: false,
        length: 20
    })
    webtoon_id: string

    @Column({
        nullable: false,
        length: 255
    })
    thumb: string

    @Column({
        nullable: false,
        length: 20
    })
    episode_id: string

    @Column({
        nullable: false,
        length: 50
    })
    title: string

    @Column({
        nullable: false,
        length: 10,
        default: ""
    })
    uptime: string

    @Column({
        nullable: false,
    })
    day : number
}