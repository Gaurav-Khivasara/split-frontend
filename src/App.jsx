import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TestPage from "./pages/TestPage";
import PageNotFound from "./pages/PageNotFound";
import LoginFailure from "./pages/LoginFailure";

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{ top: "50px" }}
      />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/auth/callback" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/failure" element={<LoginFailure />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}