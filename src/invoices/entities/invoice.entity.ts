import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Customer } from '@/customers/entities/customer.entity';
import { Company } from '@/companies/entities/company.entity';
import { InvoiceItem } from '@/invoices/entities/invoiceItem.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  invoice_number: string;
  @Column()
  issue_date: Date;
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  subtotal: number;
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  tax: number;
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  total: number;
  @ManyToOne(() => Customer, (customer) => customer.invoices)
  customer: Customer;
  @ManyToOne(() => Company, (company) => company.invoices)
  company: Company;
  @OneToMany(() => InvoiceItem, (invoiceItem) => invoiceItem.invoice)
  items: InvoiceItem[];
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @DeleteDateColumn()
  deleted_at: Date;
}
