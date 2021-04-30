import {Field, GraphQLISODateTime, Int, ObjectType} from '@nestjs/graphql';
import {Role} from '../../roles/entities/role.entity';
import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {Examination} from '../../examinations/entities/examination.entity';
import {Appointment} from '../../appointments/entities/appointment.entity';
import {News} from '../../news/entities/news.entity';
import {IsEmail} from 'class-validator';
import {City} from '../../cities/entities/city.entity';
import {Schedule} from '../../schedules/entities/schedule.entity';

@ObjectType()
@Entity({name: 'users'})
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn({type: 'bigint', unsigned: true})
  id: number;

  @Field({description: 'User Full Name'})
  @Column({type: 'varchar', length: 255})
  name: string;

  @Field({ description: 'Username' })
  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @IsEmail()
  @Field({ description: 'Email', nullable: true })
  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  email?: string;

  @Field({ description: 'Password' })
  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Field({ description: 'Phone' })
  @Column({ type: 'varchar', length: 20, unique: true })
  phone: string;

  @Field({ description: 'Gender' })
  @Column({ type: 'varchar', length: 10 })
  gender: string;

  @Field(() => GraphQLISODateTime, { description: 'Birthdate' })
  @Column({ type: 'date', name: 'birth_date' })
  birthDate: Date;

  @Field({ description: 'Profile Image', nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'profile_image',
  })
  profileImage?: string;

  @Field({ description: 'Specialist', nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'specialist',
  })
  specialist?: string;

  @Field({ description: 'Biography', nullable: true })
  @Column({
    type: 'text',
    nullable: true,
    name: 'biography',
  })
  biography?: string;

  @Field({ nullable: true, description: 'Facebook ID' })
  @Column({
    nullable: true,
    unique: true,
    name: 'facebook_id',
    type: 'varchar',
    length: '255',
  })
  facebookId?: string;

  @Field()
  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  @Field(() => Role)
  role: Role;

  @ManyToOne(() => City, (city) => city.users)
  @JoinColumn([{ name: 'city_id', referencedColumnName: 'id' }])
  @Field(() => City, { nullable: true })
  city: City;

  @Field(() => [Examination], { nullable: 'items' })
  @OneToMany(() => Examination, (examination) => examination.patient)
  examined: Examination[];

  @Field(() => [Examination], { nullable: 'items' })
  @OneToMany(() => Examination, (examination) => examination.doctor)
  examining: Examination[];

  @Field(() => [Appointment], { nullable: 'items' })
  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointmentAttendant: Appointment[];

  @Field(() => [Appointment], { nullable: 'items' })
  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointmentCreator: Appointment[];

  @Field(() => [News], { nullable: 'items' })
  @OneToMany(() => News, (news) => news.creator)
  news: News[];

  @Field(() => [Schedule], { nullable: 'items' })
  @OneToMany(() => Schedule, (schedule) => schedule.doctor)
  @JoinColumn([{ name: 'doctor_id', referencedColumnName: 'id' }])
  schedules?: Schedule[];

  @BeforeInsert()
  async hashPassword() {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }
}
