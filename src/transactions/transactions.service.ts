import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { TransactionDto } from './transaction.dto';
import { Transaction } from './transactions.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async createTransaction(dto: TransactionDto) {
    const transaction = this.transactionRepository.create(dto);
    return await this.transactionRepository.save(transaction);
  }

  async updateTransaction(id: string, dto: TransactionDto) {
    return await this.transactionRepository.update(id, { ...dto });
  }

  deleteTransaction(id: string) {
    this.transactionRepository.delete(id);
  }

  async getTransactionById(id: string) {
    return await this.transactionRepository.findOne(id);
  }

  async getTransactionByDate(date: Date, userId: string) {
    return await this.transactionRepository.find({
      where: { date, userId },
      select: ['id', 'date', 'category', 'comment', 'total'],
    });
  }

  async getTransactionBetweenDate(start: Date, end: Date, id: string) {
    const transactions = await this.transactionRepository.find({
      where: { userId: id, date: Between(start, end) },
      select: ['id', 'date', 'category', 'comment', 'total'],
      order: { date: 'ASC' },
    });

    const incomeExpenses = transactions.reduce(
      (acc, { total }) => {
        return total > 0
          ? { income: acc.income + total, expenses: acc.expenses }
          : { income: acc.income, expenses: acc.expenses + total };
      },
      { income: 0, expenses: 0 },
    );

    return { transactions, ...incomeExpenses };
  }
}
