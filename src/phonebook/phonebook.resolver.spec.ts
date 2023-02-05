import { Test, TestingModule } from '@nestjs/testing';
import { PhonebookResolver } from './phonebook.resolver';
import { PhonebookService } from './phonebook.service';

describe('PhonebookResolver', () => {
  let resolver: PhonebookResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhonebookResolver, PhonebookService],
    }).compile();

    resolver = module.get<PhonebookResolver>(PhonebookResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
