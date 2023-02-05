import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PhoneNumber {
  @Field(() => Int, { description: 'Contact phone number, may have more than one' })
  phoneNumber: number;
}
