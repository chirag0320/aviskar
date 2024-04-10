// let userInactiveTime = 0;
// const logoutTimeout = 1*60*1000; // 5 minutes in milliseconds

// // Function to reset the user inactive time
// const resetUserInactiveTime = () => {
//   userInactiveTime = 0;
// };

// // Function to handle user activity
// const handleUserActivity = () => {
//   // Reset the inactive time
//   resetUserInactiveTime();
  
//   // You can perform any other actions here when the user is active
// };

// // Function to handle logout
// const handleLogout = () => {
//   // Call the logout API
//   // Replace 'logoutApiEndpoint' with your actual logout API endpoint
//   fetch('logoutApiEndpoint', {
//     method: 'POST',
//     // Add any necessary headers and body parameters
//   })
//   .then(response => {
//     // Handle the logout response
//     // For example, show a popup or redirect to the login page
//     alert('You have been logged out due to inactivity.');
//     window.location.href = '/login'; // Redirect to the login page
//   })
//   .catch(error => {
//     console.error('Error logging out:', error);
//   });
// };

// // Add event listeners for user activity
// document.addEventListener('mousemove', handleUserActivity);
// document.addEventListener('keydown', handleUserActivity);

// // Set up the interval to check for user inactivity
// setInterval(() => {
//   userInactiveTime += 1000; // Increment the inactive time by 1 second
  
//   // Check if the user has been inactive for the logout timeout duration
//   if (userInactiveTime >= logoutTimeout) {
//     handleLogout(); // Call the logout function
//   }
// }, 1000); // Check every 1 second for user inactivity
