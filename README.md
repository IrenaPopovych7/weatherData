Setup

Install dependencies:

npm init -y
npm install node-fetch dotenv jest

Create .env file with your API key:

OPENWEATHER_API_KEY=your_api_key_here

Project structure:
 .env - We can use this file for security reason, add this file to .gitignore file, and your API will not be published. In case this file will not be present my API key will be used.
 wheatherService.js - main file, all logic is here
 weatherService.test.js - test
 package.json - depandancies file
 README.md - guidenns to set up project

 Logic description: 
 