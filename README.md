# 🏘️ Neighborhood Resource Sharing App

A **React.js-based web application** that enables residents of a neighborhood to **lend and borrow household items** like tools, books, appliances, and more — promoting sustainability and community collaboration.

> ✅ **All data and logic are handled entirely on the frontend using React state, Context API, and `localStorage`. No backend or API involved.**

---

## 🛠️ Tech Stack

- **Frontend Framework:** React.js (with Vite)
- **Routing:** React Router DOM
- **State Management:** React `useState`, `useContext`, `useEffect`
- **Styling:** Tailwind CSS / CSS Modules
- **Icons & UI:** React Icons, reusable custom components
- **Persistence:** `localStorage` for storing items, requests, and statuses
- **Deployment:** Netlify 

---

## 📦 Features Overview

| Page             | Route           | Description                                                                 |
|------------------|------------------|-----------------------------------------------------------------------------|
| **Home**         | `/`              | Item catalog with search, filter, sort, item cards, mark as sold ✅         |
| **Item Details** | `/items/:id`     | Full item info with mock "Request to Borrow" button ✅                      |
| **Add Item**     | `/add-item`      | Form to add item with validation & mock success/failure feedback ✅        |
| **My Requests**  | `/my-requests`   | List of requested items with mock status updates ✅ *(Bonus)*              |
| **Map View**     | `/map`           | Mocked map with items' location pins and filter by category ✅ *(Bonus)*   |
| **User Profile** | `/profile`       | Mock profile with trust score & lending/borrowing stats ✅ *(Bonus)*       |
| **404 Page**     | `*`              | Friendly error page with navigation link ✅                                 |

---

## 🧑‍💻 Vite Project Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/1999NITISH/community-share.git
cd community-share

npm install

npm run dev ```

- Navigate to [localhost:8080](localhost:8080)

## 🌐 Deploy and Repo

- 🔗 **Deployed:** [Neighbor share live](https://animated-hotteok-b1e9ff.netlify.app/)
- 📁 **Repo:** [Neighbor share repo](https://https://github.com/1999NITISH/community-share)

