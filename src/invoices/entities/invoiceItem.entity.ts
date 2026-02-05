import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { Invoice } from '@/invoices/entities/invoice.entity';

@Entity({ name: 'invoice_item' })
export class InvoiceItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  description: string;
  @Column({ type: 'int' })
  quantity: number;
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  unit_price: number;
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  total: number;
  @ManyToOne(() => Invoice, (invoice) => invoice.items)
  invoice: Invoice;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @DeleteDateColumn()
  deleted_at: Date;
}
