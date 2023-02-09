import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Args } from '@nestjs/graphql';
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
    @Args('createContactInput')
    createContactInput: CreateContactInput,
  ): Promise<Contact> {
    const contact = this.contactRepositry.create(
      createContactInput,
    );
    return await this.contactRepositry.save(contact)
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
