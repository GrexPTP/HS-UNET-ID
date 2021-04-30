import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Examination } from '../../examinations/entities/examination.entity';
import { ExaminationDetail } from '../../examination-details/entities/examination-detail.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
@Entity('cities')
export class City {
  @Field((type) => Int)
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Field()
  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.city)
  users: User[];
}
