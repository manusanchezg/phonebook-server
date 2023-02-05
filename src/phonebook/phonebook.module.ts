import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phonebook } from './entities';
import { PhonebookService } from './phonebook.service';
import { PhonebookResolver } from './phonebook.resolver';

@Module({
  providers: [PhonebookResolver, PhonebookService],
  imports: [TypeOrmModule.forFeature([Phonebook])]
})
export class PhonebookModule {}
