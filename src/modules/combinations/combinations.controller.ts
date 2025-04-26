import { Body, Controller, Post } from '@nestjs/common';
import { CombinationsService } from './combinations.service';
import { CombinationDto } from './dto/combination.dto';

@Controller({ path: 'combinations', version: '1' })
export class CombinationsController {
  constructor(private readonly _combinationsService: CombinationsService) {}

  @Post()
  calculateCombinations(@Body() combinationDto: CombinationDto) {
    return this._combinationsService.calculateCombinations(
      combinationDto.phoneNumber,
    );
  }
}
