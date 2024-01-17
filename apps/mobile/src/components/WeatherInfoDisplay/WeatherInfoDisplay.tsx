import { Image, StyleSheet, View } from "react-native";
import { Card, Text, ActivityIndicator, MD2Colors } from "react-native-paper";

import { WeatherInfoDisplayProps } from "./WeatherInfoDisplay.types";
export const WeatherInfoDisplay = ({
  data,
  loading,
  error,
}: WeatherInfoDisplayProps) => {
  if (error || (!data && !loading)) {
    return (
      <Card style={styles.card}>
        <Text style={styles.error} variant="titleLarge">
          {error
            ? error
            : "Please allow the app to use your location or search for a city!"}
        </Text>
      </Card>
    );
  }

  if (loading) {
    return <ActivityIndicator animating style={styles.loader} size={50} />;
  }

  return (
    <Card style={styles.card}>
      <Text style={styles.city} variant="titleLarge">
        {data?.city}
      </Text>
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: data?.iconUrl,
          }}
          style={styles.image}
        />
        <View style={styles.conditionsWrapper}>
          <Text variant="bodyLarge" style={styles.bold}>
            {data?.temperature}&#8451;&nbsp;
          </Text>
          <Text variant="bodyLarge">{data?.conditions}</Text>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <View style={styles.humidityAndWindWrapper}>
          <Text>Humidity: {data?.humidity}%</Text>
          <Text>Wind Speed: {data?.windSpeed} km/h</Text>
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
  error: {
    textAlign: "center",
  },
  loader: {
    marginTop: 40,
  },
});
