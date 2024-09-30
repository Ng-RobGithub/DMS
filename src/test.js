const argon2 = require('argon2');

async function checkPassword(plainPassword, hashedPassword) {
  try {
    const match = await argon2.verify(plainPassword, hashedPassword);
    return match; // Returns true if passwords match, false otherwise
  } catch (err) {
    console.error('Error comparing passwords:', err);
    return false; // Or handle the error as needed
  }
}

const plainPassword = 'hashman';

const hashedPassword =
  '$2a$10$2T9B4Lk.DQq7p8OB5ELDbunlPx1X3sLDMRK7xsMhF2p0rsEDmRr/2';
checkPassword(plainPassword, hashedPassword).then((isMatch) => {
  console.log('Passwords match:', isMatch); // Should log true if they match
});
