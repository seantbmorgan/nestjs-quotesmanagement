import { Injectable, NotFoundException, Inject, Logger } from '@nestjs/common';
import { QuoteStatus } from './quote-status.enum';
import { CreateQuoteDto } from './dto/create-quote.dto';
import * as _ from 'lodash';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { GetQuotesFilterDto } from './dto/get-quotes-filter.dto';
import { QuoteRepository } from './quote.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './quote.entity';
import { User } from 'src/auth/user.entity';
import { AuthorsService } from 'src/authors/authors.service';
import { SourcesService } from 'src/sources/sources.service';
import { CategoriesService } from 'src/categories/categories.service';
import { TagsService } from 'src/tags/tags.service';

@Injectable()
export class QuotesService {
  private logger = new Logger('QuotesService');

  constructor(
    @InjectRepository(QuoteRepository) private quoteRepository: QuoteRepository,
    private authorService: AuthorsService,
    private sourceService: SourcesService,
    private categoryService: CategoriesService,
    private tagsService: TagsService,
  ) {}

  async getQuotes(filterDto: GetQuotesFilterDto, user: User): Promise<Quote[]> {
    return this.quoteRepository.getQuotes(filterDto, user);
  }

  async getAllQuotes(): Promise<Quote[]> {
    const quotes = await this.quoteRepository.find();
    if (!quotes) throw new NotFoundException(`No quotes found`);
    return quotes;
  }

  async getQuoteById(id: number, user: User): Promise<Quote> {
    const quote = await this.quoteRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!quote) throw new NotFoundException(`Quote with id ${id} not found`);
    return quote;
  }

  async createQuote(
    createQuoteDto: CreateQuoteDto,
    user: User,
  ): Promise<Quote> {
    this.logger.log(`
      Creating Quote -
           createQuoteDto : ${JSON.stringify(createQuoteDto)}
           user           : ${JSON.stringify(user)}
    `);
    const {
      authorFirstname,
      authorLastname,
      sourceTitle,
      categories,
      tags,
    } = createQuoteDto;

    const categoryArray = categories.split(',');
    const tagArray = tags.split(',');

    // Save Categories
    const saveCategoriesData = async () => {
      return Promise.all(
        categoryArray.map(category =>
          this.categoryService.createCategory({ name: category }, user),
        ),
      );
    };
    let savedCategories = [];
    saveCategoriesData().then(categories => {
      savedCategories = categories;
    });

    // Save Tags
    const saveTagsData = async () => {
      return Promise.all(
        tagArray.map(tag => this.tagsService.createTag({ name: tag }, user)),
      );
    };
    let savedTags = [];
    saveTagsData().then(tags => {
      savedTags = tags;
    });

    // Save Author
    const author = await this.authorService.createAuthor(
      { firstname: authorFirstname, lastname: authorLastname },
      user,
    );
    const source = await this.sourceService.createSource(
      { title: sourceTitle },
      user,
    );

    return this.quoteRepository.createQuote(
      createQuoteDto,
      author,
      source,
      savedCategories,
      savedTags,
      user,
    );
  }

  async deleteQuoteById(id: number, user: User): Promise<void> {
    const result = this.quoteRepository.delete({
      id,
      userId: user.id,
    });
    if (!(await result).affected)
      throw new NotFoundException(`Quote with id ${id} not found`);
  }

  async updateQuoteStatus(
    id: number,
    status: QuoteStatus,
    user: User,
  ): Promise<Quote> {
    const quote = await this.getQuoteById(id, user);
    if (!quote) throw new NotFoundException(`Quote with id ${id} not found`);
    quote.status = status;
    await quote.save();
    return quote;
  }

  async updateQuote(
    id,
    updateQuoteDto: UpdateQuoteDto,
    user: User,
  ): Promise<Quote> {
    const quote = await this.getQuoteById(id, user);

    if (!quote) throw new NotFoundException(`Quote with id ${id} not found`);

    const {
      authorFirstname,
      authorLastname,
      sourceTitle,
      categories,
      tags,
    } = updateQuoteDto;

    const categoryArray = categories.split(',');
    const tagArray = tags.split(',');

    // Save Categories
    const saveCategoriesData = async () => {
      return Promise.all(
        categoryArray.map(category =>
          this.categoryService.createCategory({ name: category }, user),
        ),
      );
    };
    let savedCategories = [];
    saveCategoriesData().then(categories => {
      savedCategories = categories;
    });

    // Save Tags
    const saveTagsData = async () => {
      return Promise.all(
        tagArray.map(tag => this.tagsService.createTag({ name: tag }, user)),
      );
    };
    let savedTags = [];
    saveTagsData().then(tags => {
      savedTags = tags;
    });

    // Save Author
    const author = await this.authorService.createAuthor(
      { firstname: authorFirstname, lastname: authorLastname },
      user,
    );
    const source = await this.sourceService.createSource(
      { title: sourceTitle },
      user,
    );

    quote.quote = updateQuoteDto.quote;
    quote.author = author;
    quote.source = source;
    quote.page = updateQuoteDto.page;
    quote.categories = savedCategories;
    quote.tags = savedTags;

    // _.merge(quote, updateQuoteDto);

    await quote.save();
    // quote = {...updateQuoteDto };
    // await newQuote.save();
    // let updated = false;
    // this.quotes = this.quotes.map(quote => {
    //   if (quote.id === id) {
    //     quote = newQuote;
    //   }
    //   return quote;
    // });
    // if (!updated) throw new NotFoundException(`Quote with id ${id} not found`);
    return quote;
  }
}
