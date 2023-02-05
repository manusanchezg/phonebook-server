import { CreateContactInput } from './create-contact.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateContactInput extends PartialType(CreateContactInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
