import { Repository, EntityRepository } from 'typeorm';
import { User } from 'src/auth/user.entity';

import { CreateCategoryDto } from './dto/create-category-dto';
import { GetCategoryFilterDto } from './dto/get-categories-filter-dto';
import { Logger } from '@nestjs/common';
import { Category } from './category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  private logger = new Logger('CategoryRepository');

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    user: User,
  ): Promise<Category> {
    this.logger.log(`
      Create Category 
        createAuthorDto : ${JSON.stringify(createCategoryDto)}
        user            : ${JSON.stringify(user)}
    `);
    const { name } = createCategoryDto;
    const newCategory = new Category();
    newCategory.name = name;

    const category = await this.getCategories({ name }, user);
    console.log(category);
    if (category.length) {
      this.logger.log(`
      ${JSON.stringify(category)} exists.
    `);
      return category[0];
    } else {
      this.logger.log(`
      ${JSON.stringify(newCategory)} does not exit, creating.
    `);
      newCategory.user = user;
      await newCategory.save();
      delete newCategory.user; // Do Not Return User Data to Client
      return newCategory;
    }
  }

  async getCategories(
    filterDto: GetCategoryFilterDto,
    user: User,
  ): Promise<Category[]> {
    const { name } = filterDto;
    const userId = user.id;
    const query = this.createQueryBuilder('category');
    query.where('category.userId = :userId', { userId });
    if (name) {
      query.andWhere('category.name = :name', { name });
    }
    const categories = await query.getMany();
    return categories;
  }
}
