import { Lang } from '@amen24/shared';
import { Featured } from './featured.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FeaturedText {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  lang: Lang;

  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => Featured, (featured) => featured.featuredText, {
    onDelete: 'CASCADE',
  })
  featured: Featured;
}
