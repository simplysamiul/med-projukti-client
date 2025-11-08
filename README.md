# 💊 Med-Projukti Client 

**Med-Projukti** is a modern and secure **Hospital Management Frontend** built using **React.js** and **Tailwind CSS**.  
This client-side application connects with the backend API ([Med-Projukti Server](https://github.com/simplysamiul/med-projukti-server)) to manage hospital departments — including authentication, dashboard management, and CRUD operations.

---

## 🚀 Features

- 🔐 **User Authentication** – Login required before accessing the dashboard  
- 🧭 **Protected Routes** – Only logged-in users can view the dashboard  
- 🏥 **Department Management** – Add, view, edit, and delete departments  
- 💬 **SweetAlert Notifications** – Clean success/error alerts  
- 🎨 **Responsive UI** – Fully responsive layout using Tailwind CSS  
- ⚡ **React Icons** – Modern and minimal icon set  
- 🔄 **Real-time Data Update** – Instantly refreshes list after operations  

---

## 🧩 Tech Stack

- **React.js (Vite)** – Frontend Framework  
- **Tailwind CSS** – Styling  
- **SweetAlert2** – Pop-up alerts and confirmations  
- **React Icons** – For visual icons  
- **Fetch / Axios** – For REST API communication  

---


## ⚙️ Environment Variables

Create a `.env` file in the root directory and add your backend API URL:

```env
VITE_API_URL=http://localhost:5000

git clone https://github.com/simplysamiul/med-projukti-client.git
cd med-projukti-client
npm run dev



