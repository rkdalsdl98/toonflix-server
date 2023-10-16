import { 
    Column, 
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({name: 'notice'})

export class NoticeEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column({
        nullable: false,
        length: 50,
    })
    title : string

    @Column({
        nullable: false,
        length: 20,
    })
    category : string

    @Column({
        nullable: true,
        type: 'text',
    })
    content : string

    @Column({
        nullable: true,
    })
    imageUrl : string

    @Column({ 
        nullable: false,
        length: 20,
    })
    updateAt : string
}