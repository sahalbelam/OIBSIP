// Retrieve user data from localStorage on page load
const userData = JSON.parse(localStorage.getItem('userData')) || [];

// Function to save user data to localStorage
function saveUserData() {
  localStorage.setItem('userData', JSON.stringify(userData));
}

// Function to securely hash the password
function hashPassword(password) {
  // In a real-world scenario, use a proper hashing algorithm like bcrypt
  return btoa(password);
}

// Function to register a new user
function registerUser(username, password) {
  // Check if the username is already taken
  const userExists = userData.some(user => user.username === username);
  if (userExists) {
    return 'Username already exists'; // Username already exists
  }

  // Validate password contains numbers and symbols
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  if (!hasNumber || !hasSymbol) {
    return 'Password must contain at least one number and one symbol.';
  }

  // Hash the password before storing it
  const hashedPassword = hashPassword(password);
  userData.push({ username, password: hashedPassword });
  saveUserData(); // Save user data to localStorage
  return true; // Registration successful
}

// Function to authenticate user
function authenticateUser(username, password) {
  const user = userData.find(user => user.username === username);
  if (user) {
    // Hash the provided password and compare with the stored hashed password
    const hashedPassword = hashPassword(password);
    return user.password === hashedPassword;
  }
  return false;
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get username and password
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Check if the username and password match
  if (authenticateUser(username, password)) {
    // Successful login
    document.getElementById('message').textContent = 'Login successful!';
    document.getElementById('message').style.color = 'green';
    // Redirect to secured page (in this case, it's just displaying a message)
    window.location.href = 'secured.html';
  } else {
    // Failed login
    document.getElementById('message').textContent = 'Invalid username or password.';
    document.getElementById('message').style.color = 'red';
  }
});

document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get username and password
  const username = document.getElementById('signupUsername').value;
  const password = document.getElementById('signupPassword').value;

  // Register the user
  const registrationResult = registerUser(username, password);
  if (registrationResult === true) {
    // Registration successful
    document.getElementById('signupMessage').textContent = 'Registration successful!';
    document.getElementById('signupMessage').style.color = 'green';
    // Clear signup form
    document.getElementById('signupUsername').value = '';
    document.getElementById('signupPassword').value = '';
  } else {
    // Display registration error
    document.getElementById('signupMessage').textContent = registrationResult;
    document.getElementById('signupMessage').style.color = 'red';
  }
});
