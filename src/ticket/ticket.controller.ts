import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetTicketsFilterDto } from './dto/get-tickets-filter.dto';
import { CreateTicketDto, UpdateTicketDto } from './dto/ticket.dto';
import { TicketService } from './ticket.service';

@Controller('ticket')
@ApiTags('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  async getTickets(@Query() filterTicketDto: GetTicketsFilterDto) {
    return this.ticketService.getFilterTickets(filterTicketDto);
  }

  @Get(':id')
  async getTicket(@Param('id', ParseIntPipe) id: number) {
    return this.ticketService.getSingleTicket(id);
  }

  @Post()
  async createTicket(@Body(ValidationPipe) createTicketDto: CreateTicketDto) {
    return this.ticketService.addTicket(createTicketDto);
  }

  @Put(':id')
  async updateTicket(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketService.updateTicket(id, updateTicketDto);
  }

  @Delete(':id')
  async deleteTicket(@Param('id', ParseIntPipe) id: number) {
    return this.ticketService.deleteTicket(id);
  }
}
