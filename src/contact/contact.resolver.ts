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
    @Args('first_name', { type: () => String })
    first_name: string,
    @Args('last_name', { type: () => String })
    last_name: string,
    @Args('address', { type: () => String })
    address: string,
    @Args('phone_numbers', { type: () => [Float!] })
    phone_numbers: number[],
    @Args('photo', { type: () => String })
    photo: string,
    @Args('nickname', { type: () => String, nullable:true })
    nickname?: string,
  ): Promise<Contact> {
    return this.ContactService.create(
      first_name,
      last_name,
      address,
      phone_numbers,
      photo,
      nickname,
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
    @Args('first_name', {type: () => String})
    first_name: string,
    @Args('last_name',  {type: () => String})
    last_name: string,
    @Args('address',  {type: () => String})
    address: string,
    @Args('phone_numbers', {type: () => [Float!]})
    phone_numbers: number[],
    @Args('photo', {type: () => String})
    photo: string,
    @Args('nickname',  {type: () => String, nullable:true})
    nickname?: string,
  ): Promise<Contact> {
    return this.ContactService.update(
      id,
      first_name,
      last_name,
      address,
      phone_numbers,
      photo, 
      nickname
    );
  }

  @Mutation(() => Contact, {name: "deleteContact"})
  async removeContact(
    @Args('id', { type: () => ID }, ParseUUIDPipe)
    id: string,
  ) {
    const contact = await this.findOne(id);
    await this.ContactService.remove(id);
    return { ...contact, id };
  }
}
