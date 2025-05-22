import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Auditing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  action: string;

  @Column({ type: 'text', default: 'visitor' })
  performedBy: string;

  @Column({ type: 'text', nullable: true })
  metadata?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
