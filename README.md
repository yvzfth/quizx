# QuizX

QuizX is a flashcard web application built with Angular and .NET Core.

## Prerequisites

Before getting started, make sure you have the following software installed on your machine:

- Node.js (https://nodejs.org)
- Angular CLI (https://angular.io/cli)
- .NET Core SDK (https://dotnet.microsoft.com/download)
- MySQL Server (https://www.mysql.com/downloads/)

## Frontend Setup (Angular)

1. Open a terminal and navigate to the `ClientApp` folder.
   `cd ClientApp/`
2. Run the following command to install the dependencies:

`npm install`

3. Once the installation is complete, you can start the development server by running:

`ng serve`

This will build the Angular app and start a development server. The app will be accessible at http://localhost:4200. 4. Open your web browser and navigate to http://localhost:4200 to see the QuizX application.

## Backend Setup (.NET)

1. Open a new terminal and navigate to the `QuizxAPI` folder.

`cd /QuizXAPI/QuizxAPI/`

2. Open the `appsettings.json` file and update the connection string in the `ConnectionStrings` section with your MySQL server details.

"ConnectionStrings": {
"DB": "server=localhost;port=3306;database=quizx;user=quizx;password=Quizx.123;"
},

3. Run the following command to restore the NuGet packages:

`dotnet restore`

4. Create the database by running the following command:

`dotnet ef database update`

This will apply any pending migrations and create the necessary database tables.

5. Start the backend server by running:

`dotnet build`
`dotnet run`

The backend server will be accessible at http://localhost:5169.

## Additional Configuration

- The frontend is configured to send API requests to `http://localhost:5169/api/` by default. If your backend server is running on a different port or URL, you can modify the API endpoint in the `environment.ts` file located in `ClientApp/src/environments/`.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
