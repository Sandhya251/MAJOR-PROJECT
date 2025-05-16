# 🏡 Wanderlust - A Mini Airbnb Clone
Wanderlust is a simplified, full-stack web application inspired by Airbnb, designed for users to explore, create, and manage property rental listings. It demonstrates core functionalities such as CRUD functionality, listing properties, cloud-based image uploads,user authentication, and basic booking features. Built as a major project to showcase web development skills, Wanderlust offers a clean and responsive interface for users to explore and post rental properties.

> 🚧 **Project Status:** Currently under development. More features are being added iteratively.

## 📸 Demo

> Live demo link coming soon after deployment via [Render](https://render.com).

---

## ✨ Features

- ✅ Browse all listings
- ✅ Add a new property listing
- ✅ Edit and delete own listings
- ✅ View individual listing details
- ✅ Upload images (Cloudinary)
- ✅ Responsive design (Bootstrap 5)
- ✅ User authentication (register/login/logout)
- ⏳ Authorization for listing actions *(in progress)*
- ⏳ Review system *(planned)*
- ⏳ Map integration *(planned)*

--------------------------------

## 🛠️ Tech Stack

| Layer         | Technologies Used                              |
|---------------|-------------------------------------------------|
| Frontend      | EJS, HTML5, Bootstrap 5                         |
| Backend       | Node.js, Express.js                            |
| Database      | MongoDB, Mongoose                              |
| Authentication| Passport.js, express-session                   |
| File Uploads  | Cloudinary, multer-storage-cloudinary          |
| Hosting       | Render                                          |
| Templating    | EJS-Mate                                       |

---------------------------------

## 🗂️ Folder Structure
major-project/
│
├── models/ # MongoDB models
├── routes/ # Express routes
├── views/ # EJS templates
│ ├── listings/
│ └── users/
├── public/ # Static assets
├── middleware/ # Auth middleware
├── utils/ # Utility config (e.g., Cloudinary)
├── app.js # Main application entry point
├── package.json # Dependencies and scripts
└── .env # Environment variables

---------------------------------

🧩 Current Progress
Module	Status	Notes
Listings CRUD	✅ Complete	All operations implemented
Auth	✅ Complete	Register/Login/Logout flows
Image Upload	✅ Complete	Cloudinary + multer integration
Authorization	🟡 Ongoing	Only owners can edit/delete listings
Reviews	⏳ Planned	Rating system to be added
Maps	⏳ Planned	MapTiler integration planned

---------------------------------

📌 To-Do
 Review and rating system

 Authorization for sensitive routes

 Pagination and filters

 Search functionality

 Dashboard for users

 Error handling improvements

---------------------------------

## ⚙️ Getting Started

### ✅ Prerequisites

- Node.js & npm installed
- MongoDB (local or Atlas)
- Cloudinary account

### 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/Sandhya251/MAJOR-PROJECT.git
cd MAJOR-PROJECT

npm install
npm start
Create a .env file in the root.




