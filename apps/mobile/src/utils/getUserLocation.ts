import * as Location from "expo-location";

export const getUserLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return null;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    return { latitude, longitude };
  } catch (error) {
    console.error("Error fetching location:", error);
  }
};
