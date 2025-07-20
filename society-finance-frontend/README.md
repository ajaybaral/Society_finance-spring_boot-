# Society Finance Management System – Frontend

A modern, role-based React frontend for managing society finances, integrated with a secure Spring Boot backend.

## 🚀 Overview
This application provides a beautiful, responsive interface for society admins and residents to manage flats, maintenance, funds, vouchers, and contact messages. It features role-based access, JWT authentication, and a seamless user experience.

## ✨ Features
- **Role-based UI:** Admins can add/delete, users can view/pay
- **Modern Dashboard:** Stats, quick links, and analytics-ready
- **CRUD for all entities:** Flats, Maintenance, Funds, Vouchers, Contact
- **JWT Authentication:** Secure login/logout, token storage
- **Sticky Top Bar:** Logout always accessible
- **Consistent Design:** Tailwind CSS, react-icons, responsive cards & tables
- **API Integration:** Connects to Spring Boot backend (port 8080)

## 🛠️ Tech Stack
- **React 18+** (Vite)
- **Tailwind CSS**
- **React Router**
- **react-icons**
- **react-toastify**
- **Spring Boot (backend)**

## ⚡ Getting Started

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd society-finance-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the frontend
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173)

### 4. Backend
- Make sure the Spring Boot backend is running on [http://localhost:8080](http://localhost:8080)
- Configure CORS and JWT as per backend docs

## 🔑 Usage
- **Login/Register** as admin or user
- **Admins:** Full CRUD on all entities
- **Users:** View, pay maintenance, contact admin
- **Logout** from any page using the top bar

## 🤝 Contributing
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📦 Project Structure
```
src/
  pages/        # Main app pages (Flats, Maintenance, Funds, etc)
  components/   # Shared UI components
  api/          # Axios config
  context/      # Auth context
```

## 📝 License
MIT

---

**Built with ❤️ for modern society management.**
