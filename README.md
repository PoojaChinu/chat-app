# Meet App

## Description

This chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location. Data such as chat messages and images are stored in [Google Firebase](https://firebase.google.com/) (Firestore Databse and Storage). Chat UI is powered by [Gifted Chat](https://github.com/FaridSafi/react-native-gifted-chat).

## User Stories

1. As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
2. As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
3. As a user, I want to send images to my friends to show them what I’m currently doing.
4. As a user, I want to share my location with my friends to show them where I am.
5. As a user, I want to be able to read my messages offline so I can reread conversations at any time.
6. As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

## Key Features

1. A page where users can enter their name and choose a background color for the chat screen before joining the chat.
2. A page displaying the conversation, as well as an input field and submit button.
3. The chat must provide users with two additional communication features: sending images and location data.
4. Data gets stored online and offline.

Demo Recording [https://github.com/PoojaChinu/chat-app/blob/main/demo/finalRecording.mov]

## Set Up the App

### Clone repository

Open your terminal and run the following.

```
git clone https://github.com/vdevhub/chat-chime.git
```

### Install Node.js, nvm, and npm

Check if you already have Node.js, nvm, and npm installed.

```
node -v
nvm -v
npm -v
```

If you don't have them instaled, please follow this [guidance](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm) to get them set up.

### Get Expo

1. Install Expo Go from the relevant app store for your device (iOS or Android).
2. Head over to the [Expo Signup page](https://expo.dev/signup) and follow the instructions to create an account.
3. Once your account is created, log in to Expo from your browser and mobile app.
4. To log in to Expo account in the terminal, run `npx expo login` and follow the login process.
5. You can see the currently logged-in account by running `expo whoami`.

### Install Dependencies

1. Navigate to the cloned project in your terminal, so that you are in the root of the project.
2. All dependencies for this project are stated in the `package.json` file of this project. Optionally, you can review this file by running `cat package.json` in the terminal or open it in your code editor (e.g., VSCode).
3. Run `npm install` in the terminal while in the root folder of the project. This should automatically install all the required dependencies.

### Configure Firebase

1. Head to [Google Firebase](https://firebase.google.com/) and Sign In in the upper-right corner. Use your existing Google credentials to sign in and create a new Firebase account.
2. Welcome screen is now showing. Click on `Create a project` (or Add project if you’ve created Firebase projects before).
3. Give your project a name, it's up to you, e.g. `demo-chat` or anything you want.
4. Agree to the terms and continue.
5. Disable `Google Analytics` option and select `Create Project`.
6. In the left sidebar, select `Build` and `Firestore Database`.
7. Click `Create Database`, select the region from the Multi-region label that's closest to you.
8. On the next page, select `Start in production mode`. Hit `Next` and your new database should be automatically loaded.
9. On the database dashboard, click `Rules` and make sure the rule states `allow read, write: if true;` instead of the default `false`. Click Publish when updated.
10. Again, in the left sidebar, select `Build` and `Storage`.
11. Click `Get started`. A popup will open that asks you to set your cloud storage. Keep everything on default and press `Next`, then `Done`.
12. On the storage dashboard, click `Rules` and make sure the rule states `allow read, write: if true;` instead of the default `false`. Click Publish when updated.
13. Once again, in the left sidebar, select `Build` and `Authentication`.
14. Click on the `Sign-in method` tab and select `Anonymous`.
15. Once clicked, a form will appear where you can toggle `Enable` on for anonymous sign-ins. Then, click `Save`, and you’ll be presented with a table showing a confirmation that anonymous sign-in has been enabled (it should say “Enabled” in the Status column).

### Add Firestore Configuration to Your Project

1. In the Firestore project in your browser, open you "Project Settings" (gear icon).
2. Select the `General` tab and find a section called `Your Apps`.
3. Click the `Firestore for Web` button - it is the </> icon. Clicking this button will open a new screen asking you to register your web app, which will connect to the Firestore database you just created.
4. Fill in a name for your app, e.g., demo_chat, and click `Register App` (ignore hosting) to generate the configuration code which should be presented to you at this point. Keep this open.
5. Head back to your project and ideally open it in a code editor, e.g., VSCode.
6. Create a new `.env` file in the root folder. This is the file with environmental variables that Expo will use to load your configuration. The keys should be names as follows and replace VALUES with your own configuration values that Firebase just generated for you (no quotes surrounding the values, only values themselves):

```
EXPO_PUBLIC_API_KEY=VALUE
EXPO_PUBLIC_AUTH_DOMAIN=VALUE
EXPO_PUBLIC_PROJECT_ID=VALUE
EXPO_PUBLIC_STORAGE_BUCKET=VALUE
EXPO_PUBLIC_MSG_SENDER_ID=VALUE
EXPO_PUBLIC_APP_ID=VALUE

### Run Your App

1. In your terminal, navigate to your project's root folder.
2. Run `npx expo start` which should launch the Metro Bundler that serves your application.
3. Head to your mobile Expo Go app and you should see this app appearing on the dashboard from where you launch it.
4. Both your device with the Expo Go app and your computer you run the project from should be on the same network. Otherwise, you'll need to scan the QR code provided by the Metro Bundler on the mobile device with Expo Go which is on a different network.
```

## Usage

Running on an Emulator

1. Ensure you have an Android or iOS emulator running.
2. Press a (for Android) or i (for iOS) in the Expo CLI to start the app on the emulator.

Running on a Physical Device

1. Install the Expo Go app from the App Store or Google Play.
2. Scan the QR code generated by npx expo start to run the app on your device.
