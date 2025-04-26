import { CombinationsModule } from '@combinations/combinations.module';
import { HealthModule } from '@health/health.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [HealthModule, CombinationsModule],
})
export class AppModule {}
