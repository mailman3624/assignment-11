# Assignment 10 — API สำหรับ Menu และชนิด (`/api/menu` & `/api/type`)

โปรเจกต์ Backend API ด้วย **Node.js + Express + MySQL2 + Prisma ORM** ตามโครงสร้างในสไลด์ สำหรับจัดการข้อมูลเมนู (`menu`) และชนิดของเมนู (`type`)

---

## โครงสร้างโปรเจกต์

```text
Assignment 10/
├── prisma/
│   └── schema.prisma            # Prisma Schema (model menu & model type พร้อม relation)
├── sql/
│   └── myshop.sql               # SQL script สร้างฐานข้อมูล myshop และตาราง type, menu
├── src/
│   ├── controllers/
│   │   ├── menuController.js    # CRUD + Search + include relation (type)
│   │   └── typeController.js    # CRUD + Search + include relation (menu)
│   ├── db/
│   │   ├── pool.js              # mysql2/promise connection pool
│   │   └── prisma.js            # PrismaClient + PrismaMariaDb adapter
│   ├── routes/
│   │   ├── menuRoutes.js        # /api/menu routes
│   │   └── typeRoutes.js        # /api/type routes
│   ├── app.js                   # Express app, CORS, JSON/urlencoded middleware
│   └── server.js                # Server entry point (PORT 5000)
├── .env                         # DB & PORT configuration
├── prisma7.config.ts            # Prisma configuration
└── package.json
```

---

## โครงสร้างตาราง (Database Schema)

- **`type`**
  - `typeId` (INT, Primary Key, Auto Increment)
  - `name` (VARCHAR)
- **`menu`**
  - `menuId` (INT, Primary Key, Auto Increment)
  - `name` (VARCHAR)
  - `price` (INT)
  - `isBestSeller` (BOOLEAN)
  - `typeId` (INT, Foreign Key อ้างอิง `type.typeId`)

---

## วิธีรันเซิร์ฟเวอร์

```bash
npm run dev
```
เซิร์ฟเวอร์จะทำงานที่ `http://localhost:5000`
- **Menu API:** `http://localhost:5000/api/menu`
- **Type API:** `http://localhost:5000/api/type`

---

## ทดสอบ API ด้วย `curl` หรือ Postman

### 1. `/api/type`
- **GET All Types:**
  ```bash
  curl http://localhost:5000/api/type
  ```
- **GET Type by ID:**
  ```bash
  curl http://localhost:5000/api/type/1
  ```
- **Search Type (`?keyword=`):**
  ```bash
  curl "http://localhost:5000/api/type?keyword=Bakery"
  ```
- **POST Create Type:**
  ```bash
  curl -X POST http://localhost:5000/api/type -H "Content-Type: application/json" -d "{\"name\":\"Snack\"}"
  ```
- **PUT Update Type:**
  ```bash
  curl -X PUT http://localhost:5000/api/type/1 -H "Content-Type: application/json" -d "{\"name\":\"Bakery Updated\"}"
  ```
- **DELETE Type:**
  ```bash
  curl -X DELETE http://localhost:5000/api/type/5
  ```

### 2. `/api/menu`
- **GET All Menus (พร้อมข้อมูล `type` relation):**
  ```bash
  curl http://localhost:5000/api/menu
  ```
- **GET Menu by ID:**
  ```bash
  curl http://localhost:5000/api/menu/1
  ```
- **Search Menu (`?keyword=`):**
  ```bash
  curl "http://localhost:5000/api/menu?keyword=Cake"
  ```
- **POST Create Menu:**
  ```bash
  curl -X POST http://localhost:5000/api/menu -H "Content-Type: application/json" -d "{\"name\":\"Croissant\",\"price\":50,\"isBestSeller\":true,\"typeId\":1}"
  ```
- **PUT Update Menu:**
  ```bash
  curl -X PUT http://localhost:5000/api/menu/1 -H "Content-Type: application/json" -d "{\"name\":\"Chocolate Cake\",\"price\":45,\"isBestSeller\":true,\"typeId\":1}"
  ```
- **DELETE Menu:**
  ```bash
  curl -X DELETE http://localhost:5000/api/menu/1
  ```
