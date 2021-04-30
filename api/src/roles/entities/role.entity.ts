import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Permission } from '../../permissions/entities/permission.entity';

@ObjectType()
@Entity({ name: 'roles' })
export class Role {
  @Field(() => Int, { description: 'Role ID' })
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Field({ description: 'Role Name' })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Field({ description: 'Role Slug' })
  @Column({ type: 'varchar', length: 100 })
  slug: string;

  @Field()
  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @Field(() => [Permission])
  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'role_permission', // table name for the junction table of this relation
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: Permission[];
}
