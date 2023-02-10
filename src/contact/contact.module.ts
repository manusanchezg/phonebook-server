import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities';
import { ContactService } from './contact.service';
import { ContactResolver } from './contact.resolver';

@Module({
  providers: [ContactService, ContactResolver],
  imports: [TypeOrmModule.forFeature([Contact])],
  exports: [TypeOrmModule, ContactService],
})
export class ContactModule {}
