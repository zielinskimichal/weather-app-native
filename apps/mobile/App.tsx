import { PaperProvider } from "react-native-paper";

import { MainLayout } from "./src/layouts/MainLayout";
import { MainPage } from "./src/pages/MainPage";

export default function App() {
  return (
    <PaperProvider>
      <MainLayout>
        <MainPage />
      </MainLayout>
    </PaperProvider>
  );
}
