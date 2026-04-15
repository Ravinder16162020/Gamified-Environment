# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Repository

[GitHub repository](https://github.com/Ravinder16162020/Gamified-Environment.git)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs only the frontend app in development mode on port 3000.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Run frontend and backend separately

Use two terminals:

1. Frontend terminal:

```bash
npm start
```

This starts the React frontend on port 3000.

2. Backend terminal:

```bash
cd backend
node server.js
```

This starts the API server on port 5000.

If you prefer the backend package script, you can also run:

```bash
cd backend
npm start
```

Both commands run the same backend server on port 5000.

## Google Cloud OTP Setup

Use this setup if you want the OTP to be sent to the email address entered in signup step 1.

### 1. Create or select a Google Cloud project

- Open Google Cloud Console.
- Create a new project or use an existing one.

### 2. Enable Gmail API

- In the Google Cloud project, enable the Gmail API.
- This is required for sending OTP emails through your Gmail account.

### 3. Configure OAuth consent screen

- Set up the OAuth consent screen.
- Add your email as a test user while developing.

### 4. Create OAuth credentials

- Create an OAuth Client ID for a Web Application.
- Save the Client ID and Client Secret.

### 5. Generate a refresh token

- Use OAuth Playground or your own OAuth flow.
- Authorize with Gmail scopes so the app can send mail.
- Copy the refresh token after consent.

### 6. Add backend environment variables

Add these values in your backend `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
SMTP_EMAIL=your_gmail_address@gmail.com
GOOGLE_OAUTH_CLIENT_ID=your_google_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_google_client_secret
GOOGLE_OAUTH_REFRESH_TOKEN=your_google_refresh_token
```

### 7. Start the app in two terminals

Terminal 1:

```bash
npm start
```

This starts the frontend on port 3000.

Terminal 2:

```bash
cd backend
node server.js
```

This starts the backend on port 5000.

### 8. Verify the OTP flow

- Open signup step 1 and complete registration details.
- Click Next Step.
- The backend sends a 4-digit OTP to the same email address.
- Check your inbox, enter the OTP in step 2, and click Verify.
- After verification, click Complete Registration.

### Troubleshooting

- If you see `OTP email service is not configured`, your Google Cloud environment variables are missing.
- If you see Mongo auth errors, check `MONGO_URI`.
- If OTP still does not arrive, confirm the Gmail API is enabled and the refresh token is valid.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
