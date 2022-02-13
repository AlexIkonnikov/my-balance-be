import { User } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum Category {
  OTHER = 'Прочее',
  FOOD = 'Продукты питания',
  TRAVEL = 'Проезд',
  MOBILE = 'Мобильная связь',
  ENTERTAINMENT = 'Развлечения',
  MEDICINE = 'Аптека/Мед. услуги',
  FAST_FOOD = 'Быстрое питание',
  DEVELOPMENT = 'Развитие',
  CLOTH = 'Одежда',
  RENT = 'Аренда',
  PRESENTS = 'Подарки',
  SALARY = 'Зарплата',
  PART_TIME_JOB = 'Подработка',
}

const tableName = 'transactions';
@Entity({ name: tableName })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  total: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'integer' })
  userId: number;

  @Column({ type: 'enum', enum: Category, default: Category.OTHER })
  category: Category;

  @Column({ type: 'varchar', nullable: true })
  comment: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
