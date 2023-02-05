import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
} from '@nestjs/graphql';
import { ContactService } from './contact.service';
import { Contact } from './entities/contact.entity';
import {
  UpdateContactInput,
  CreateContactInput,
} from './dto/inputs';

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
    return this.ContactService.create(createContactInput)
  }

  @Query(() => [Contact], { name: 'Contact' })
  findAll():Promise<Contact[]> {
    return this.ContactService.findAll();
  }

  @Query(() => Contact, { name: 'Contact' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ContactService.findOne(id);
  }

  @Mutation(() => Contact)
  updateContact(
    @Args('updateContactInput')
    updateContactInput: UpdateContactInput,
  ) {
    return this.ContactService.update(
      updateContactInput.id,
      updateContactInput,
    );
  }

  @Mutation(() => Contact)
  removeContact(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.ContactService.remove(id);
  }
}
