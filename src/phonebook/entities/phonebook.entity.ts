import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Phonebook {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
