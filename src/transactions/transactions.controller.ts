import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionDto } from './transaction.dto';
import { TransactionsService } from './transactions.service';

@ApiTags('transaction')
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Post()
  create(@Body() dto: TransactionDto) {
    return this.transactionService.createTransaction(dto);
  }

  @Get(':id')
  getById(@Param() { id }) {
    return this.transactionService.getTransactionById(id);
  }
}
