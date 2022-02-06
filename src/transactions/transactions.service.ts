import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
