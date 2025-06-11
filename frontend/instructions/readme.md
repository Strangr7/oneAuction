# ⚛️ Frontend – Dynamic E-Commerce Web App (Vite + React)

This is the frontend of our MERN stack project, built using **Vite + React**. This `README.md` explains the folder structure and how different parts of the app work, so all team members can contribute efficiently.

---

## 📁 Folder Structure

src/
├── assets/ # Images, logos, and global styles
├── components/ # Reusable UI components (e.g., buttons, inputs, navbars)
├── features/ # Feature-specific modules (auth, cart, products, etc.)
├── hooks/ # Custom React hooks
├── layouts/ # Page layouts with shared UI (nav, footer, etc.)
├── pages/ # Route-based views (Login, Register, Home, etc.)
├── services/ # Axios instance and API service functions
├── App.jsx # Main app component with routing
├── main.jsx # Vite's entry point
└── index.css # Global styling (e.g., Tailwind)


---

## 🧩 Folder Responsibilities

### `components/`
- Small, reusable UI elements.
- Example: `Button.jsx`, `Navbar.jsx`, `InputField.jsx`.

### `features/`
- Domain-specific code for each major part of the app.
- Example: `auth/`, `products/`, `admin/`.

### `hooks/`
- Custom logic using React hooks.
- Example: `useAuth.js` → handles logged-in state from localStorage.

### `layouts/`
- Shared layout structure to wrap pages (e.g., header, footer).
- Example: `MainLayout.jsx`.

### `pages/`
- Components mapped to routes.
- Example: `Login.jsx`, `Register.jsx`, `Home.jsx`.

### `services/`
- Handles HTTP requests to backend.
- `axiosInstance.js`: Sets base URL and headers.
- `authService.js`: Auth-related API calls (`loginUser`, `registerUser`).

---

## 🌐 Environment Variables

Create a `.env` file in the root with:
```env
VITE_API_URL=http://localhost:5000/api
