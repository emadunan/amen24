import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { AuthProvider } from '@amen24/shared';

@Entity()
@Unique(['email', 'provider'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text', nullable: true })
  password?: string;

  @Column()
  displayName: string;

  @Column({ type: 'text', default: AuthProvider.LOCAL })
  provider: AuthProvider;

  @Column({ type: 'text', nullable: true })
  providerId: string;

  @ManyToOne(() => Profile, (profile) => profile.users, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'email' })
  profile: Profile;

  @Column({ type: 'text', nullable: true })
  photoUri: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ type: 'smallint', default: 0 })
  failedAttempts: number;

  @Column({ type: 'timestamptz', nullable: true })
  lockUntil: Date | null;

  @Column({ type: 'text', nullable: true })
  resetPasswordToken?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  resetPasswordExpires?: Date | null;
}
