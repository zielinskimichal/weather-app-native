import { StyleSheet, View } from "react-native";

import { MainLayoutProps } from "./MainLayout.types";
import { AppHeader } from "../../components/AppHeader";

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <View style={styles.mainContainer}>
      <AppHeader />
      <View>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#87CEEB",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});
