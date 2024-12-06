# Job Board Project

This is a job board web application developed in React and Express. 

This application uses the following major libraries:
- Vite (build tool)
- Tailwind (styling)
- shadcn/ui (components)
- React Router (routing)

along with many other smaller ones to make development more efficient.


## Installation

### Database

Create a database in MySQL called 4370final. This name can be changed by modifying the connection configurations in app.js and each route file.

Next, configure your database connection authentication in app.js and each route file.

Finally, run the SQL scripts found in the sql folder in the root directory of the project. This will create the tables in your database.

### Backend

Next, let's set up the back end Express server. 

```bash
  cd backend
  npm install
```

Then, run the seed.js script to add sample users and jobs to the database. Refer to the usernames and passwords for logging in to the site.

```bash
  node seed.js
```

Finally, run the Express server. By default, it will be on port 7000.

```bash
  node app.js
```

### Frontend

Now, let's configure the front end React application.

```bash
  cd frontend
  npm install
  npm run dev
```
This will start the front end application on port 5173.

## Navigating
Use the credentials from the seed.js file to log in to a user account. Alternatively, sign up by clicking the sign up button in the top right of the screen.

If you log in or sign up as a user with the employer role, you are able to create new job listings. You can do this by clicking on the button in the top middle of the screen.

As an employer, you can edit and delete your own job listings by clicking on them on the home page. There will be buttons to edit and delete these listings on the details page.

These detail pages are dynamically routed based on job id, therefore there can be an infinite amount of pages on this site.

As a user, you are able to navigate the site and view job listings, but you are not able to add, edit, or delete any content.

## Future Improvements
Currently, the user is not able to apply to any job listings. In the future, I would like to add this functionality, along with:
- Admin role to manage users and employers
- Employer page to view applications from users
- Search and filter functionality for job listings
