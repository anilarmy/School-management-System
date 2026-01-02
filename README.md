# School Management System

This project is a full-stack application with:
- **Backend:** Spring Boot (Java)
- **Frontend:** React (Vite)
- **Database:** MySQL

## Prerequisites

1. **Java JDK 17+**
2. **Node.js & npm**
3. **MySQL Server** running on localhost

## Setup Instructions

### 1. Database Configuration
The backend is configured to connect to MySQL at `localhost:3306`.
Default credentials used:
- **Username:** root
- **Password:** root
- **Database Name:** school_db

If your MySQL credentials differ, please update:
`backend/src/main/resources/application.properties`

### 2. Running the Backend (Spring Boot)
Open a terminal in the `backend` folder and run:
```bash
./mvnw spring-boot:run
```
(If `mvnw` is missing, you can run as a Maven project in your IDE or install Maven manually).

*Note: Since I created the pom.xml manually, the Maven Wrapper (mvnw) might not be present. You can run it from your IDE (IntelliJ/Eclipse) or if you have maven installed: `mvn spring-boot:run`.*

### 3. Running the Frontend (React)
Open a terminal in the `frontend` folder and run:
```bash
npm run dev
```
Access the application at: `http://localhost:5173`

## Features
- Add new students
- List all students
- Data is persisted in MySQL
