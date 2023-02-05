import { Module } from '@nestjs/common';
import { PhonebookService } from './phonebook.service';
import { PhonebookResolver } from './phonebook.resolver';

@Module({
  providers: [PhonebookResolver, PhonebookService]
})
export class PhonebookModule {}
