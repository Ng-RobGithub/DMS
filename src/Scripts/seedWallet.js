const mongoose = require('mongoose');
const Wallet = require('../models/Wallet.js'); // Adjust the path if necessary
const User = require('../models/User.js'); // Adjust the path if necessary
const { config } = require('dotenv');

// Load environment variables from .env file
config();

const mongoURI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/files_manager';

const mockWalletData = [
  {
    email: 'ngrob4real@gmail.com', // email to match with users
    totalWalletBalance: 10000000,
    availableBalance: 8900000,
  },
  {
    email: 'ngoziagomuonso@gmail.com', // email to match with users
    totalWalletBalance: 20000000,
    availableBalance: 15000000,
  },
];

const seedWallets = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');

    // Find all users to get their IDs
    const users = await User.find({});

    // Create a mapping from email to user ID
    const emailToUserIdMap = users.reduce((map, user) => {
      map[user.email] = user._id;
      return map;
    }, {});

    // Update mockWalletData to use existing user IDs
    const walletsToInsert = mockWalletData.map((wallet) => {
      const userId = emailToUserIdMap[wallet.email];
      if (!userId) {
        throw new Error(`User not found for email: ${wallet.email}`);
      }
      return {
        user: userId,
        totalWalletBalance: wallet.totalWalletBalance, // Updated field name
        availableBalance: wallet.availableBalance,
      };
    });

    // Insert wallets into the database
    await Wallet.insertMany(walletsToInsert);
    console.log('Wallet data seeded successfully');
  } catch (err) {
    console.error('Error seeding wallet data:', err);
  } finally {
    mongoose.disconnect(); // Ensure this runs whether there's an error or not
  }
};

// Run the seed function
seedWallets();
