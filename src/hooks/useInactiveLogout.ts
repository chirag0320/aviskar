import { useEffect, useState } from 'react';

const useInactiveLogout = (logoutTimeout = 300000) => {
  const [userInactiveTime, setUserInactiveTime] = useState(0);

  // Function to reset the user inactive time
  const resetUserInactiveTime = () => {
    setUserInactiveTime(0);
  };

  // Function to handle user activity
  const handleUserActivity = () => {
    // Reset the inactive time
    resetUserInactiveTime();
  };

  // Function to handle logout
  const handleLogout = () => {
    // Call the logout API or perform any other logout actions
    alert('You have been logged out due to inactivity.');
    // Redirect to the login page or perform any other actions
    // window.location.href = '/login';
  };

  useEffect(() => {
    // Add event listeners for user activity
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keydown', handleUserActivity);

    // Set up the interval to check for user inactivity
    const interval = setInterval(() => {
      console.log("increment time",userInactiveTime)
      setUserInactiveTime(prevTime => prevTime + 10000); // Increment the inactive time by 1 second

      // Check if the user has been inactive for the logout timeout duration
      if (userInactiveTime >= logoutTimeout) {
        handleLogout(); // Call the logout function
      }
    }, 10000); // Check every 1 second for user inactivity

    // Cleanup function to remove event listeners and clear interval
    return () => {
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keydown', handleUserActivity);
      clearInterval(interval);
    };
  }, [logoutTimeout, userInactiveTime]);

  return resetUserInactiveTime; // Return the reset function in case it's needed externally
};

export default useInactiveLogout;
