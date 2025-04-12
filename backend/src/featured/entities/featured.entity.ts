import { VerseGroup } from "../../verses/entities/verse-group.entity";
import { FeaturedText } from "./featured-text.entity";
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Featured {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => VerseGroup, verseGroup => verseGroup.featured)
  @JoinColumn()
  verseGroup: VerseGroup;

  @OneToMany(() => FeaturedText, featuredText => featuredText.featured)
  featuredText: FeaturedText[];
}
