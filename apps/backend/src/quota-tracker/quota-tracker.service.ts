import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';


@Injectable()
export class QuotaTrackerService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  private getKey(provider: string): string {
    const now = new Date();
    const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    return `quota:${provider}:${yearMonth}`;
  }

  async addUsage(provider: string, amount: number): Promise<void> {
    const key = this.getKey(provider);
    const current = (await this.cache.get<number>(key)) ?? 0;
    await this.cache.set(key, current + amount);
  }

  async getUsage(provider: string): Promise<number> {
    const key = this.getKey(provider);
    return (await this.cache.get<number>(key)) ?? 0;
  }

  async isWithinLimit(provider: string, limit: number): Promise<boolean> {
    const usage = await this.getUsage(provider);
    return usage < limit;
  }

  async resetUsage(provider: string): Promise<void> {
    const key = this.getKey(provider);
    await this.cache.del(key);
  }
}
