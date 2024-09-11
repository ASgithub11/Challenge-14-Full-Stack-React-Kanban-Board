import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization;

  // Check if the authorization header is present
  if (authHeader){
    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];

    // Get the secret key from the environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';

    // Verify the token and extract the user data
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Send a forbidden status if the token is invalid
      }

      // Add the user data to the request object
      req.user = user as JwtPayload;
      return next(); // Call the next middleware function
    });
  } else {
    res.sendStatus(401); // Send an unauthorized status if the authorization header is missing
  }
};
