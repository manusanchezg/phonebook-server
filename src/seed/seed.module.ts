import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { ConfigModule } from '@nestjs/config';
import { ContactModule } from 'src/contact/contact.module';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [ConfigModule, ContactModule]
})
export class SeedModule {}
