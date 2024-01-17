import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
export const AppHeader = () => {
  return (
    <Text variant="displayMedium" style={styles.heading}>
      Weather App!
    </Text>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: "#2F4F4F",
  },
});
