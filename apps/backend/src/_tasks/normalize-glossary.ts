import { DataTransformService } from '../data-transform/data-transform.service';

export async function run(service: DataTransformService) {
  console.log('⚙️ Starting glossary normalization...');

  try {
    await service.normalizeGlossaryTranslations();
    console.log('✅ Glossary normalization complete!');
  } catch (error) {
    console.error('❌ Error during glossary normalization:', error);
  }
}
