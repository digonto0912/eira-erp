import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// PrivateRoute Component
const PrivateRoute = ({ children, allowedUserTypes }) => {
  const [isAuthenticated, setIsAuthenticated] = useState("/user-type/Login");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("authToken");
      const userType = localStorage.getItem("userType");

      if (!token || !userType) {
        setIsAuthenticated("/user-type/Login");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/verify-token', {
          method: 'GET',
          headers: {
            'authorization': token, // Send the token in the Authorization header
            'usertype': userType     // Send userType in custom header
          },
        });

        // Check if user's role is allowed to access the route
        try {

          if (!allowedUserTypes.includes(userType)) {
            console.log("here comed");
            setIsAuthenticated("/Unauthorized");
            setLoading(false);
            return;
          }
        }
        catch {
          console.error('Error unauthorized:', error);
        }

        if (response.ok) {
          setIsAuthenticated("Yes");
        } else {
          setIsAuthenticated("/user-type/Login");
        }

      } catch (error) {
        console.error('Error verifying token:', error);
        setIsAuthenticated("/user-type/Login");
      }

      setLoading(false);
    };

    verifyToken();
  }, []);

  if (loading) {
    return <div>Loading... from private</div>; // Show a loading spinner or message while verifying the token
  }

  return (isAuthenticated === "Yes") ? children : <Navigate to={isAuthenticated} />;
};

export default PrivateRoute;
