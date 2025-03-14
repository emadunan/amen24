import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
@Unique(['email', 'provider'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: 'local' })
  provider: string;

  @Column({ nullable: true })
  providerId: string;

  @ManyToOne(() => Profile, (profile) => profile.users, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'email' })
  profile: Profile;

  @Column()
  email: string;

  @Column()
  displayName: string;

  @Column({ nullable: true })
  photoUri: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: 0 })
  failedAttempts: number;

  @Column({ nullable: true })
  lockUntil: Date;
}
