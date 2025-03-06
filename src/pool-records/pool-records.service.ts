import { Injectable } from '@nestjs/common';
import { CreatePoolRecordInput } from './dto/create-pool-record.input';
import { UpdatePoolRecordInput } from './dto/update-pool-record.input';

@Injectable()
export class PoolRecordsService {
  create(createPoolRecordInput: CreatePoolRecordInput) {
    return 'This action adds a new poolRecord';
  }

  findAll() {
    return `This action returns all poolRecords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} poolRecord`;
  }

  update(id: number, updatePoolRecordInput: UpdatePoolRecordInput) {
    return `This action updates a #${id} poolRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} poolRecord`;
  }
}
