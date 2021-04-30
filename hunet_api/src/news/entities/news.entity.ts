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
@Entity({ name: 'news' })
export class News {
  @Field((type) => Int)
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string;

  @Field()
  @Column({ type: 'text' })
  content: string;

  @Field({ nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'description_image',
  })
  descriptionImage: string;

  @Field()
  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.news, {
    eager: true,
  })
  creator: User;
}
