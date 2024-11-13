//import { Orders } from 'src/entities/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  // OneToMany,
  // JoinColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
      type:"varchar",
      nullable:false,
  })
  confirmPassword:string;

  @Column({
    type: 'varchar',
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  country: string;

  @Column({
    type: 'text',
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  city: string;

  @Column({ default: 0 })
  reputation: number;
  

  @Column({
    default: false,
  })
  isAdmin: boolean;

  @Column()
  createdAt: string | undefined;

  @Column()
  content:string;
  @Column()
  ratings: string;

  // @OneToMany(() => Orders, (order) => order.user)
  // @JoinColumn({ name: 'order_id' })
  // orders: Orders[];
}