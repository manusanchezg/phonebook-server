import { InputType, Int, Field } from '@nestjs/graphql';
import { Blob } from 'buffer';
import { PhoneNumber } from 'src/phonebook/entities';

@InputType()
export class CreatePhonebookInput {
  @Field(() => String, {
    description: 'First name of the contact',
  })
  firstName: string;

  @Field(() => String, {
    description: 'Last name of the contact',
  })
  lastName: string;

  @Field(() => String, {
    description: 'Nickname of the contact (optional)',
    nullable: true,
  })
  nickname?: string;

  @Field(() => Array<PhoneNumber>, {
    description:
      'List of phone numbers of the contact, at least one phone number',
  })
  phoneNumbers: Array<PhoneNumber>; // [PhoneNumber] ? possible?

  @Field(() => String, {
    description: 'Address of the contact',
  })
  address: string;

  @Field(() => String, {
    description: 'Last name of the contact',
  })
  photo: Blob;
}
