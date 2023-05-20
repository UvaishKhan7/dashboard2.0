# dashboard2.0

This repository contains the code for the **dashboard2.0** project. The project is a dashboard application built using a combination of React on the frontend and Node.js on the backend.

To clone this project, you can use the following command in your terminal:
```
git clone <repo link>
```

After cloning the repository, navigate to the `client` and `server` folders separately and run the following command to install the required dependencies:
```
npm i
```

Please make sure to create the environment variables for both the server and client side.

- For the server side, create a file named `.env` and define the following variables:
```
PORT=<port_number>
MONGO_URL=<database_connection_url>
```

- For the client side, create a file named `.env.local` and define the following variables:
```
REACT_APP_API_URL=<backend_api_url>
```

Once you have set up the environment variables, you can check the backend endpoints using either the 'Thunder Client' extension in VS Code or the 'Postman' app.

If everything is set up correctly and the backend is working fine, you can proceed with the frontend.

To view the video tutorial for this project, click [here](https://youtu.be/uuLSpqOrsIQ).

To access the live version of the project, visit [dashboard2.0](https://dashboard-uk.vercel.app/).

For any further instructions or troubleshooting, please refer to the project documentation / YouTube Video or reach out to me on Discord at UvaishKhan#5771.

Happy coding!
