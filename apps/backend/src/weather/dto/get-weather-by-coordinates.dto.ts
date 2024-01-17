import { IsLatitude, IsLongitude } from 'class-validator';

export class GetWeatherByCoordinatesDto {
  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;
}
