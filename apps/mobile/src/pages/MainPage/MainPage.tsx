import { useEffect, useState } from "react";
import { Text } from "react-native-paper";

import { getUserLocation } from "../../utils";

export const MainPage = () => {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    async function getLocation() {
      const userLocation = await getUserLocation();
      setLocation(userLocation);
    }
    getLocation();
  }, []);

  return <Text>{JSON.stringify(location)}</Text>;
};
