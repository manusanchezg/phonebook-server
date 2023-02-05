import { ID, ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity({name: "contacts"})
export class Contact {
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

  @Field(() => [Number], {
    description: 'List of number of the Contact',
  })
  @Column("text", {array: true})
  phoneNumbers: number[];
  
  @Field(() => String, {
    description: 'A picture of the contact',
  })
  @Column()
  photo: string;
}
