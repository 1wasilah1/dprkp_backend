# 📘 Menu & User Management API

Sistem API ini menyediakan manajemen **Menu** dan **User** (dengan role dan otorisasi menu) menggunakan teknologi Node.js, Express, dan MongoDB. Ideal digunakan sebagai modul backend untuk aplikasi berbasis role dan menu dinamis.

---

## 🚀 Fitur Utama

- Manajemen Menu (CRUD)
- Manajemen User (CRUD + Autentikasi JWT-ready)
- Relasi User ke Menu via `authmenu`
- Format tree untuk struktur menu berdasarkan parent-child
- Validasi input & pesan error yang jelas
- UAT (User Acceptance Test) terstruktur

---

## 📂 Endpoint API

### 📋 MENU MODULE

#### ➕ Create Menu
- **URL:** `POST /api/menu`
- **Request Body:**
```json
{
  "name": "Dashboard",
  "path": "/dashboard",
  "icon": "DashboardIcon",
  "parentId": null
}
```
- **Response:** `201 Created`

#### 📥 Get All Menu
- **URL:** `GET /api/menu`
- **Deskripsi:** Menampilkan semua data menu
- **Response:** `200 OK`

#### 📥 Get Menu by ID
- **URL:** `GET /api/menu/:id`
- **Deskripsi:** Mendapatkan menu berdasarkan ID
- **Response:** `200 OK`

#### 🔄 Update Menu
- **URL:** `PUT /api/menu/:id`
- **Deskripsi:** Memperbarui menu
- **Response:** `200 OK`

#### ❌ Delete Menu
- **URL:** `DELETE /api/menu/:id`
- **Deskripsi:** Menghapus menu berdasarkan ID
- **Response:** `200 OK`

---

### 👤 USER MODULE

> ⚠️ **Catatan:** Endpoint diasumsikan akan digunakan dengan sistem autentikasi JWT.

#### ➕ Create User
- **URL:** `POST /api/users`
- **Request Body:**
```json
{
  "username": "johndoe",
  "password": "secret123",
  "role": "admin",
  "authmenu": ["<menu_id_1>", "<menu_id_2>"]
}
```
- **Response:** `201 Created`

#### 📥 Get All Users
- **URL:** `GET /api/users`
- **Deskripsi:** Mendapatkan semua data user + menu
- **Response:** `200 OK`

#### 📥 Get User by ID + Tree Menu
- **URL:** `GET /api/users/:id`
- **Deskripsi:** Mendapatkan data user dan struktur menu (parent-child)
- **Response:** `200 OK`  
- **Error:** `404 Not Found` jika user tidak ditemukan

#### 🔄 Update User
- **URL:** `PUT /api/users/:id`
- **Request Body:**
```json
{
  "username": "newuser",
  "role": "user",
  "authmenu": ["menu_id_1", "menu_id_2"]
}
```
- **Response:** `200 OK`

#### ❌ Delete User
- **URL:** `DELETE /api/users/:id`
- **Response:**
```json
{ "message": "User deleted" }
```

---

## ✅ User Acceptance Test (UAT)

### 📋 MENU MODULE
| No | Langkah Uji | Input | Expected Output | Status |
|----|-------------|-------|------------------|--------|
| 1 | Tambah menu utama | name, path, icon | 201 Created | ✅ |
| 2 | Tambah submenu | name, path, icon, parentId | 201 Created | ✅ |
| 3 | Tambah tanpa `name` | path, icon | 500 Validation Error | ✅ |

### 👤 USER MODULE
| No | Langkah Uji | Input | Expected Output | Status |
|----|-------------|-------|------------------|--------|
| 1 | Create user baru | username unik | 201 Created | ✅ |
| 2 | Duplicate username | username sama | 400 "Username already exists" | ✅ |

---

## 🛠 Teknologi

- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- (Optional) JWT Authentication

---

## 📦 Instalasi

```bash
git clone https://github.com/1wasilah1/dprkp_web.git
cd dprkp_web
npm install
npm start
```

> Pastikan MongoDB sudah berjalan di lokal atau server Anda.

---

## 📮 Catatan Tambahan

- Endpoint belum menyertakan autentikasi JWT secara default, tetapi dapat diintegrasikan dengan mudah.
- Struktur `authmenu` mendukung menu bertingkat (tree structure).
- Cocok untuk digunakan di dashboard admin dengan dynamic menu berdasarkan role.

---

## 📧 Kontak

Untuk pertanyaan, silakan hubungi: **m.wasilahhadi@gmail.com**