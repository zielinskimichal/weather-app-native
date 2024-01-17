import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherResponseDto } from './dto/weather.response.dto';
import { GetWeatherByCoordinatesDto } from './dto/get-weather-by-coordinates.dto';

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
  @Get()
  async getByLatLon(
    @Query() getWeatherByCoordinatesDto: GetWeatherByCoordinatesDto,
  ): Promise<WeatherResponseDto> {
    const { longitude, latitude } = getWeatherByCoordinatesDto;
    const res = await this.weatherService.getWeatherForCoordinates(
      latitude,
      longitude,
    );
    return res;
  }
}
