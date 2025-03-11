import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBeverageInput } from './dto/create-beverage.input';
import { BeverageEntity } from './entities/beverage.entity.typeorm';
import { BeveragesRepository } from './persistence/beverages.repository';

@Injectable()
export class BeveragesService {
  constructor(@InjectRepository(BeverageEntity) private readonly repository: BeveragesRepository) { }
  
  async create(createBeverageInput: CreateBeverageInput) {
    return await this.repository.save(createBeverageInput);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id }});
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
