import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  ManyToOne
} from 'typeorm';
import { Phonebook } from './phonebook.entity';

@ObjectType()
export class PhoneNumber {
  @Field(() => ID, { description: 'Contact phone number, may have more than one' })
  @ManyToOne(type => Phonebook, phonebook => phonebook.phoneNumbers)
  phoneNumber: number;
}
