import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, InternalServerErrorException, ConflictException, Put } from '@nestjs/common';
import { LibraryBookService } from './library-book.service';
import { CreateLibraryBookDto } from './dto/create-library-book.dto';
import { UpdateLibraryBookDto } from './dto/update-library-book.dto';
import { LibraryChapterService } from './library-chapter.service';
import { CreateLibraryChapterDto } from './dto/create-library-chapter.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import * as multer from 'multer';
import * as sharp from 'sharp';
import { writeFile } from 'fs/promises';
import { promises as fs } from 'fs';
import { UpdateLibraryChapterDto } from './dto/update-library-chapter.dto';


@Controller('library')
export class LibraryController {
  constructor(
    private readonly libraryBookService: LibraryBookService,
    private readonly libraryChapterService: LibraryChapterService,
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('cover', { storage: multer.memoryStorage() }))
  async create(
    @Body() dto: CreateLibraryBookDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file || !file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Invalid image upload');
    }

    const isExist = await this.libraryBookService.checkByTitle(dto.title);
    if (isExist) throw new ConflictException("This book is already exist!");

    dto.slug = dto.title.toLowerCase().split(' ').join('-');

    const filename = `${dto.slug}.webp`;
    const filePath = `/var/www/html/img/library-book-covers`;

    const outputPath = join(filePath, filename);

    const optimized = await sharp(file.buffer)
      .resize({ width: 600 }) // Optional
      .webp({ quality: 75 })
      .toBuffer();

    // Check privilege before write file in /var/www/html/..
    try {
      await fs.access(filePath, fs.constants.W_OK);
      console.log('✅ Write access confirmed for:', filePath);
    } catch (err) {
      console.error('❌ No write access to:', filePath);
      console.error(err);
      throw new InternalServerErrorException('Backend does not have write access to the image directory!');
    }

    await writeFile(outputPath, optimized);
    return await this.libraryBookService.create(dto);
  }

  @Post('chapter')
  async createChapter(@Body() dto: CreateLibraryChapterDto) {
    return await this.libraryChapterService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.libraryBookService.findAll();
  }

  @Get('chapter')
  async findAllChapters() {
    return await this.libraryChapterService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.libraryBookService.findOne(id);
  }

  @Get('slug/:slug')
  async findOneBySlug(@Param('slug') slug: string) {
    return await this.libraryBookService.findOneBySlug(slug);
  }

  @Get('chapter/order/:slug')
  async getNextChapterOrder(@Param('slug') slug: string) {
    return await this.libraryChapterService.getNextOrder(slug);
  }

  @Get('chapter/:id')
  async findOneChapter(@Param('id') id: string) {
    return await this.libraryChapterService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateLibraryBookDto) {
    return await this.libraryBookService.update(id, dto);
  }

  @Patch('chapter/:id')
  async updateChapter(@Param('id') id: string, @Body() dto: UpdateLibraryChapterDto) {
    return await this.libraryChapterService.update(id, dto);
  }

  @Put('chapter/order/:slug')
  async changeChapterOrder(@Param('slug') slug: string, @Body() body: { chapterOrder: number, targetOrder: number }) {
    const { chapterOrder, targetOrder } = body;
    return await this.libraryChapterService.changeOrder(slug, chapterOrder, targetOrder);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.libraryBookService.remove(id);
  }

  @Delete('chapter/:id')
  async removeChapter(@Param('id') id: string) {
    return await this.libraryChapterService.remove(id);
  }
}
