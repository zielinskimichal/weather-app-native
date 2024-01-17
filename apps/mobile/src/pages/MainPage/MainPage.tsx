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

  // I know this looks terrible, the intent is to fetch weather info for a city when user types one and attempt
  // to fetch weather info for user's location when user allows the app to use their location. The typed query takes
  // precedence over the user's location.
  useEffect(() => {
    const fetchWeatherInfo = async () => {
      setLoading(true);

      if (city) {
        const data = await getWeatherForCity(city);
        setWeatherInfo(data);
        setError(data ? null : "Please enter a valid city");
      } else if (longitude && latitude) {
        const data = await getWeatherForCoordinates({
          latitude,
          longitude,
        });
        setWeatherInfo(data);
        setError(data ? null : "Unexpected error occurred");
      } else {
        setWeatherInfo(null);
        setError(null);
      }

      setLoading(false);
    };

    fetchWeatherInfo();
  }, [longitude, latitude, city]);
  console.log(longitude, latitude);

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
