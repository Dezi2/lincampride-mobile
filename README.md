# Lincampride - Campus Logistics (React Native / Expo)

Campus service hub with five screens: Dashboard, Find a Ride, Nigeria Weather, User Profile and a main menu.

## Run it

```bash
npm install
npx expo install --fix     # aligns package versions with your Expo Go app
npx expo start
```

Scan the QR code with the Expo Go app (phone and laptop on the same Wi-Fi).

If Expo Go says the project's SDK version is not supported, upgrade the project:

```bash
npx expo install expo@latest
npx expo install --fix
```

## Features

- Splash screen, then a main menu
- Dashboard: wallet balance, active trip (with cancel and refund), stats, live Lagos weather
- Find a Ride: search shuttles, reserve a seat, seat count drops, button disables when full
- Nigeria Weather: 36 states + FCT, live data from Open-Meteo (no API key)
- User Profile: student details, account stats, ride history from your bookings

## Edit your details

Name, department, student ID and starting balance are in `src/data/user.js`.
Shuttles are in `src/data/shuttles.js`.

## Project structure

```
App.js                    navigation stack + providers
src/context/AppContext.js shared state (balance, seats, bookings)
src/screens/              one file per screen
src/components/           Screen shell + Card/Button
src/data/                 user, shuttles, states
src/services/weather.js   Open-Meteo request
```

## Push to GitHub

```bash
git init
git add .
git commit -m "Lincampride campus logistics app"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```
