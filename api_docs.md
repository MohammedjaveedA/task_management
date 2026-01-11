Base URL: http://localhost:5000/api

🔐 1. AUTHENTICATION ENDPOINTS

Register New User
Method: POST
URL: http://localhost:5000/api/auth/register
Headers:
  Content-Type: application/json
Body (JSON):
{
  "email": "test@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
✅ Save Response Token: Copy the token from response to use in other requests.

Login User
Method: POST
URL: http://localhost:5000/api/auth/login
Headers:
  Content-Type: application/json
Body (JSON):
{
  "email": "test@example.com",
  "password": "password123"
}

Get Current User
Method: GET
URL: http://localhost:5000/api/auth/me
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE
  Content-Type: application/json

Logout User
Method: POST
URL: http://localhost:5000/api/auth/logout
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE



  👤 2. PROFILE ENDPOINTS

Get User Profile
Method: GET
URL: http://localhost:5000/api/profile
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE

Update User Profile
Method: PUT
URL: http://localhost:5000/api/profile
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE
  Content-Type: application/json
Body (JSON):
{
  "firstName": "Jane",
  "lastName": "Smith"
}




📝 3. TASK ENDPOINTS

Get All Tasks
Method: GET
URL: http://localhost:5000/api/tasks
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE

Get Tasks with Filters
Method: GET
URL: http://localhost:5000/api/tasks?status=pending&priority=high&sortBy=-createdAt
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE

Get Single Task
Method: GET
URL: http://localhost:5000/api/tasks/{task_id}
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE

Create New Task
Method: POST
URL: http://localhost:5000/api/tasks
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE
  Content-Type: application/json
Body (JSON):
{
  "title": "Complete project",
  "description": "Finish all tasks",
  "priority": "high",
  "status": "pending",
  "dueDate": "2024-12-31",
  "tags": ["work", "urgent"]
}

Update Task
Method: PUT
URL: http://localhost:5000/api/tasks/{task_id}
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE
  Content-Type: application/json
Body (JSON):
{
  "status": "completed"
}

Delete Task
Method: DELETE
URL: http://localhost:5000/api/tasks/{task_id}
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE

Search Tasks
Method: GET
URL: http://localhost:5000/api/tasks/search?q=project
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE

Get Task Statistics
Method: GET
URL: http://localhost:5000/api/tasks/stats
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE