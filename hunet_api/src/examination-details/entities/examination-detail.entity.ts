import {Field, Float, Int, ObjectType} from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {Disease} from '../../diseases/entities/disease.entity';
import {Examination} from '../../examinations/entities/examination.entity';

@ObjectType()
@Entity({name: 'examination_details'})
export class ExaminationDetail {
    @Field((type) => Int)
    @PrimaryGeneratedColumn({type: 'bigint', unsigned: true})
    id: number;

    @Field((type) => Float)
    @Column({type: 'float', unsigned: true})
  percentage: number;

  @Field()
  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @Field(() => Disease)
  @ManyToOne(() => Disease, (disease) => disease.examinationDetails, {
    eager: true,
  })
  @JoinColumn([{ name: 'disease_id', referencedColumnName: 'id' }])
  disease: Disease;

  @Field(() => Examination)
  @ManyToOne(
    () => Examination,
    (examination) => examination.examinationDetails,
    { eager: true },
  )
  @JoinColumn([{ name: 'examination_id', referencedColumnName: 'id' }])
  examination: Examination;
}
