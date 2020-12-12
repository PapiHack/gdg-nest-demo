import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TicketStatus } from '../ticket-status.enum';

export class TicketStatusValidationPipe implements PipeTransform {
  allowedTicketStatus = [
    TicketStatus.OPEN,
    TicketStatus.IN_PROGRESS,
    TicketStatus.UNDER_REVIEW,
    TicketStatus.DONE,
    TicketStatus.CLOSE,
  ];
  transform(value: any) {
    if (!this.isValidTicketStatus(value)) {
      throw new BadRequestException(`Status ${value} is not allowed !`);
    }
    return value;
  }

  isValidTicketStatus(status: any) {
    status = status.toUpperCase();
    return this.allowedTicketStatus.includes(status);
  }
}
