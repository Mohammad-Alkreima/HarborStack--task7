# ⚓ HarborStack Marine Ops API

A lightweight RESTful API built with **Express.js** to manage port crews and dock shifts. This project was developed as a backend prototype for HarborStack Marine Ops to demonstrate CRUD operations, middleware implementation, and environment configuration.

## 🚀 Features
- **Full CRUD for Crews**: Manage dock supervisors, operators, and safety officers.
- **Full CRUD for Shifts**: Coordinate berth assignments and timing.
- **Custom Logger Middleware**: Tracks every request (Timestamp, Method, URL, IP) in the console.
- **Environment Driven**: Uses `.env` for flexible port configuration.
- **In-Memory Data**: High-speed prototyping using a centralized `data.js` store.

---

## 🛠️ Tech Stack
- **Node.js** & **Express.js**
- **Dotenv** (Environment variables)
- **Nodemon** (Development workflow)

---

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd harborstack-api
   ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure Environment Variables:
    - Copy the example environment file:
        ```bash
        cp .env.example .env
        ```

    - Open .env and set your desired PORT (default is 3000)

4. Run the application:
    - For Development (with auto-reload):
        ```bash
        npm run dev
        ```

    - For Production:
        ``` bash
        npm start
        ```

## 🛣️ API Endpoints

👥 Crews Resource (/api/v1/crews)
| Method    |    Endpoint   | Description                       |
| :-------- |    :-------   | :-------------------------------- |
| GET      |    `/api/v1/crews`   | Get all crew members |
| GET      |    `/api/v1/crews/:id`   | Get a specific member by ID |
| POST      |    `/api/v1/crews`   | Add a new crew member |
| PUT      |    `/api/v1/crews/:id`   | Update existing member details |
| DELETE      |    `/api/v1/crews/:id`   | Remove a member from the system |

## 🕒 Shifts Resource (/api/v1/shifts)
| Method    |    Endpoint   | Description                       |
| :-------- |    :-------   | :-------------------------------- |
| GET      |    `/api/v1/shifts`   | Get all scheduled shifts |
| GET      |    `/api/v1/shifts/:id`   | Get shift details by ID |
| POST      |    `/api/v1/shifts`   | Create a new shift (Validates crewId) |
| PUT      |    `/api/v1/shifts/:id`   | Update shift timing or berth |
| DELETE      |    `/api/v1/shifts/:id`   | Cancel/Delete a shift |

## 📝 ID Generation Logic

This API uses Timestamp-based IDs (`new Date().getTime()`) for creating new resources. This ensures unique identifiers for every new entry during the prototyping phase without needing a database.

## 📂 Project Structure
```bash
Plaintext

harborstack-api/

  ├── app.js          # Main entry point & routes  
  ├── data.js         # In-memory data storage
  ├── .env            # Environment secrets (ignored by Git)
  ├── .env.example    # Template for environment variables 
  ├── .gitignore      # Git ignore rules
  └── package.json    # Project dependencies and scripts  
  ```