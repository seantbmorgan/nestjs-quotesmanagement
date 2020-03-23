import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { SourceRepository } from './source.repository';
import { GetSourcesFilterDto } from './dto/get-sources-filter-dto';
import { CreateSourceDto } from './dto/create-source-dto';
import { Source } from './source.entity';
import { UpdateSourceDto } from './dto/update-source-dto';

@Injectable()
export class SourcesService {
    constructor(
        @InjectRepository(SourceRepository) private sourceRepository: SourceRepository,
    ){}

    async getSource(filterDto: GetSourcesFilterDto, user: User): Promise<Source[]> {
        return this.sourceRepository.getSources(filterDto, user);
      }

      async getSourceById(id: number, user: User): Promise<Source> {
        const source = await this.sourceRepository.findOne({
          where: { id, userId: user.id },
        });
        if (!source) throw new NotFoundException(`Source with id ${id} not found`);
        return source;
      }

    async createSource(createSourceDto: CreateSourceDto, user: User){
        return this.sourceRepository.createSource(createSourceDto, user)
    }

    async updateSource(id: number, updateSourceDto: UpdateSourceDto, user: User) {
      const { title } = updateSourceDto;
      const source = await this.sourceRepository
        .createQueryBuilder()
        .update('source')
        .set({ title })
        .where('id = :id', { id })
        .execute();
      return source;
    }
  
    async deleteSourceById(id: number, user: User): Promise<void> {
      const result = await this.sourceRepository.delete({
        id,
        userId: user.id,
      });
      if (!(await result).affected)
        throw new NotFoundException(`Tag with id ${id} not found`);
    }
}
