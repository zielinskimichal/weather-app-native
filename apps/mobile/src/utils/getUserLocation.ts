import * as Location from "expo-location";

export type LocationType = {
  longitude: number;
  latitude: number;
};

export const getUserLocation = async (
  callback: (location: { longitude: number; latitude: number } | null) => void,
) => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      callback(null);
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    callback({ latitude, longitude });
  } catch (error) {
    console.error("Error fetching location:", error);
  }
};
