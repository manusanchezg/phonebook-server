import { Injectable } from '@nestjs/common';
import {
  UpdatePhonebookInput,
  CreatePhonebookInput,
} from './dto/inputs';

@Injectable()
export class PhonebookService {
  create(createPhonebookInput: CreatePhonebookInput) {
    return 'This action adds a new phonebook';
  }

  findAll() {
    return `This action returns all phonebook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} phonebook`;
  }

  update(
    id: number,
    updatePhonebookInput: UpdatePhonebookInput,
  ) {
    return `This action updates a #${id} phonebook`;
  }

  remove(id: number) {
    return `This action removes a #${id} phonebook`;
  }
}
