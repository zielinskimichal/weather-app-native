# Weather App

Weather App is a mobile application built with React Native and Expo, allowing users to check the current weather conditions by city. It uses a NestJS backend to fetch weather data.

## Features

- Search for weather by city name
- Display current weather conditions, including temperature, icon, and description
- Native location fetching by device
- Display weather conditions by current location

## Getting Started

### Prerequisites

- Node.js (LTS) installed - https://nodejs.org/en
- Yarn installed - https://yarnpkg.com/getting-started/install or `npm install -g yarn`
- Expo CLI installed - `npm install -g expo-cli`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/weather-app.git

2. Install dependencies:
   ```bash
   cd weather-app
   yarn install
   ```   
3. Start the NestJs api server:
   ```bash
   cd apps/backend
   yarn dev
   ```
4. Start the Expo server:
   ```bash
   cd ../mobile
   yarn dev
   ```   
5. You will see the output of Expo server running. Now you can either:
    
   - scan the QR code with expo go app on your phone
      - for this option you'd need to set up a tunnel to your local machine's port 3000.
        In order to do that I'd recommend you run ngrok. You can do this following this guide: https://ngrok.com/docs/getting-started/ 
   - press `a` for android emulator - https://docs.expo.dev/workflow/android-studio-emulator/
   - press `i` for ios emulator - https://docs.expo.dev/workflow/ios-simulator/

That's it! The app should be running on your device/emulator.