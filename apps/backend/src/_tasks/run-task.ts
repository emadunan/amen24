import { NestFactory } from '@nestjs/core';
import { DataTransformModule } from '../data-transform/data-transform.module';
import { DataTransformService } from '../data-transform/data-transform.service';
import * as path from 'path';
import { existsSync } from 'fs';

async function bootstrap() {
  const taskFile = process.argv[2];

  if (!taskFile) {
    console.error('❌ Please specify a task file. Example: `npm run task normalize-native.ts`');
    process.exit(1);
  }

  const taskPath = path.resolve(__dirname, taskFile);

  if (!existsSync(taskPath)) {
    console.error(`❌ Task file not found at ${taskPath}`);
    process.exit(1);
  }

  const { run } = await import(taskPath);

  if (typeof run !== 'function') {
    console.error(`❌ The file "${taskFile}" must export a 'run' function`);
    process.exit(1);
  }

  const app = await NestFactory.createApplicationContext(DataTransformModule);
  const dataTransformService = app.get(DataTransformService);

  await run(dataTransformService);

  await app.close();
}

bootstrap();
