import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
} from '@nestjs/graphql';
import { PhonebookService } from './phonebook.service';
import { Phonebook } from './entities/phonebook.entity';
import {
  UpdatePhonebookInput,
  CreatePhonebookInput,
} from './dto/inputs';

@Resolver(() => Phonebook)
export class PhonebookResolver {
  constructor(
    private readonly phonebookService: PhonebookService,
  ) {}

  @Mutation(() => Phonebook)
  createPhonebook(
    @Args('createPhonebookInput')
    createPhonebookInput: CreatePhonebookInput,
  ) {
    return this.phonebookService.create(
      createPhonebookInput,
    );
  }

  @Query(() => [Phonebook], { name: 'phonebook' })
  findAll() {
    return this.phonebookService.findAll();
  }

  @Query(() => Phonebook, { name: 'phonebook' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.phonebookService.findOne(id);
  }

  @Mutation(() => Phonebook)
  updatePhonebook(
    @Args('updatePhonebookInput')
    updatePhonebookInput: UpdatePhonebookInput,
  ) {
    return this.phonebookService.update(
      updatePhonebookInput.id,
      updatePhonebookInput,
    );
  }

  @Mutation(() => Phonebook)
  removePhonebook(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.phonebookService.remove(id);
  }
}
