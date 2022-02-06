import { User } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

const tableName = 'transactions';
@Entity({ name: tableName })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  total: number;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
