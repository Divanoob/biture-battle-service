import { Injectable } from '@nestjs/common';
import { CreatePoolRecordEntryInput } from './dto/create-pool-record-entry.input';
import { UpdatePoolRecordEntryInput } from './dto/update-pool-record-entry.input';

@Injectable()
export class PoolRecordEntriesService {
  create(createPoolRecordEntryInput: CreatePoolRecordEntryInput) {
    return 'This action adds a new poolRecordEntry';
  }

  findAll() {
    return `This action returns all poolRecordEntries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} poolRecordEntry`;
  }

  update(id: number, updatePoolRecordEntryInput: UpdatePoolRecordEntryInput) {
    return `This action updates a #${id} poolRecordEntry`;
  }

  remove(id: number) {
    return `This action removes a #${id} poolRecordEntry`;
  }
}
