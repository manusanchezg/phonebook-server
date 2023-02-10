import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactService } from 'src/contact/contact.service';
import { Contact } from 'src/contact/entities';
import { Repository } from 'typeorm';
import { SEED_CONTACTS } from './data/seed-data';

@Injectable()
export class SeedService {
  private isProd: Boolean;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Contact)
    private readonly ContactRepository: Repository<Contact>,
    private readonly contactService: ContactService,
  ) {
    this.isProd = configService.get('STATE') === 'prod';
  }

  async executeSeed() {
    if (this.isProd) {
      throw new UnauthorizedException(
        'We cannot run SEED on production',
      );
    }
    await this.deleteDatabase();
    const contacts = await this.loadContacts()
    return true;
  }

  async deleteDatabase() {
    await this.ContactRepository.createQueryBuilder()
      .delete()
      .where({})
      .execute();
  }

  async loadContacts(): Promise<Contact> {
    const contacts = [];
    for (const contact of SEED_CONTACTS) {
      contacts.push(
        await this.contactService.create(
          contact.first_name,
          contact.last_name,
          contact.address,
          contact.phone_numbers,
          contact.photo,
          contact.nickname,
        ),
      );
    }
    return contacts[0]
  }
}
