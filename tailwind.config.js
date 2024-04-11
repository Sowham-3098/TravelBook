/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.js","./screens/HomeScreen.js","./navigation/appNavigation.js","./screens/LoginScreen.js",
  "./components/ScreenWrapper.js",
  "./components/emptyList.js",
  "./screens/AddTripScreen.js",
  "./screens/AddExpenseScreen.js",
  "./components/BackButton.js",
  
  "./theme/colors.js",
  "./assets/images/randomImage.js",
"./screens/TripExpense.js",
"./components/ExpenseCard.js",
"./constants/index.js",
"./screens/WelcomeScreen.js",
"./screens/SignupScreen.js",
"./screens/SigninScreen.js",
"./components/loading.js",
"./screens/ExpenseSummary.js",
"./screens/EditExpense.js",],
 
  theme: {
    extend: {},
  },
  plugins: [],
}

