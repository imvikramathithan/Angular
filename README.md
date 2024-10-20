# **Authentication System (Express.js + Angular)**  

This project demonstrates a simple authentication system using **Express.js** as the backend and **Angular** as the frontend. It allows users to register and log in, with MongoDB as the database.

---

## **Table of Contents**
- [Features](#features)  
- [Prerequisites](#prerequisites)  
- [Installation](#installation)  
- [Backend Setup](#backend-setup)  
- [Frontend Setup](#frontend-setup)  
- [Running the Project](#running-the-project)  
- [Project Structure](#project-structure)  
- [Usage](#usage)  
- [Technologies Used](#technologies-used)  
- [License](#license)  

---

## **Features**
- User Registration with MongoDB.  
- User Login with session handling via **PrimeNG** Toasts.  
- Basic Routing with Angular.  
- Form Validation using **Reactive Forms**.  

---

## **Prerequisites**  
1. **Node.js** (`v16+`) - [Install here](https://nodejs.org/).  
2. **Angular CLI** (`npm install -g @angular/cli`)  
3. **MongoDB Database** (local or cloud MongoDB Atlas)  
4. **Code Editor** - Recommended: [VS Code](https://code.visualstudio.com/).  

---

## **Installation**

### **1. Clone the Repository**
```bash
git clone https://github.com/imvikramathithan/Angular.git
cd Angular
```

---

## **Backend Setup**



1. **Install Dependencies**  
   ```bash
   npm install express body-parser cors mongoose
   ```

2. **Create `server.js`** and add the backend code:
   ```javascript
   const express = require('express');
   const mongoose = require('mongoose');
   const bodyParser = require('body-parser');
   const cors = require('cors');

   const app = express();
   const PORT = process.env.PORT || 3000;

   app.use(cors());
   app.use(bodyParser.json());

   mongoose.connect('your-mongo-url', {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   }).then(() => console.log('Connected to MongoDB'))
     .catch(err => console.log('MongoDB connection error:', err));

   const UserSchema = new mongoose.Schema({
     username: String,
     email: String,
     password: String,
   });

   const User = mongoose.model('User', UserSchema);

   app.post('/api/users/register', async (req, res) => {
     try {
       const user = new User(req.body);
       await user.save();
       res.status(201).json({ message: 'User registered successfully' });
     } catch (error) {
       res.status(400).json({ message: 'Error registering user', error });
     }
   });

   app.post('/api/users/login', async (req, res) => {
     const user = await User.findOne(req.body);
     user ? res.json({ message: 'Login successful', user }) :
            res.status(404).json({ message: 'User not found' });
   });

   app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
   ```

3. **Start the Backend Server**  
   ```bash
   node server.js
   ```

---

## **Frontend Setup**

1. **Navigate to Frontend Folder**  
   ```bash
   cd frontend
   ```

2. **Install Dependencies**  
   ```bash
   npm install primeng primeicons primeflex @angular/http --force
   ```

3. **Generate Components and Services**  
   ```bash
   ng generate component components/login
   ng generate component components/register
   ng generate component components/home
   ng generate interface interfaces/auth
   ng generate service services/auth
   ```

4. **Configure Routing**  
   Update `app.routes.ts`:  
   ```typescript
   import { Routes } from '@angular/router';
   import { LoginComponent } from './components/login/login.component';
   import { RegisterComponent } from './components/register/register.component';
   import { HomeComponent } from './components/home/home.component';

   export const routes: Routes = [
     { path: 'login', component: LoginComponent },
     { path: 'register', component: RegisterComponent },
     { path: 'home', component: HomeComponent },
     { path: '', redirectTo: 'login', pathMatch: 'full' },
   ];
   ```

5. **Update `app.component.html`**  
   ```html
   <router-outlet></router-outlet>
   <p-toast></p-toast>
   ```

6. **Start the Frontend Server**  
   ```bash
   ng serve
   ```

---

## **Running the Project**  
1. **Backend:** Runs on `http://localhost:3000`  
2. **Frontend:** Runs on `http://localhost:4200`  

Open the browser and navigate to `http://localhost:4200`. You can register a user and then log in.

---

## **Project Structure**
```
authentication-system/
│
├── backend/
│   ├── node_modules/
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   ├── interfaces/
    │   │   ├── services/
    │   │   ├── app.routes.ts
    │   │   └── app.component.html
    ├── node_modules/
    └── package.json
```

---

## **Usage**
1. **Register a New User:**  
   - Navigate to `/register` and fill in the registration form.

2. **Login a User:**  
   - Navigate to `/login` and provide the registered email and password.

3. **Home Page:**  
   - After a successful login, the user is redirected to the home page.

---

## **Technologies Used**
- **Backend:** Node.js, Express.js, MongoDB  
- **Frontend:** Angular, PrimeNG, PrimeIcons, PrimeFlex  
- **Styling:** CSS  

---

## **License**
This project is licensed under the MIT License.

---

## **Contributing**
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

This README provides all the information needed to understand, set up, and run the authentication system project.
