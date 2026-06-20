import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page from "./pages/page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />} />
      </Routes>
    </BrowserRouter>
  );
}
