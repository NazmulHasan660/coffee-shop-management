# Coffee Shop Management System

A full-stack web-based Coffee Shop Management System built to manage daily business operations such as products, inventory, suppliers, purchases, expenses, authentication, and reports.

## Live Links
- Frontend: https://coffee-shop-management-livid.vercel.app
- Backend: https://coffee-shop-backend-k7ou.onrender.com
- API Base URL: https://coffee-shop-backend-k7ou.onrender.com/api/

## Tech Stack
### Frontend
- React
- Axios
- React Router

### Backend
- Django
- Django REST Framework
- JWT Authentication

### Database
- PostgreSQL

### Deployment
- Frontend: Vercel
- Backend: Render

## Features
- JWT-based authentication
- Admin and Staff role system
- Product management
- Category management
- Inventory tracking
- Supplier management
- Purchase management
- Expense management
- Reports and alerts
- Low-stock and out-of-stock monitoring

## User Roles
### Admin
- Full access
- Can create, update, delete all business data

### Staff
- Can log in and view data
- Restricted from protected actions

## Core Modules
- Authentication
- Products
- Inventory
- Suppliers
- Purchases
- Expenses
- Reports

## Business Logic
- Purchases automatically increase product stock
- Dashboard displays total products, available products, low stock, and out-of-stock items
- Reports include expense summary, purchase summary, and inventory alerts

## Project Structure
```text
coffee-shop-management/
│
├── backend/
│   ├── accounts/
│   ├── products/
│   ├── inventory/
│   ├── suppliers/
│   ├── purchases/
│   ├── expenses/
│   ├── reports/
│   └── config/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── styles/
│
├── README.md
└── .gitignore
