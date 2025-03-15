import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from './dto/create-user.input';
import { GetUsersInput } from './dto/get-users.input';
import { UpdateUserNameInput } from './dto/update-user-name.input';
import { UpdateUserPasswordInput } from './dto/update-user-password.input';
import { User } from './entities/user.graphql.entity';
import { UserEntity } from './entities/user.typeorm.entity';
import { UsersRepository } from './persistence/users.repository';
import { UsersMapper } from './users.mapper';

@Injectable()
export class UsersService {
  private readonly mapper: UsersMapper;

  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: UsersRepository,
  ) {
    this.mapper = new UsersMapper();
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

  async findAll(userDto: GetUsersInput): Promise<User[]> {
    return this.mapper.entitiesToDomains(
      await this.repository.find({ where: userDto }),
    );
  }

  async findOne(id: number): Promise<User> {
    const entity = await this.repository.findOneBy({ id });
    if (entity === null) {
      throw new NotFoundException();
    }
    return this.mapper.entityToDomain(entity);
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

  async remove(id: number): Promise<boolean> {
    const deleteResult = await this.repository.delete({ id });
    return !!deleteResult.affected && deleteResult.affected > 0;
  }
}
