# Locale APP Documentation
### Introduction
The Locale API provides detailed geographic data about Nigeria, offering developers access to information on regions, states, towns and local government areas (LGAs). This RESTful API is built with Node.js and TypeScript, ensuring type safety and enhanced development experience.
### Features
- Authentication: Secure API access through API keys.
- Search: Flexible search capabilities for regions, states, towns and LGAs.
- General APIs: Access to comprehensive lists of regions, states, towns and LGAs.
### Prerequisites
Before setting up Locale API, ensure you have the following installed:
- Node.js and npm
- MongoDB or MongoDB Cloud
- Typescript
- An HTTP client (like Postman)
### Getting Started
1. Clone the Locale App repository from GitHub:
``` markdown
git clone https://github.com/Chisquare7/Locale-APIs.git
```
2. Navigate to the project directory:
``` markdown
cd locale-app
```
3. Install dependencies:
``` markdown
npm install
```
4. Compile TypeScript to JavaScript:
``` markdown
npm run build
```
5. Set up environment variables:
  - Create a .env file in the root directory.
  - Define the following environment variables in the .env file:
    - PORT: Port number for the application (e.g., 4050).
    - DB_URL: MongoDB connection URL.
6. Start the application:
``` markdown
npm start
```
7. Access the Application: Once the server runs, you can access the application at `http://localhost:<PORT>` in your HTTP client (like Postman).
### API Documentation
#### Authentication
To use the Locale API, developers must first register and obtain an auto-generated API key. Include this API key in the Authorization header of your requests.
- Sign Up
  - URL: `/users`
  - Method: `POST`
  - Request Body:
  ``` json
  {
    "email": "developer@example.com",
    "password": "yourpassword"
  }
  ```
#### Search
The Locale API offers powerful search capabilities allowing developers to retrieve detailed information about regions, states, and local government areas (LGAs) within Nigeria.
- Search by Region
  - Description: Retrieve a list of states within a specified region.
  - Endpoint: `/one-region/code/{region_code}`
  - Method: `GET`
  - URL Params:
    - region_code - The name of the region you wish to search for e.g. NC (for North Central).
  - Example Request: `/one-region/code/nc`
- Search by State
  - Description: Retrieve detailed information about a state.
  - Endpoint: `/one-state/code/{state_code}`
  - Method: `GET`
  - URL Params:
    - state_code - The name of the state you wish to search for e.g. abia, lagos.
  - Example Request: `/one-state/code/abia`
- Search by State (with all its LGAs)
  - Description: Retrieve detailed information about a state, including its LGAs.
  - Endpoint: `/state-lgas/name/{state_name}`
  - Method: `GET`
  - URL Params:
    - state_name - The name of the state you wish to search for e.g. abia, lagos.
  - Example Request: `/state-lgas/name/abia%20state`. Another example is `/state-lgas/name/lagos`
#### General APIs
These endpoints provide lists of all regions, states, and LGAs within Nigeria. They are accessible to authenticated users who have included their API key in the request header.
- List All Regions
  - Description: Fetches a comprehensive list of all regions in Nigeria.
  - Endpoint: `/regions/all`
  - Method: `GET`
  - Example Request: `/regions/all`
- List All States
  - Description: Fetches a comprehensive list of all states in Nigeria.
  - Endpoint: `/states`
  - Method: `GET`
  - Example Request: `/states`
- List All Nigeria LGAs
  - Description: Fetches a comprehensive list of all LGAs in Nigeria.
  - Endpoint: `/nigeria-lgas/all`
  - Method: `GET`
  - Example Request: `/nigeria-lgas/all`
##### Note for Developers:
To access these endpoints, ensure to include your API key in the request header using any of the following:
- Headers:
  - `Key: api-key`
  - `Value: YOUR_API_KEY_VALUE`
- Authorization:
  - `Type: API Key`
  - `Key: api-key`
  - `Value: YOUR_API_KEY_VALUE`
This ensures that your requests are authenticated, providing secure access to the Locale API's functionalities.
### Development
This project uses TypeScript for development. To start the TypeScript compiler in watch mode:
``` markdown
npm run dev
```
### Testing
``` markdown
npm test
```
### Contributing
We welcome contributions to the Locale API! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/NewFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new Feature`).
5. Push to the branch (`git push origin feature/NewFeature`).
6. Open a pull request.
Please ensure your code adheres to the project's coding standards and passes all tests.
### Deployment
  - Backend code deployed URL: [Deployed Base URL](https://locale-dev-api.onrender.com/)
  - Postman Testable Documentation Link: [Locale App Documentation](https://bit.ly/locale-app-documentation)
### Developer
> Chibuike Chijioke | [LinkedIn](https://www.linkedin.com/in/chibuike-chijioke-47520823a/) | [Twitter](https://twitter.com/Lifestyleafresh)
###### © Code Chi 2024
