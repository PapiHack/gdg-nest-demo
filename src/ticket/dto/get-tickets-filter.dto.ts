import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TicketStatus } from '../ticket-status.enum';

export class GetTicketsFilterDto {
  @ApiPropertyOptional()
  @IsIn([
    TicketStatus.OPEN,
    TicketStatus.IN_PROGRESS,
    TicketStatus.UNDER_REVIEW,
    TicketStatus.DONE,
    TicketStatus.CLOSE,
  ])
  @IsNotEmpty()
  @IsOptional()
  status: TicketStatus;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  search: string;
}
