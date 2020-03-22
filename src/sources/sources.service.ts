import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { SourceRepository } from './source.repository';
import { GetSourcesFilterDto } from './dto/get-sources-filter-dto';
import { CreateSourceDto } from './dto/create-source-dto';
import { Source } from './source.entity';

@Injectable()
export class SourcesService {
    constructor(
        @InjectRepository(SourceRepository) private sourceRepository: SourceRepository,
    ){}

    async getSource(filterDto: GetSourcesFilterDto, user: User): Promise<Source[]> {
        return this.sourceRepository.getSources(filterDto, user);
      }

    async createSource(createSourceDto: CreateSourceDto, user: User){
        return this.sourceRepository.createSource(createSourceDto, user)
    }
}
