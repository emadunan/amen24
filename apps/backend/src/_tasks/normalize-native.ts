import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { VersesService } from '../verses/verses.service';

async function normalize() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    console.log('🔤 Normalizing Native verses...');
    const versesService = app.get(VersesService);
    await versesService.normalizeNativeVersesInBatches();
    console.log('✅ Normalization complete!');
  } catch (error) {
    console.error('❌ Normalization failed!', error);
  } finally {
    await app.close();
  }
}

normalize();
