import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";

import { WeatherInfoDisplay } from "../../components/WeatherInfoDisplay/WeatherInfoDisplay";
import { weatherInfoDisplayMocks } from "../../components/WeatherInfoDisplay/WeatherInfoDisplay.mocks";
import { getUserLocation } from "../../utils";

export const MainPage = () => {
  const [location, setLocation] = useState<any>(null);

  const [citySearch, setCitySearch] = useState("");

  useEffect(() => {
    async function getLocation() {
      const userLocation = await getUserLocation();
      setLocation(userLocation);
    }
    getLocation();
  }, []);

  return (
    <View>
      <Searchbar
        placeholder="Search for a city"
        value={citySearch}
        onChangeText={setCitySearch}
        style={styles.searchbar}
      />
      <WeatherInfoDisplay data={weatherInfoDisplayMocks} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    marginTop: 20,
  },
});
