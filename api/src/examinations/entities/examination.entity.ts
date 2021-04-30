import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Disease } from '../../diseases/entities/disease.entity';
import { User } from '../../users/entities/user.entity';
import { ExaminationDetail } from '../../examination-details/entities/examination-detail.entity';

@ObjectType()
@Entity({ name: 'examinations' })
export class Examination {
  @Field((type) => Int)
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  image: string;

  @Field()
  @Column({ type: 'varchar', length: 255, name: 'result_image' })
  resultImage: string;

  @Field({ nullable: true })
  @Column({ name: 'customer_description', type: 'text', nullable: true })
  customerDescription: string;

  @Field({ nullable: true })
  @Column({ name: 'doctor_feedback', type: 'text', nullable: true })
  doctorFeedback: string;

  @Field()
  @Column({ length: 10, type: 'varchar' })
  status: string;

  @Field()
  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @Field(() => Disease)
  @ManyToOne(() => Disease, (disease) => disease.examinations)
  @JoinColumn([{ name: 'disease_id', referencedColumnName: 'id' }])
  disease: Disease;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.examined)
  @JoinColumn([{ name: 'patient_id', referencedColumnName: 'id' }])
  patient: User;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.examining)
  @JoinColumn([{ name: 'doctor_id', referencedColumnName: 'id' }])
  doctor?: User;

  @Field(() => [ExaminationDetail])
  @OneToMany(
    () => ExaminationDetail,
    (examinationDetails) => examinationDetails.examination,
  )
  examinationDetails: ExaminationDetail[];
}
