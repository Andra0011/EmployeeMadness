# Employee Data
## Project Description
This is a solo project where I learned to use advanced MERN stack operations and routing. The project focuses on managing employee data for a company, allowing a wide variety of operations on its database.

![image](https://github.com/Andra0011/EmployeeMadness/assets/116810687/0f652a59-98ff-4656-8888-a6619151029a)
![image](https://github.com/Andra0011/EmployeeMadness/assets/116810687/d51fffe1-1e63-4238-bbb2-4dcc1945c5c7)

### Technologies Used

I utilized the following technologies:

- **Node.js**: A runtime environment for server-side JavaScript execution.
- **Express.js**: Backend development, creating APIs.
- **MongoDB**: Storing user data and employee information.
- **React**: Dynamic UI components.
- **Bootstrap**: Responsive styling.
- **CSS**: Custom styling.

### Challenges

Challenges faced during development:

- Designing a well-structured architecture, considering the large number of components.
- Ensuring that functionalities do not interfere with each other.
## Server side

### Install dependencies
```bash
cd ./server
npm install
```

### .env file
Copy the .env.sample as .env and fill up the environment variable for your personal mongodb connecttion url.

### Prepare the database

```bash
cd ./server
npm run populate
```

**populate command** will run the populate.js file as a script and it will generate a buch of starter data for your database. 

### Running the code

```bash
cd ./server
npm run dev
```

It will start the server with nodemon. So it will watch the changes and restart the server if some ot the files changed.

### Testing with test.http

If you like to try the endpoints of the rest api, you can check the test.http file for urls are should work on your environment as well. And if you install the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extenstion for vscode you can actually run those in your editor.



## Client side

### Install dependencies

```bash
cd ./client
npm install
```

### Proxy

Watch for the port of your rest api. By default it will bind on port 8080 and the frontend proxy settings also depend on this configuration. If you for some reasons change the port of the backend, don't forget to change the ./client/package.json proxy settings as well.

### Runnig the code

```bash
cd ./client
npm start
```

And the create-react-app react-scripts package will start your frontend on the 3000 port and you can visit the http://localhost:3000 on your preferred browser.
