import { Routes, Route, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import Menu from "../pages/menus/Menu";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menus" element={<Menu />} />
      </Route>
      <Route
        path="*"
        element={
          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <h1>404</h1>
            <p>ไม่พบหน้าที่คุณต้องการ</p>
            <Link to="/">กลับสู่หน้าหลัก</Link>
          </div>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
