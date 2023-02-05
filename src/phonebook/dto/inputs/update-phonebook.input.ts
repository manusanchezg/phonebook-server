import { CreatePhonebookInput } from './create-phonebook.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePhonebookInput extends PartialType(CreatePhonebookInput) {
  @Field(() => Int)
  id: number;
}
