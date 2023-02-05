import { ID, ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Phonebook {
  @Field(() => ID, { description: 'UUID of the contact' })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
}
