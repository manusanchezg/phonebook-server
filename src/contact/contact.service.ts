import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { createWriteStream } from 'fs';
import { join } from 'path';
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
    return contact;
  }

  async findAll(): Promise<Contact[]> {
    return this.contactRepositry.find();
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.contactRepositry.findOneBy({
      id,
    });
    if (!contact)
      throw new NotFoundException(
        `Item with id #${id} not found`,
      );
    return contact;
  }

  async update(
    id: string,
    updateContactInput: UpdateContactInput,
  ): Promise<Contact> {
    const contact = await this.contactRepositry.preload(
      updateContactInput,
    );
    if (!contact)
      throw new NotFoundException(
        `Item with id #${id} not found`,
      );
    return this.contactRepositry.save(contact);
  }

  remove(id: string) {
    return this.contactRepositry.softDelete(id);
  }
}
