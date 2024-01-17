import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherResponseDto } from './dto/weather.response.dto';

@ApiTags('weather')
@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @ApiOperation({
    summary: 'Get weather for a city',
    operationId: 'getWeatherForCity',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the weather for a given city.',
    type: WeatherResponseDto,
  })
  @Get(':city')
  async getByCity(@Param('city') city: string): Promise<WeatherResponseDto> {
    const res = await this.weatherService.getWeatherForCity(city);
    console.log(res);
    return res;
  }

  @ApiOperation({
    summary: 'Get weather for a given lat/lon pair',
    operationId: 'getWeatherForLatLon',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the weather for a given lat/lon pair.',
    type: WeatherResponseDto,
  })
  @Get('coordinates/:lat/:lon')
  async getByLatLon(
    @Param('lat') lat: number,
    @Param('lon') lon: number,
  ): Promise<WeatherResponseDto> {
    const res = await this.weatherService.getWeatherForCoordinates(lat, lon);
    console.log(res);
    return res;
  }
}
