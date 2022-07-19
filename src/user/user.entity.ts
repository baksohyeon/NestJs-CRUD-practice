import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', nullable: true })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: '255' })
  name: string;

  @Column({ name: 'email', type: 'varchar', length: '255' })
  email: string;

  @Column({ name: 'password' })
  password: string;
}
