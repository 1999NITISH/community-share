# 🏘️ Neighborhood Resource Sharing App

A React.js-based web application that enables residents of a neighborhood to **lend and borrow household items** like tools, books, appliances, and more—promoting sustainability and community collaboration.

> ✅ **All logic is handled in the frontend using React state, context, and `localStorage`. No backend or API calls involved.**

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite or CRA), React Router DOM, Context API
- **State Management:** React `useState`, `useContext`, `useEffect`
- **Styling:** Tailwind CSS / CSS Modules (your choice)
- **Icons & UI:** React Icons, custom components
- **Persistence:** `localStorage` for mock DB and request state
- **Deployment:** Vercel / Netlify

---

## 📦 Features Overview

| Page                     | Route          | Features                                                                 |
|--------------------------|----------------|--------------------------------------------------------------------------|
| Home / Catalog           | `/`            | Search, filter, sort items, item cards, mark as sold ✅                  |
| Item Details             | `/items/:id`   | Full item info, mock "Request to Borrow" button ✅                       |
| Add New Item             | `/add-item`    | Validated form to add new items with mock success/fail feedback ✅      |
| My Requests              | `/my-requests` | List of borrow requests with mock status and notifications ✅ *(Bonus)* |
| Map View                 | `/map`         | Items shown on a mock map with filters and pin details ✅ *(Bonus)*     |
| User Profile             | `/profile`     | Trust score, lending/borrowing stats, mock edit form ✅ *(Bonus)*       |
| 404 Not Found            | `*`            | Friendly error message + back-to-home link ✅                            |

---

