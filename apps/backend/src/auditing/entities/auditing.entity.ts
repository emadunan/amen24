import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Auditing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  action: string; // 'LOGIN', 'DELETE_USER', 'UPDATE_PROFILE', etc

  @Column({ type: 'text' })
  performedBy: string; // User email or ID

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>; // extra info (eg., what was deleted)

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
