# Workout Log

A simple workout tracker built with Node, Express, EJS, and MongoDB. Log your exercises, adjust your sets with one click, and delete what you don't need. It was built from a class CRUD example and reworked into a workout app.

<img width="1175" height="584" alt="Screenshot 2026-10-29 at 10 48 57 PM" src="https://github.com/user-attachments/assets/7b65e1ca-89db-4fe3-8faf-fb4291826a10" />


## Features

- **Create:** add a workout with its name, weight (lbs), sets, and reps
- **Read:** see every saved workout on the home page, with the date it was saved
- **Update:** use the plus and minus buttons to add or remove a set
- **Delete:** remove a workout with the trash icon

Each workout is tracked by its own database `_id`, so identical workouts (same name, sets, and reps) can be changed or deleted one at a time.

## Tech Stack

- Node.js
- Express 4
- EJS (server-side templates)
- MongoDB Atlas with the `mongodb` driver (v3)
- `body-parser` and `dotenv`
- Font Awesome (icons)

## Getting Started

### 1. Clone the repo

```
git clone https://github.com/lou7776/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
```

### 2. Install packages

```
npm install
```

### 3. Add your database connection

Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas), add a database user, allow your IP address, and copy your connection string.

Then create a file named `.env` in the project folder:

```
MONGO_URL=your-connection-string-here
```

The `.env` file is listed in `.gitignore`, so your password never gets uploaded. The app uses a database named `workoutlog` and creates it the first time you save a workout.

### 4. Start the server

```
npm start
```

Open [http://localhost:3001](http://localhost:3001). The terminal should print ``Connected to `workoutlog`!``.

## Routes

| Method | Route | What it does |
| ------ | ----- | ------------ |
| GET | `/` | Loads all workouts and renders the page |
| POST | `/workouts` | Saves a new workout from the form |
| PUT | `/sets` | Adds or subtracts one set (sets never go below 0) |
| DELETE | `/delete` | Deletes one workout by its `_id` |

## How It Works

1. The form on the page sends a `POST` request to `/workouts`, and the server saves the workout.
2. The home page route pulls every workout from the `workouts` collection and hands the list to `index.ejs`.
3. Each workout is an `<li>` with a `data-id` holding its `_id`.
4. When you click plus, minus, or trash, `main.js` sends that `_id` to the server with `fetch`. The server finds that exact workout and updates or deletes it, and the page reloads.

## Ideas for Later

- Edit a workout's name, weight, or reps
- Sort workouts by date
- Add a delete confirmation
- Show the date on each workout

## Author

Built by [lou7776](https://github.com/lou7776).
