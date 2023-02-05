import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  UpdateContactInput,
  CreateContactInput,
} from './dto/inputs';
import { Contact } from './entities';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepositry: Repository<Contact>,
  ) {}
  async create(
    @Args('createContactInput')
    createContactInput: CreateContactInput,
  ): Promise<Contact> {
    const contact = this.contactRepositry.create(
      createContactInput,
    );
      console.log(await this.contactRepositry.save(contact))
    return await this.contactRepositry.save(contact)
  }

  findAll() {
    return `This action returns all Contact`;
  }

  findOne(id: number) {
    return `This action returns a #${id} Contact`;
  }

  update(
    id: number,
    updateContactInput: UpdateContactInput,
  ) {
    return `This action updates a #${id} Contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} Contact`;
  }
}
