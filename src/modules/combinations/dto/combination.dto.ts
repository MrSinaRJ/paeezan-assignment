import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class CombinationDto {
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'A string consisting only of the digits 2 through 9',
    example: '28952',
    minLength: 1,
  })
  @IsNotEmpty()
  @Matches(/^[2-9]*$/, {
    message: 'PhoneNumber must contain only digits from 2 to 9',
  })
  phoneNumber!: string;
}
