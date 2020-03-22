import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { GetCategoryFilterDto } from './dto/get-categories-filter-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category-dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async getCategories(
    filterDto: GetCategoryFilterDto,
    user: User,
  ): Promise<Category[]> {
    return this.categoryRepository.getCategories(filterDto, user);
  }

  async createCategory(createCategoryDto: CreateCategoryDto, user: User) {
    return this.categoryRepository.createCategory(createCategoryDto, user);
  }
}
