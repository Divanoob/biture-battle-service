import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CRUDService, GetByIdDto } from 'src/core';
import { CreateUserInput, GetUsersInput, UpdateUserNameInput, UpdateUserPasswordInput } from './dto';
import { User, UserEntity } from './entities';
import { UsersRepository } from './persistence/users.repository';
import { UsersMapper } from './users.mapper';

@Injectable()
export class UsersService extends CRUDService<
  User,
  UserEntity,
  CreateUserInput,
  User,
  GetUsersInput,
  GetByIdDto,
  UsersRepository
> {
  async checkRelationsBeforeQuery(): Promise<boolean> {
    return true;
  }

  constructor(
    @InjectRepository(UserEntity)
    repository: UsersRepository,
  ) {
    super({
      repository,
      domain: User,
      mapper: UsersMapper
    });
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const existingEntities = await this.repository.find({
      where: [{ email: createUserInput.email }],
    });
    if (existingEntities.length > 0) {
      throw new BadRequestException('This email is already in use.');
    }
    const newEntity = this.repository.create(createUserInput);
    const saltingRounds = 10;
    newEntity.encryptedPassword = await bcrypt.hash(
      createUserInput.password,
      saltingRounds,
    );
    return this.mapper.entityToDomain(await this.repository.save(newEntity));
  }

  async updatePassword(
    id: number,
    updateUserPasswordInput: UpdateUserPasswordInput,
  ): Promise<boolean> {
    const entity = await this.repository.findOneBy({ id });
    if (entity === null) {
      throw new NotFoundException();
    }
    const saltingRounds = 10;
    entity.encryptedPassword = await bcrypt.hash(
      updateUserPasswordInput.password,
      saltingRounds,
    );
    await this.repository.save(entity);
    return true;
  }

  async updateName(
    id: number,
    updateUserNameInput: UpdateUserNameInput,
  ): Promise<boolean> {
    const entity = await this.repository.findOneBy({ id });
    if (entity === null) {
      throw new NotFoundException();
    }
    entity.name = updateUserNameInput.name;
    await this.repository.save(entity);
    return true;
  }
}
