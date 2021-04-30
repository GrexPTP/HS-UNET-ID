import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@ObjectType()
@Entity({ name: 'appointments' })
export class Appointment {
  @Field((type) => Int)
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Field()
  @Column({ type: 'datetime', name: 'meeting_time' })
  meetingTime: Date;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string;

  @Field()
  @Column({ type: 'tinyint', default: 0 })
  status: number;

  @Field()
  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.appointmentAttendant)
  @JoinColumn([{ name: 'patient_id', referencedColumnName: 'id' }])
  patient: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.appointmentCreator)
  @JoinColumn([{ name: 'doctor_id', referencedColumnName: 'id' }])
  doctor: User;
}
