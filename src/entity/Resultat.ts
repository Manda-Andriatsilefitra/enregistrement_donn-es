import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Resultat {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nom!: string;

    @Column('integer')
    somme!: number;

    @Column('numeric', { precision: 5, scale: 2 })
    moyenne!: number;

    @Column('date')
    date!: Date;

    @Column('time')
    heure!: string;

    @Column()
    extention!: string;
}