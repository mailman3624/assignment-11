# Assignment 11 — Fullstack Menu Management (Frontend React + Backend Express/Prisma)

โปรเจกต์ปรับแก้งาน Our Menu ให้เชื่อมต่อฐานข้อมูลผ่าน Backend (`http://localhost:5000/api/menu` และ `http://localhost:5000/api/type`) เพื่อ **แสดงผล เพิ่ม ลบ และแก้ไข** เมนูต่างๆ

---

## โครงสร้างโปรเจกต์

```text
Assignment 11/
├── backend/                     # Backend API (คัดลอกจาก Assignment 10)
│   ├── prisma/
│   │   └── schema.prisma        # Prisma Schema (menu & type)
│   ├── sql/
│   │   └── myshop.sql           # SQL script สร้างฐานข้อมูล myshop
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── menuController.js
│   │   │   └── typeController.js
│   │   ├── db/
│   │   │   ├── pool.js
│   │   │   └── prisma.js
│   │   ├── routes/
│   │   │   ├── menuRoutes.js
│   │   │   └── typeRoutes.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   └── package.json
├── public/
│   └── bestseller.svg
├── src/                         # Frontend (React + React Router DOM + Axios)
│   ├── assets/
│   │   └── bestseller.svg
│   ├── layouts/
│   │   └── MainLayout.jsx       # Sidebar Menu (Home, Menu) + <Outlet />
│   ├── pages/
│   │   ├── menus/
│   │   │   ├── Menu.jsx         # Container จัดการ state menuList, typeList, add/update/delete
│   │   │   ├── MenuForm.jsx     # ฟอร์มเพิ่มและแก้ไขเมนู (name, price, isBestSeller, typeId)
│   │   │   └── MenuList.jsx     # แสดงรายการเมนู พร้อมปุ่ม Edit และ Del
│   │   └── HomePage.jsx         # หน้าหลัก (Welcome Home)
│   ├── routes/
│   │   └── AppRoutes.jsx        # กำหนด Routes (/, /menu, และ * สำหรับ 404)
│   ├── services/
│   │   ├── menuApi.js           # Axios service สำหรับ /api/menu
│   │   └── typeApi.js           # Axios service สำหรับ /api/type
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## วิธีรันโปรเจกต์ใน `Assignment 11`

1. **รัน Backend (พอร์ต `5000`):**
   ```bash
   npm run backend
   ```
   *(หรือ `cd backend` แล้วรัน `npm run dev`)*

2. **รัน Frontend (Vite Dev Server):**
   ```bash
   npm run dev
   ```
