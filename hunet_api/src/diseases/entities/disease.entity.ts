import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Examination } from '../../examinations/entities/examination.entity';
import { ExaminationDetail } from '../../examination-details/entities/examination-detail.entity';
import slugify from 'slugify';

@ObjectType()
@Entity('diseases')
export class Disease {
  @Field((type) => Int)
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  slug: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  images: string;

  @Field()
  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @Field(() => [Examination])
  @OneToMany(() => Examination, (examination) => examination.disease)
  examinations: Examination[];

  @Field(() => [ExaminationDetail])
  @OneToMany(
    () => ExaminationDetail,
    (examinationDetail) => examinationDetail.disease,
  )
  examinationDetails: ExaminationDetail[];

  @BeforeInsert()
  nameSlug() {
    this.slug = slugify(this.name);
  }
}
