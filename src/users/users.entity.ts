import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

const tableName = 'users';

@Entity({ name: tableName })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  surname: string;

  @Column({ type: 'varchar' })
  patronymic: string;

  @Column({ type: 'varchar' })
  password: string;
}
