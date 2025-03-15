import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.typeorm.entity';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {}
