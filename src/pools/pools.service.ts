import { Injectable } from '@nestjs/common';
import { CreatePoolInput } from './dto/create-pool.input';
import { UpdatePoolInput } from './dto/update-pool.input';

@Injectable()
export class PoolsService {
  create(createPoolInput: CreatePoolInput) {
    return 'This action adds a new pool';
  }

  findAll() {
    return `This action returns all pools`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pool`;
  }

  update(id: number, updatePoolInput: UpdatePoolInput) {
    return `This action updates a #${id} pool`;
  }

  remove(id: number) {
    return `This action removes a #${id} pool`;
  }
}
