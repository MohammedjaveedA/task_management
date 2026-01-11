# Task Management API Documentation

**Base URL:** `http://localhost:5000/api`

---

## 🔐 1. Authentication Endpoints

### Register New User

* **Method:** POST
* **URL:** `/auth/register`
* **Headers:**

  * `Content-Type: application/json`
* **Body (JSON):**

```json
{
  "email": "test@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

* **Note:** Save the token from the response for authenticated requests.

---

### Login User

* **Method:** POST
* **URL:** `/auth/login`
* **Headers:**

  * `Content-Type: application/json`
* **Body (JSON):**

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

---

### Get Current User

* **Method:** GET
* **URL:** `/auth/me`
* **Headers:**

  * `Authorization: Bearer YOUR_TOKEN_HERE`
  * `Content-Type: application/json`

---

### Logout User

* **Method:** POST
* **URL:** `/auth/logout`
* **Headers:**

  * `Authorization: Bearer YOUR_TOKEN_HERE`

---

## 👤 2. Profile Endpoints

### Get User Profile

* **Method:** GET
* **URL:** `/profile`
* **Headers:**

  * `Authorization: Bearer YOUR_TOKEN_HERE`

---

### Update User Profile

* **Method:** PUT
* **URL:** `/profile`
* **Headers:**

  * `Authorization: Bearer YOUR_TOKEN_HERE`
  * `Content-Type: application/json`
* **Body (JSON):**

```json
{
  "firstName": "Jane",
  "lastName": "Smith"
}
```

---

## 📝 3. Task Endpoints

### Get All Tasks

* **Method:** GET
* **URL:** `/tasks`
* **Headers:**

  * `Authorization: Bearer YOUR_TOKEN_HERE`

---

### Get Tasks with Filters

* **Method:** GET
* **URL:** `/tasks?status=pending&priority=high&sortBy=-createdAt`
* **Headers:**

  * `Authorization: Bearer YOUR_TOKEN_HERE`

---

### Get Single Task

* **Method:** GET
* **URL:** `/tasks/{task_id}`
* **Headers:**

  * `Authorization: Bearer YOUR_TOKEN_HERE`

---

### Create New Task

* **Method:** POST
* **URL:** `/tasks`
* **Headers:**

  * `Authorization: Bearer YOUR_TOKEN_HERE`
  * `Content-Type: application/json`
* **Body (JSON):**

```json
{
  "title": "Complete project",
  "description": "Finish all tasks",
  "priority": "high",
  "status": "pending",
  "dueDate": "2024-12-31",
  "tags": ["work", "urgent"]
}
```

---

### Update Task

* **Method:** PUT
* **URL:** `/tasks/{task_id}`
* **Headers:**

  * `Authorization: Bearer YOUR_TOKEN_HERE`
  * `Content-Type: application/json`
* **Body (JSON):**

```json
{
  "status": "completed"
}
```

---

### Delete Task

* **Method:** DELETE
* **URL:** `/tasks/{task_id}`
* **Headers:**

  * `Authorization: Bearer YOUR_TOKEN_HERE`

---

### Search Tasks

* **Method:** GET
* **URL:** `/tasks/search?q=project`
* **Headers:**

  * `Authorization: Bearer YOUR_TOKEN_HERE`

---

### Get Task Statistics

* **Method:** GET
* **URL:** `/tasks/stats`
* **Headers:**

  * `Authorization: Bearer YOUR_TOKEN_HERE`

---

📌 **Note:** All protected routes require a valid JWT token in the `Authorization` header.
