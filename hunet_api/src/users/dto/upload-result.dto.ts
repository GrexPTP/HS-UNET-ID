import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class UploadResultDto {
  @Field({ description: 'Path', nullable: true })
  path: string;
  @Field({ description: 'Message' })
  message: string;
}
