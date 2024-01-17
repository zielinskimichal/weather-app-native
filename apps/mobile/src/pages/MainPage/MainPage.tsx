import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";

import { WeatherInfoDisplay } from "../../components/WeatherInfoDisplay/WeatherInfoDisplay";
import { WeatherInfo } from "../../components/WeatherInfoDisplay/WeatherInfoDisplay.types";
import { getUserLocation, LocationType } from "../../utils";
import { getWeatherForCity } from "../../utils/getWeatherForCity";
import { getWeatherForCoordinates } from "../../utils/getWeatherForCoordinates";

export const MainPage = () => {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { longitude, latitude } = location || {};

  useEffect(() => {
    getUserLocation(setLocation);
  }, []);

  useEffect(() => {
    const fetchWeatherInfo = async () => {
      setLoading(true);
      if (city) {
        const data = await getWeatherForCity(city);
        setWeatherInfo(data);
        if (!data) {
          setError("Please enter a valid city");
        } else {
          setError(null);
        }
      } else if (longitude && latitude) {
        const data = await getWeatherForCoordinates({
          latitude,
          longitude,
        });
        setWeatherInfo(data);
        if (!data) {
          setError("Unexpected error occurred");
        } else {
          setError(null);
        }
      } else {
        setWeatherInfo(null);
        setError(null);
      }
      setLoading(false);
    };

    fetchWeatherInfo();
  }, [longitude, latitude, city]);

  return (
    <View>
      <Searchbar
        placeholder="Search for a city"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={() => setCity(searchQuery)}
        style={styles.searchbar}
        onClearIconPress={() => setCity(null)}
      />
      <WeatherInfoDisplay data={weatherInfo} loading={loading} error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    marginTop: 20,
  },
});
