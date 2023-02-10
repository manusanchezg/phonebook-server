import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Int,
  Float,
} from '@nestjs/graphql';
import { ContactService } from './contact.service';
import { Contact } from './entities/contact.entity';
import {
  UpdateContactInput,
  CreateContactInput,
} from './dto/inputs';
import { ParseUUIDPipe } from '@nestjs/common';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/dto/args';

@Resolver(() => Contact)
export class ContactResolver {
  constructor(
    private readonly ContactService: ContactService,
  ) {}

  @Mutation(() => Contact)
  async createContact(
    @Args('firstName', { type: () => String })
    firstName: string,
    @Args('lastName', { type: () => String })
    lastName: string,
    @Args('address', { type: () => String })
    address: string,
    @Args('phoneNumbers', { type: () => [Float!] })
    phoneNumbers: number[],
    @Args('photo', { type: () => String })
    photo: string,
    @Args('nickname', { type: () => String, nullable:true })
    nickname?: string,
  ): Promise<Contact> {
    return this.ContactService.create(
      firstName,
      lastName,
      address,
      phoneNumbers,
      nickname,
      photo,
    );
  }

  @Query(() => [Contact], { name: 'contacts' })
  findAll(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<Contact[]> {
    return this.ContactService.findAll(
      paginationArgs,
      searchArgs,
    );
  }

  @Query(() => Contact, { name: 'Contact' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe)
    id: string,
  ): Promise<Contact> {
    return this.ContactService.findOne(id);
  }

  @Mutation(() => Contact)
  updateContact(
    @Args('id', {type: ()=> ID})
    id: string,
    @Args('firstName', {type: () => String})
    firstName: string,
    @Args('lastName',  {type: () => String})
    lastName: string,
    @Args('address',  {type: () => String})
    address: string,
    @Args('phoneNumbers', {type: () => [Float!]})
    phoneNumbers: number[],
    @Args('photo', {type: () => String})
    photo: string,
    @Args('nickname',  {type: () => String, nullable:true})
    nickname?: string,
  ): Promise<Contact> {
    return this.ContactService.update(
      id,
      firstName,
      lastName,
      address,
      phoneNumbers,
      photo, 
      nickname
    );
  }

  @Mutation(() => Contact)
  async removeContact(
    @Args('id', { type: () => ID }, ParseUUIDPipe)
    id: string,
  ) {
    const contact = await this.findOne(id);
    await this.ContactService.remove(id);
    return { ...contact, id };
  }
}
