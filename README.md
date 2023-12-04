# Yonggye Travel

## Description

Yonggye Travel is a service designed for travelers to explore and authenticate their journey around Yonggye Station in Daegu. 

Uniquely facilitated through a WebView in a mobile app, it offers a convenient way to experience the local area by following various courses and validating visits.

## Features

1. **QR Code Recognition for Visit Verification**: Users can authenticate their visits by scanning QR codes at each destination.
   
2. **Course Introduction Using Kakao Maps API**: Utilizing the Kakao Maps API, the service guides users through various courses, offering detailed and interactive maps for a seamless travel experience.
   
3. **Real-Time User Location Display**: The app includes a feature that displays the user's current location in real-time, enhancing the navigational experience and making it easier to follow the designated travel courses.
   
4. **Registration and Kakao Login**: Supports both standard registration and Kakao login, providing users with a wide range of authentication options.

## Technology Stack

- Ejs
- CSS
- JavaScript
- Express
- MySQL

## Installation and Running

### System Requirements

Before installing and running the project, make sure the following software is installed on your system:

```
node 16.17.1
npm 8.15.0
```

### Installation

```
npm install
```

### Configuration

1. Create a `.env` file at the root of the project.
2. Add the following content to the `.env` file:
   
    ```sh
    DB_HOST= # set DB Hostname
    DB_PORT= # set DB Port
    DB_USER= # set DB User Id
    DB_DATABASE= # set DB name
    DB_PASSWORD= # set DB Password
    CLIENT_ID= # Kakao login client id
    SECRET_KEY= # JWT secret key
    JWT_EXPIRE= # JWT expiration date, e.g., 14d = 14 days
    ```

3. Register Kakao Maps API key in src/client/html/course.ejs

    ```html
    <!-- Register the API key in appkey -->
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey="></script>
    ```

### Running

```sh
npm run dev
```

### Deploy

```sh
# build
npm run build

# start server
npm run start
```

## Release Notes

### Version 1.0.0 (2022. 6. 2)

- Implemented a map of the area around Yonggye Station using the Kakao Maps API.
- Real-time user location display feature.
- QR code-based authentication feature.
- Included basic functionalities.

### Version 1.0.1 (2022. 6. 2)

- Added a loading animation for map loading.

### Version 1.1.0 (2022. 6. 2)

- Modularization of duplicate EJS code.

### Version 2.0.0 (2023. 2. 8)

- Transitioned to REST API.
- Added features for registration, login, and logout.
- Added exception handling logic.
- Added validation for request data.
- Implemented a choice between using a database and server memory for storage.
- Transitioned from function-based to class-based code structure.
- Switched to using the Android QR library when accessed via the Android app.

### Version 2.0.1 (2023. 2. 8)

- Resolved deployment errors due to case sensitivity issues in Git.

### Version 2.0.2 (2023. 2. 12)

- Resolved CORS error issues.

### Version 3.0.0 (2023. 9. 15)

- Added Kakao login functionality using Passport.
- Added QR authentication verification logic (using Pythagorean theorem).
- Removed the server memory usage option.
- Changed the structure to allow for common responses.
- Added README and table.sql files.
- Removed the use of the Android QR library and reverted to the original library.

### Version 3.0.1 (2023. 9. 19)

- Added exception handling for camera recognition failures.