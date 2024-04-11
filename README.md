# TravelBook

TravelBook is a React Native mobile application designed to simplify trip expense tracking. With Firebase integration for authentication and database management, users can efficiently manage their travel expenses, organize trips, and monitor budgets.



<img width="1440" alt="Your paragraph text" src="https://github.com/Sowham-3098/TravelBook/assets/95470604/88f5de89-853a-45b0-b71a-dac8cd1124c8">

## Latest Feature Updates in Version 1.4

- **Email Verification and Forgot Password**: Users are now required to verify their email addresses through a verification link sent to their email inbox. Additionally, a forgot password functionality has been implemented, allowing users to reset their passwords securely.
- **Update and delete trips and expenses**:  Users now delete trips from their trip list and update or delete individual expenses within their expense list. This feature enhances user control and flexibility over their travel information.
- **Add Category**: A new feature has been introduced allowing users to add custom categories for expenses. This feature enables users to categorize their expenses more accurately, catering to their specific needs and preferences.

## Features

- **User Authentication**: Sign-up, sign-in, and log-out functionalities powered by Firebase.
- **Trip Management**: Users can add new trips with details such as place name, country name, and estimated budget.
- **Expense Tracking**: Within each trip, users can add expenses categorized by type, keeping track of spending during their travels.
- **Budget Alerts**: You can see if your expense in one trip exceeds your budget in app interface
- **Expense Summary**: Users can view a comprehensive summary of all expenses for each trip, including total expenditure, the number of expenses, and category-wise spending.
- **Persistent Storage**: All trip and expense data is securely stored in the Firebase database, allowing users to access their information anytime, anywhere.


## Tech Stack

- **React Native**: Frontend framework for building cross-platform mobile applications.
- **JavaScript**: Primary programming language used for application logic.
- **Firebase**: Authentication and database services for user management and data storage.
- **Redux**: State management library for managing application state.
- **Native Wind**: UI framework based on Tailwind CSS for efficient and responsive design.

## Future Updates

TravelBook is currently in its basic version, with plans for additional features and enhancements in future updates. Stay tuned for more functionalities to streamline your travel expense management experience!



This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
