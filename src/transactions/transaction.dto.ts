import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDateString } from 'class-validator';
import { Category } from './transactions.entity';

export class TransactionDto {
  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty()
  @IsDateString()
  date: Date;

  @ApiProperty({ enum: Category, nullable: true })
  category: Category;

  @ApiProperty({ nullable: true, default: '' })
  comment: string;

  userId: number;
}

export class TransactionCreateRequest {
  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty()
  @IsDateString()
  date: Date;

  @ApiProperty({ enum: Category, nullable: true })
  category: Category;

  @ApiProperty({ nullable: true, default: '' })
  comment: string;
}
