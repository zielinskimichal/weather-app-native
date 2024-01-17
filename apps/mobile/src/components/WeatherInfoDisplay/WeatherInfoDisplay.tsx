import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

import { WeatherInfoDisplayProps } from "./WeatherInfoDisplay.types";

export const WeatherInfoDisplay = ({ data }: WeatherInfoDisplayProps) => {
  if (!data) {
    return null;
  }
  const { iconUrl, conditions, humidity, windSpeed, temperature, city } = data;
  return (
    <Card style={styles.card}>
      <Text style={styles.city} variant="titleLarge">
        {city}
      </Text>
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: iconUrl,
          }}
          style={styles.image}
        />
        <View style={styles.conditionsWrapper}>
          <Text variant="bodyLarge" style={styles.bold}>
            {temperature}&#8451;&nbsp;
          </Text>
          <Text variant="bodyLarge">{conditions}</Text>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <View style={styles.humidityAndWindWrapper}>
          <Text>Humidity: {humidity}%</Text>
          <Text>Wind Speed: {windSpeed} km/h</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    marginHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#F0F8FF",
    paddingHorizontal: 15,
  },
  imageWrapper: {
    alignItems: "center",
  },
  image: {
    width: 64,
    height: 64,
  },
  conditionsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  humidityAndWindWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    gap: 15,
  },
  city: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
});
