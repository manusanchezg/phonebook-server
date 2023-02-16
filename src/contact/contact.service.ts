import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Args, Float, ID, Int } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import {
  SearchArgs,
  PaginationArgs,
} from 'src/common/dto/args';
import { Like, Repository } from 'typeorm';
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
    @Args('first_name', { type: () => String })
    first_name: string,
    @Args('last_name', { type: () => String })
    last_name: string,
    @Args('address', { type: () => String })
    address: string,
    @Args('phone_numbers', { type: () => [Float!] })
    phone_numbers: number[],
    @Args('photo', { type: () => String })
    photo: string,
    @Args('nickname', {
      type: () => String,
      nullable: true,
    })
    nickname?: string,
  ): Promise<Contact> {
    const contactToCreate: CreateContactInput = {
      first_name,
      last_name,
      address,
      phone_numbers,
      photo,
      nickname,
    };
    const contact =
      this.contactRepositry.create(contactToCreate);
    return await this.contactRepositry.save(contact);
  }

  async findAll(
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<Contact[]> {
    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;

    const queryBuilder = this.contactRepositry
      .createQueryBuilder()
      .take(limit)
      .skip(offset)
      .orderBy({
        "nickname": "ASC",
        "CONCAT(first_name, ' ' ,last_name)": "ASC",
      })

    if (search)
      queryBuilder.andWhere(
        `LOWER("first_name") like :name OR
         LOWER("last_name") like :name OR
         LOWER("nickname") like :name`,
        {
          name: `%${search.toLocaleLowerCase()}%`,
        },
      );

    return queryBuilder.getMany();
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
    @Args('id', { type: () => ID })
    id: string,
    @Args('first_name', { type: () => String })
    first_name: string,
    @Args('last_name', { type: () => String })
    last_name: string,
    @Args('address', { type: () => String })
    address: string,
    @Args('phone_numbers', { type: () => [Float!] })
    phone_numbers: number[],
    @Args('photo', { type: () => String })
    photo: string,
    @Args('nickname', {
      type: () => String,
      nullable: true,
    })
    nickname?: string,
  ): Promise<Contact> {
    const contactToUpdate = {
      id,
      first_name,
      last_name,
      address,
      phone_numbers,
      photo,
      nickname,
    };
    const contact = await this.contactRepositry.preload(
      contactToUpdate,
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
