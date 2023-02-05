import { ID, ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import { PhoneNumber } from './contact-number.entity';

@ObjectType()
@Entity()
export class Phonebook {
  @Field(() => ID, { description: 'UUID of the contact' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, {
    description: 'First name of the Contact',
  })
  @Column()
  firstName: string;

  @Field(() => String, {
    description: 'Last name of the Contact',
  })
  @Column()
  lastName: string;

  @Field(() => String, {
    description: 'Nickname of the Contact',
    nullable: true,
  })
  @Column({ nullable: true })
  nickname?: string;

  @Field(() => Array<PhoneNumber>, {
    description: 'List of number of the Contact',
  })
  @OneToMany(type => PhoneNumber, phoneNumber => phoneNumber.phoneNumber)
  phoneNumbers: PhoneNumber[];
}
