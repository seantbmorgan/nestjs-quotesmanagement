import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { GetCategoryFilterDto } from './dto/get-categories-filter-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category-dto';
import { UpdateCategoryDto } from './dto/update-category-dto';

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

  async getCategoryById(id: number, user: User): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!category) throw new NotFoundException(`Category with id id not found`);
    return category;
  }

  async createCategory(createCategoryDto: CreateCategoryDto, user: User) {
    return this.categoryRepository.createCategory(createCategoryDto, user);
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto, user: User) {
    const { name } = updateCategoryDto;
    const category = await this.categoryRepository
      .createQueryBuilder()
      .update('category')
      .set({ name })
      .where('id = :id', { id })
      .execute();
    return category;
  }

  async deleteCategoryById(id: number, user: User): Promise<void> {
    const result = await this.categoryRepository.delete({
      id,
      userId: user.id,
    });
    if (!(await result).affected)
      throw new NotFoundException(`Category with id ${id} not found`);
  }
}
