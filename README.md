# shopopedia

🛒 Vue 3 E-Commerce Web Application

A modern and fully responsive eCommerce web application built with Vue 3.
The project focuses on clean architecture, fast performance, and a smooth shopping experience while integrating powerful tools like Pinia, Axios, Firebase, and Cloudinary.

🚀 Features

🧩 Core Functionality

   Full eCommerce workflow: product listing, product details, cart, checkout.

   User authentication (login / register) via Firebase.

   Secure and scalable backend interactions.

🛠️ Technologies Used

   Vue 3 (Composition API) – Modern, performant UI.

   Pinia – Reactive and lightweight state management.

   Axios – API handling and HTTP requests.

   Firebase – Authentication, real-time database, secure data.

   Cloudinary – Image hosting, optimization, and CDN delivery.

🎨 UI/UX

   Responsive layout for all devices.

   Clean and modern design with smooth navigation.

   Fast image loading through Cloudinary optimization.

📂 Project Structure

```sh
src/
│── assets/
│── components/
│── pages/
│── store/ (Pinia stores)
│── services/ (Axios & Firebase utilities)
│── router/
│── App.vue
│── main.js
```

⚙️ Installation & Setup

1️⃣ Clone the repository

```sh
git clone https://github.com/your-username/your-repo-name.git

```

2️⃣ Install dependencies

```sh
npm install
```

3️⃣ Run the development server

```sh
npm run dev
```

4️⃣ Build for production

```sh
npm run build
```


🔧 Environment Variables
Create a .env file and include:

```sh
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
API_BASE_URL=
```
