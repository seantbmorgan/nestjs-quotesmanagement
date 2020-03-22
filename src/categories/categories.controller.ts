import {
  Controller,
  Get,
  Query,
  ValidationPipe,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { GetCategoryFilterDto } from './dto/get-categories-filter-dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Category } from './category.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategory(
    @Query(ValidationPipe) filterDto: GetCategoryFilterDto,
    @GetUser() user: User,
  ) {
    return this.categoriesService.getCategories(filterDto, user);
  }

  @Get('/:id')
  getCategoryById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Category> {
    console.log(user);
    return this.categoriesService.getCategoryById(id, user);
  }
}
