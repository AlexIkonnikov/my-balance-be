import { ApiProperty } from '@nestjs/swagger';

export class TransactionDto {
  @ApiProperty()
  total: number;
  @ApiProperty()
  date: Date;
}
