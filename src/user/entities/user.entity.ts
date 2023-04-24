import { 
    Column, 
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({name: 'user'})

export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
    })
    id: number

    @Column({
        nullable: false,
        length: 20
    })
    name: string

    @Column({
        nullable: false,
        length: 30
    })
    pass: string

    @Column({
        nullable: false,
        length: 10,
        default: '익명'
    })
    nickname: string

    @Column({
        nullable: false,
        default: 0
    })
    cash: number

    @Column({
        nullable: true,
        type: 'text'
    })
    liked: string

    @Column({
        nullable: false,
        type: 'datetime'
    })
    birth: Date
}