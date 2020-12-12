import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { GetTicketsFilterDto } from './dto/get-tickets-filter.dto';
import { CreateTicketDto, UpdateTicketDto } from './dto/ticket.dto';
import { TicketStatus } from './ticket-status.enum';
import { Ticket } from './ticket.entity';

@EntityRepository(Ticket)
export class TicketRepository extends Repository<Ticket> {
  async getAllTicket() {
    return await this.find();
  }

  async getFilterTicket(filterTicketDto: GetTicketsFilterDto) {
    const { status, search } = filterTicketDto;
    const queryBuilder = this.createQueryBuilder('ticket');

    if (status) {
      queryBuilder.andWhere('ticket.status = :status', { status });
    }

    if (search) {
      queryBuilder.andWhere(
        'ticket.title LIKE :search OR ticket.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    const tickets = await queryBuilder.getMany();

    return tickets;
  }

  async createTicket(createTicketDto: CreateTicketDto) {
    const ticket = new Ticket();
    const { title, description } = createTicketDto;
    ticket.title = title;
    ticket.description = description;
    ticket.status = TicketStatus.OPEN;
    return await ticket.save();
  }

  async updateTicket(id: number, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.getTicketById(id);
    const { title, description, status } = updateTicketDto;
    ticket.title = title;
    ticket.description = description;
    ticket.status = status;
    return await ticket.save();
  }

  async deleteTicket(id: number) {
    const ticket = await this.getTicketById(id);
    await this.delete({ id: ticket.id });
    return id;
  }

  async getTicketById(id: number) {
    const ticket = await this.findOne({ id });
    if (!ticket) {
      throw new NotFoundException(`Ticket with id #${id} not found!`);
    }
    return ticket;
  }
}
