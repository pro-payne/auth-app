# Project Name

Brief project description here.

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
- [Installing and running the Backend](#installing-and-running-the-backend)
- [Installing and running the Frontend](#installing-and-running-the-frontend)

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

### Starting apps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
    ```
2. Navigate to the project directory:
    ```bash
    cd your-repo
    ```
3. Installing and running the Backend:
    - Navigate to the backend directory:
        ```bash
        cd backend
        ```
    - Installing
        ```bash
        yarn install
        ```
    - Start the Express server:
        ```bash
        yarn start
        ```
        The backend server will be running on http://localhost:8081.

      Note that I have also added an exported copy of my DB. named as `authapp.sql`

4. Installing and running the Frontend:
    - Navigate to the frontend directory:
        ```bash
        cd frontend
        ```
    - Installing
        ```bash
        yarn install
        ```
    - Start :
        ```bash
        yarn run dev
        ```

