import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

interface RedisCache extends Cache {
  get<T>(key: string): Promise<T | undefined>;
  set<T>(key: string, value: T, options?: any): Promise<void>;
  del(key: string): Promise<void>;
  store: {name: string}
}

@Injectable()
export class QuotaTrackerService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: RedisCache,
  ) {
    console.log('CacheManager store type:', this.cacheManager);
  }

  private getKey(provider: string): string {
    const now = new Date();
    const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    return `quota:${provider}:${yearMonth}`;
  }

  async addUsage(provider: string, amount: number): Promise<void> {
    const key = this.getKey(provider);
    const current = (await this.cacheManager.get<number>(key)) ?? 0;
    await this.cacheManager.set(key, current + amount);
  }

  async getUsage(provider: string): Promise<number> {
    const key = this.getKey(provider);
    return (await this.cacheManager.get<number>(key)) ?? 0;
  }

  async isWithinLimit(provider: string, limit: number): Promise<boolean> {
    const usage = await this.getUsage(provider);
    return usage < limit;
  }

  async resetUsage(provider: string): Promise<void> {
    const key = this.getKey(provider);
    await this.cacheManager.del(key);
  }
}
