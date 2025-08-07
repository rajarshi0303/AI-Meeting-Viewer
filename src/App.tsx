import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Meetings from "./pages/Meetings";
import NotFound from "./pages/NoteFound";
import MeetingDetails from "./pages/MeetingDetails";
import { ThemeProvider } from "./theme/ThemeProvider";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Navbar />
        <ScrollToTop />
        <main className="mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="/meeting/:id" element={<MeetingDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
