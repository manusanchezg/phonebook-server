import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
} from '@nestjs/graphql';
import { ContactService } from './contact.service';
import { Contact } from './entities/contact.entity';
import {
  UpdateContactInput,
  CreateContactInput,
} from './dto/inputs';
import { ParseUUIDPipe } from '@nestjs/common';
import { PaginationArgs, SearchArgs } from 'src/common/dto/args';

@Resolver(() => Contact)
export class ContactResolver {
  constructor(
    private readonly ContactService: ContactService,
  ) {}

  @Mutation(() => Contact)
  async createContact(
    @Args('createContactInput')
    createContactInput: CreateContactInput,
  ): Promise<Contact> {
    return this.ContactService.create(createContactInput);
  }

  @Query(() => [Contact], { name: 'contacts' })
  findAll(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<Contact[]> {
    return this.ContactService.findAll(paginationArgs, searchArgs);
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
    @Args('updateContactInput')
    updateContactInput: UpdateContactInput,
  ): Promise<Contact> {
    return this.ContactService.update(
      updateContactInput.id,
      updateContactInput,
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
