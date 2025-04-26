import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly _healthService: HealthService) {}

  /**
   * Health check endpoint
   * @returns {Object} - health check response
   */

  @ApiOkResponse({
    description: 'Health check response',
    schema: {
      type: 'object',
      properties: {
        checked: {
          type: 'string',
          example: new Date().toISOString(),
        },
      },
    },
  })
  @Get()
  check(): { checked: string } {
    return this._healthService.check();
  }
}
