import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field({ nullable: true })
  token?: string;
  @Field()
  message: string;
}
