import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
  });

  // Throw an error if the response status is not in the range 200-299
  if (!response.ok) {
    const errorData = await response.json(); // Parse the error data returned from the server as JSON
    throw new Error(`An error occurred: ${errorData.message}`); // Throw an error with the error message received from the server
  }

  // Parse the response body as JSON
  const data = await response.json();

  // Return the data retrieved from the server
  return data;
  } catch (err) {
    console.log ('Error from user login: ', err); // Log any errors that occur during the fetch request
    return Promise.reject('Could not fetch user info'); // Return a rejected promise with an error message
  }
}

export { login }; // Export the login function to be used in other files
