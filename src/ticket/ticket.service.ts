import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTicketsFilterDto } from './dto/get-tickets-filter.dto';
import { CreateTicketDto, UpdateTicketDto } from './dto/ticket.dto';
import { TicketRepository } from './ticket.repository';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketRepository)
    private readonly ticketRepository: TicketRepository,
  ) {}

  async getTickets() {
    return this.ticketRepository.getAllTicket();
  }

  async getFilterTickets(filterTicketDto: GetTicketsFilterDto) {
    return this.ticketRepository.getFilterTicket(filterTicketDto);
  }

  async getSingleTicket(id: number) {
    return this.ticketRepository.getTicketById(id);
  }

  async addTicket(createTicketDto: CreateTicketDto) {
    return this.ticketRepository.createTicket(createTicketDto);
  }

  async updateTicket(id: number, updateTicketDto: UpdateTicketDto) {
    return this.ticketRepository.updateTicket(id, updateTicketDto);
  }

  async deleteTicket(id: number) {
    return this.ticketRepository.deleteTicket(id);
  }
}
