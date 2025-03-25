
# 📝 React To-Do Application

A simple and intuitive To-Do application built with React.js, allowing users to manage their tasks efficiently with the help of weather forecast for outdoor tasks and motivational quotes for indoor tasks.

## 🚀 Features

- **Add Tasks**: Easily add new tasks to your to-do list.
- **Delete Tasks**: Remove tasks that are no longer needed.
- **Task Priority**: Assign priority levels (High, Medium, Low) to tasks.
- **Task Completion**: Mark tasks as completed or pending.
- **Weather Forecast**: Weather details for outdoor activities.
- **Motivational Quotes**: Motivational quotes for indoor activites.

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS

## 🎨 UI Preview
![image](https://github.com/user-attachments/assets/bafc97a4-f498-4ec5-9cd0-d87dc479b287)
![image](https://github.com/user-attachments/assets/09578a42-b15d-4acf-ba8b-fb2f22166055)
![image](https://github.com/user-attachments/assets/06d2c25d-231a-45dc-9832-f41dc6b33b64)
![image](https://github.com/user-attachments/assets/9a100c9b-f605-492e-ac46-a6c1c5e4f6d7)




![To-Do App Screenshot](./screenshot.png)

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/Sunny108700541/REACT-TO-DO.git
cd REACT-TO-DO
```

### 2️⃣ Install Dependencies

```sh
npm run build
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the **backend** directory and add the following:

```env
PORT=4004
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:5173
WEATHER_API_KEY=your_api_key
```

Replace `your-mongodb-connection-string` and `your-secret-key` with your actual MongoDB URI and a secret key for JWT authentication.

### 4️⃣ Start the Application

```sh
npm run start
```
The application will be running at **http://localhost:5173**.

## 🗂️ Folder Structure

```
REACT-TO-DO/
├── backend/             # Backend source code
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routes
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Middleware functions
│   ├── server.js        # Entry point for the backend
│   └── package.json     # Backend dependencies
├── frontend/            # Frontend source code
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── redux/       # Redux slices and store
│   │   ├── App.jsx      # Main App component
│   │   └── index.js     # Entry point for the frontend
│   ├── public/          # Static assets
│   ├── package.json     # Frontend dependencies
│   └── tailwind.config.js # Tailwind CSS configuration
└── README.md            # Project documentation
```

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are warmly welcomed.

## 📜 License

This project is licensed under the MIT License.

---

**Happy Coding!** 🎉
