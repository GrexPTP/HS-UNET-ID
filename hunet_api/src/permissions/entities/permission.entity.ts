import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'permissions' })
export class Permission {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 50 })
  model: string;

  @Field()
  @Column({ type: 'varchar', length: 50 })
  action: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string;

  @Field()
  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;
}
