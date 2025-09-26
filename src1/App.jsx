import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import LeftSidebar from "./components/LeftSidebar";
import Dashboard from "./components/Dashboard";
import Login from "./pages/Login";
import LoginFailure from "./pages/LoginFailure";
import Profile from "./pages/Profile";
// import TestPage from "./pages/TestPage";
import PageNotFound from "./pages/PageNotFound";
import GroupDetails from "./components/GroupDetails";
import SectionWrapper from "./utils/SectionWrapper";

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{ top: "50px" }}
      />
      <BrowserRouter>
        <Navbar />
        <br />
        <div style={{ display: "flex", gap: "16px" }} >
          <LeftSidebar />
          <Routes>
            <Route path="/login" element={<SectionWrapper element={<Login />} />} />
            <Route path="" element={<SectionWrapper element={<Login />} />} />
            <Route path="/auth/callback" element={<SectionWrapper element={<Dashboard />} />} />
            <Route path="/login/failure" element={<LoginFailure />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/groups/:id" element={<GroupDetails />} />
            {/* <Route path="/test" element={<TestPage />} /> */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}