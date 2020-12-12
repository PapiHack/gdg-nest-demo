import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TicketStatus } from '../ticket-status.enum';

export class CreateTicketDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class UpdateTicketDto {
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  description: string;

  @IsIn([
    TicketStatus.OPEN,
    TicketStatus.IN_PROGRESS,
    TicketStatus.UNDER_REVIEW,
    TicketStatus.DONE,
    TicketStatus.CLOSE,
  ])
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  status: TicketStatus;
}
