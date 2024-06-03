import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import ProductPage from "./components/ProductPage";
import RegisterPage from "./components/RegisterPage";
import PurchasePage from "./components/PurchasePage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/purchase" element={<PurchasePage />} />
      </Routes>
    </Router>
  );
}

export default App;
