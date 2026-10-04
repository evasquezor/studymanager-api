# StudyManager API

A REST API for managing and tracking students' academic progress.

## Features

* Create, update, and delete students
* Store and manage degree programs
* Manage courses 
* Store ECTS credits for each course
* Record grades for completed courses
* Manage enrolled and completed courses
* Organize courses by semester
* Calculate the current GPA/average grade
* Calculate ECTS-weighted average grades
* Display completed ECTS credits
* Display remaining ECTS credits
* Track the total number of enrolled courses
* Monitor academic progress
* Persist data in a PostgreSQL database
* Expose RESTful CRUD endpoints for all resources

## Technologies

* Node.js
* Express.js
* PostgreSQL
* JavaScript

## Architecture

* The studyManager API follows a layerred backend architecture to separate HTTP handling, application logic and database access
```text
                    ┌──────────────┐
                    │    Client    │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │    Routes    │
                    └──────┬───────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │   Controllers   │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │    Services     │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  Repositories   │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │   PostgreSQL    │
                  └─────────────────┘
```

### Routes
* Define the available REST API endpoints and route incoming HTTP requests to the appropriate controllers.

### Controllers
* Handle HTTP requests and responses, validate incoming data and delegate business operations to the service layer.

### Services
* Contain the application's business logic and coordinate operations between controllers and repositories.

### Repositories
* Handle database access and encapsulate SQL queries and data persistence logic.

### PostgreSQL
* Provides persistent storage for students, degree programs, courses and enrollments.