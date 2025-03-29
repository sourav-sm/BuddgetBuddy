# Welcome to BuddgetBuddy

### Home Page
![Screenshot 2025-03-29 111320](https://github.com/user-attachments/assets/0a0675e6-e2e5-4f0e-b5fc-27bad6dcc146)


### Dashboard Page
![image](https://github.com/user-attachments/assets/fcfe7760-c811-4499-9b74-f4ca2421212f)

### Budget Page
![Screenshot 2025-03-29 114113](https://github.com/user-attachments/assets/50731e0f-59f0-4fa0-8524-471129e348f6)


### Expense Page
![image](https://github.com/user-attachments/assets/13f44c67-7dab-4761-a65c-ec04275ba136)



## Hosted Links--
For More Information,  Do Check out This--> [BuddgetBuddy](https://buddget-buddy--two.vercel.app/)


## Overview

BudgetBuddy is a full-stack platform built with Next.js that helps users manage their expenses and plan their budgets effectively.
## Features

-   **User Authentication:** Implemented user  authentication with Clerk, enabling secure user access and personalized budget management, 
-  **Expense Tracking :**  User can Create new budgets in which they can add their day to day expenses . Also they can filter-out their latest expenses . User can delete their budgets or update their budgets , same for expense.
-   **Responsive Design:** Designed an interactive dashboard with graphical insights using Recharts and Tailwind CSS, providing users with a detailed view of expenses, budgets, and the latest transactions for better financial tracking.


## Technologies Used

-   **Frontend and Backend :**
    -   Next.js
-   **Styling:**
    -   tailwindCSS,
-   **Authentication:**
    -   clerk
-   **Language:**
    -   TypeScript
-   **Graphs:**
    -   Recharts
-   **Database and ORM :**
    -   Drizzle
    -   PostgreSQL ( NeonDB )
   - **Deployment:**
       -   Vercel 

## Installation and Setup

### Prerequisites

-   Node.js (v14 or later)
-   PostgreSQL

### Steps to Setup Locally

1.**Clone the repository:**
 
    `git clone [https://github.com/sourav-sm/BuddgetBuddy.git]`

    `cd BuddgetBuddy`


 2.**Install dependencies:**
 
     `npm install` 
 
    
3.**Set up the environment variables:** 

  Create a `.env` file in the root directory and add the following:

     `
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=Your Private Key
    CLERK_SECRET_KEY=Your Secret Key

    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

    NEXT_PUBLIC_DATABASE_URL=postgresql://<your-username>:<your-password>@ep-royal-bread-48297123.us-east-2.aws.neon.tech/Expense-Tracker?sslmode=require

     `

    
4.**Migrate the database:**

    `npx prisma migrate dev --name init`
    
    
5.**Start the development server:**

    `npm run dev` 
    
6.**Access the application:**
Open your browser and go to 

    `http://localhost:3000`.  


## Contribution
We welcome contributions from the community! Follow these steps to contribute:

1.  Fork the repository on GitHub.
2.  Create a new branch with a `descriptive-name`.
3.  Make your changes and commit them with clear and concise messages.
4.  Push your changes to your fork.
5.  Create a pull request to the `main` branch of the original repository.

## Contact

For any questions or suggestions, feel free to open an issue or contact here.
-   Sourav Mohanta - developersourav135@gmail.com
-   Portfolio: https://sourav-mohanta.vercel.app/
