const mongoose = require('mongoose');
const User = require('../models/User.js');  // Adjust the path if necessary
const bcrypt = require('bcrypt'); // Include bcrypt for password hashing

// Replace with your actual MongoDB URI
const mongoURI = 'mongodb://localhost:27017/files_manager';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mockUserData = [
  {
    fullName: 'Ngozi Robertson',
    email: 'ngrob4real@gmail.com',
    phoneNumber: '123-456-7890',
    country: 'Nigeria',
    company: 'MyCompany',
    customerId: 'cust001',
    password: 'password1', // Ensure this password is hashed
  },
  {
    fullName: 'Ng-Rob Agomuonso',
    email: 'ngoziagomuonso@gmail.com',
    phoneNumber: '987-654-3210',
    country: 'Nigeria',
    company: 'MyCompany',
    customerId: 'cust002',
    password: 'password2', // Ensure this password is hashed
  },
];

const seedUsers = async () => {
  try {
    for (const user of mockUserData) {
      // Check if the user already exists
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await User.create({
          ...user,
          password: hashedPassword, // Use hashed password
        });
        console.log(`User created: ${user.email}`);
      } else {
        console.log(`User already exists: ${user.email}`);
      }
    }
  } catch (err) {
    console.error('Error seeding user data:', err);
  } finally {
    mongoose.disconnect(); // Ensure this runs whether there's an error or not
  }
};

// Run the seed function
seedUsers();
