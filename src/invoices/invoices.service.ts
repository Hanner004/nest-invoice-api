import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from '@/invoices/entities/invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto) {}

  async findAll() {
    return await this.invoicesRepository.find();
  }

  async findOne(id: string) {
    const invoice = await this.invoicesRepository.findOneBy({ id });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {}

  async remove(id: string) {
    return await this.invoicesRepository.softDelete(id);
  }
}
