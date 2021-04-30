import {Field, Int, ObjectType} from '@nestjs/graphql';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../../users/entities/user.entity';

@ObjectType()
@Entity({name: 'schedules'})
export class Schedule {
  @Field((type) => Int)
  @PrimaryGeneratedColumn({type: 'bigint', unsigned: true})
  id: number;

  @Field()
  @Column({type: 'datetime', name: 'start_date'})
  startDate: Date;

  @Field()
  @Column({ type: 'datetime', name: 'start_time' })
  startTime: Date;

  @Field()
  @Column({ type: 'datetime', name: 'end_time' })
  endTime: Date;

  @Field()
  @Column({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @Field()
  @Column({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @Field()
  @Column({ type: 'tinyint', default: 0 })
  status: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.schedules)
  doctor: User;
}
