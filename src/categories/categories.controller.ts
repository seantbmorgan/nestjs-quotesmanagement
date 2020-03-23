import {
  Controller,
  Get,
  Query,
  ValidationPipe,
  Param,
  ParseIntPipe,
  UseGuards,
  Post,
  UsePipes,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { GetCategoryFilterDto } from './dto/get-categories-filter-dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Category } from './category.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateCategoryDto } from './dto/create-category-dto';
import { UpdateCategoryDto } from './dto/update-category-dto';
import { UpdateResult } from 'typeorm';

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

  @Post()
  @UsePipes(ValidationPipe)
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @GetUser() user: User,
  ): Promise<Category> {
    return this.categoriesService.createCategory(createCategoryDto, user);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  updateAuthor(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @GetUser() user: User,
  ): Promise<UpdateResult> {
    return this.categoriesService.updateCategory(id, updateCategoryDto, user);
  }

  @Delete('/:id')
  deleteAuthorById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.categoriesService.deleteCategoryById(id, user);
  }
}
