import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BooksService } from './books/books.service';
import dataSource from './_config/dataSource.config';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    console.log('🗑 Dropping database...');
    await dataSource.initialize();
    await dataSource.dropDatabase();
    await dataSource.destroy();

    console.log('🛠 Creating database...');
    const appDataSource = app.get(dataSource.constructor);

    console.log('📜 Running migrations...');
    await appDataSource.runMigrations();

    console.log('🌱 Seeding database...');
    const booksService = app.get(BooksService);
    await booksService.seed();

    console.log('✅ Seeding complete!');

  } catch (error) {
    console.error("❌ Seeding failed!", error);
  } finally {
    await app.close();
  }
}

seed();
