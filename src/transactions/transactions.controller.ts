import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { TransactionCreateRequest, TransactionDto } from './transaction.dto';
import { TransactionsService } from './transactions.service';

@ApiTags('transaction')
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  create(@Body() dto: TransactionCreateRequest, @Request() { user: { id } }) {
    return this.transactionService.createTransaction({ ...dto, userId: id });
  }

  @Get(':date')
  @ApiParam({ name: 'date', type: Date })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  getByDate(@Param() { date }, @Request() { user: id }) {
    return this.transactionService.getTransactionByDate(date, id);
  }

  @Get()
  @ApiQuery({ name: 'date_start', type: Date })
  @ApiQuery({ name: 'date_end', type: Date })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  getByDateRange(@Query() { date_start, date_end }, @Request() { user: id }) {
    return this.transactionService.getTransactionBetweenDate(
      date_start,
      date_end,
      id,
    );
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  update(@Body() dto: TransactionDto, @Param() { id }) {
    return this.transactionService.updateTransaction(id, dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  delete(@Param() { id }) {
    this.transactionService.deleteTransaction(id);
  }
}
