import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @Field({ description: 'Role Name' })
  name: string;

  @Field({ description: 'Role Slug' })
  slug: string;
}
