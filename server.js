const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConfig');
const User = require('./models/userModel');
const userRoutes = require('./routes/userRoutes');


dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use('/api', userRoutes);


app.get('/users', async (req, res) => {
  try {
      const users = await User.find();
      let userTable = `
      <html>
        <head>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f9f9f9;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            .container {
              width: 90%;
              max-width: 1200px;
              background: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 10px;
              text-align: left;
            }
            th {
              background-color: #4CAF50;
              color: white;
              text-transform: uppercase;
              font-size: 14px;
              letter-spacing: 1px;
            }
            tr:nth-child(even) {
              background-color: #f2f2f2;
            }
            tr:hover {
              background-color: #eafaf1;
            }
            td {
              font-size: 14px;
              color: #333;
            }
            .header {
              background-color: #4CAF50;
              color: white;
              padding: 40px;
              text-align: center;
              font-size: 25px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
         <div class="container>
          <h1 class="header">REGISTERED USERS</h1>
          <table>
           <thead>
            <tr>
              <th>Field</th>
              <th>Description</th>
            </tr>
           </thead>
           <tbody>
    `;

    users.forEach((user) => {
      userTable += `
        <tr>
          <td>id</td>
          <td>${user.id}</td>
        </tr>
        <tr>
          <td>First Name</td>
          <td>${user.firstName}</td>
        </tr>
        <tr>
          <td>Last Name</td>
          <td>${user.lastName}</td>
        </tr>
        <tr>
          <td>Email Address</td>
          <td>${user.email}</td>
        </tr>
        <tr>
          <td>Password</td>
          <td>${user.password ? "Encrypted" : "Not Set"}</td>
        </tr>
        <tr>
          <td>Phone Number</td>
          <td>${user.phoneNumber}</td>
        </tr>
      `;
    });

    userTable += `
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `;

      res.send(userTable);
  } catch (err) {
      res.status(500).send('Error fetching users');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
