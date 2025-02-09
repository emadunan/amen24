import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  password: string;

  @Column({ default: 'local' })
  provider: string;

  @Column({ nullable: true })
  providerId: string;

  @ManyToOne(() => Profile, (profile) => profile.users)
  @JoinColumn({ name: "email" })
  profile: Profile;

  @Column()
  email: string;

  @Column()
  displayName: string;

  @Column({ nullable: true })
  photoUri: string;

  @Column({ default: true })
  isActive: boolean;
}
