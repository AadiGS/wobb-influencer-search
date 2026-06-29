import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchPage } from "@/pages/SearchPage";
import { ProfileDetailPage } from "@/pages/ProfileDetailPage";
import ShortlistDrawer from "@/components/ShortlistDrawer";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/profile/:username" element={<ProfileDetailPage />} />
        </Routes>
        <ShortlistDrawer />
      </>
    </BrowserRouter>
  );
}

export default App;
