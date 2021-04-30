import {Field, InputType, Int} from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field({description: 'User Full Name'})
  name: string;
  @Field({description: 'Username'})
  username: string;
  @Field({description: 'Email', nullable: true})
  email?: string;
  @Field({description: 'Password'})
  password: string;
  @Field({ description: 'Phone' })
  phone: string;
  @Field(() => Int, { description: 'Role ID' })
  roleId: number;
  @Field({ description: 'Gender' })
  gender: string;
  @Field({ description: 'Birthdate' })
  birthDate: Date;
  @Field({ description: 'facebookId', nullable: true })
  facebookId?: string;
  @Field(() => Int, { description: 'City' })
  cityId: number;
}
