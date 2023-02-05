import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePhonebookInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
