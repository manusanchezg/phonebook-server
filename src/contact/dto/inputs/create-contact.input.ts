import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'src/contact/entities';

@InputType()
export class CreateContactInput {
  @Field(() => String, {
    description: 'First name of the contact',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Field(() => String, {
    description: 'Last name of the contact',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Field(() => String, {
    description: 'Nickname of the contact (optional)',
    nullable: true,
  })
  @IsString()
  nickname?: string;

  @Field(() => [Number], {
    description:
      'List of phone numbers of the contact, at least one phone number',
  })
  @IsNotEmpty()
  // @IsPhoneNumber()
  // -------- Need to Check the number ---------- //
  phoneNumbers: number[]; // [PhoneNumber] ? possible?

  @Field(() => String, {
    description: 'Address of the contact',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @Field(() => GraphQLUpload, {
    description: 'Last name of the contact',
  })
  @IsNotEmpty()
  @IsString()
  // Need to chec the image //
  photo: Promise<FileUpload>;
}
