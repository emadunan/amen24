import { SysLogLevel } from '@amen24/shared';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class SysLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: SysLogLevel })
  level: SysLogLevel;

  @Column()
  message: string;

  @Column({ nullable: true })
  context?: string;

  @Column({ type: 'text', nullable: true })
  stack?: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;
}
