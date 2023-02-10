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
    @Args('firstName', {type: () => String})
    firstName: string,
    @Args('lastName',  {type: () => String})
    lastName: string,
    @Args('address',  {type: () => String})
    address: string,
    @Args('phoneNumbers', {type: () => [Float!]})
    phoneNumbers: number[],
    @Args('photo', {type: () => String})
    photo: string,
    @Args('nickname',  {type: () => String, nullable:true})
    nickname?: string,
  ): Promise<Contact> {
    const contactToCreate: CreateContactInput = {
      firstName,
      lastName,
      nickname,
      address,
      phoneNumbers,
      photo,
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
      .skip(offset);

    if (search)
      queryBuilder.andWhere(
        `LOWER("firstName") like :name OR
         LOWER("lastName") like :name OR
         LOWER("nickname") like :name`,
        {
          name: `%${search.toLocaleLowerCase()}%`,
        },
      );

    return queryBuilder.getMany();
    // return this.contactRepositry.find({
    //   take: limit,
    //   skip: offset,
    //   where: {
    //     firstName: Like(`%${search}%`)
    //   }
    // });
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

  private uploadImage(file) {}

  async update(
    @Args('id', {type: ()=> ID})
    id: string,
    @Args('firstName', {type: () => String})
    firstName: string,
    @Args('lastName',  {type: () => String})
    lastName: string,
    @Args('address',  {type: () => String})
    address: string,
    @Args('phoneNumbers', {type: () => [Float!]})
    phoneNumbers: number[],
    @Args('photo', {type: () => String})
    photo: string,
    @Args('nickname',  {type: () => String, nullable:true})
    nickname?: string,
  ): Promise<Contact> {
    const contactToUpdate = {id, firstName, lastName, address, phoneNumbers, photo, nickname}
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
