import { DataTransformService } from '../data-transform/data-transform.service';

export async function run(service: DataTransformService) {
  console.log('⚙️ Start creating slug for bible books...');

  try {
    await service.createBibleBookSlug();
    console.log('✅ Slugs creation complete!');
  } catch (error) {
    console.error('❌ Error during slug creation:', error);
  }
}
