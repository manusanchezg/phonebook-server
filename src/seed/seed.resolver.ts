import { Resolver, Mutation } from '@nestjs/graphql';
import { SeedService } from './seed.service';

@Resolver()
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}

  @Mutation(() => Boolean, {
    description: 'Executes a demo in the database',
    name: 'executeSeed',
  })
  async executeSeed(): Promise<Boolean> {
    return this.seedService.executeSeed();
  }
}
