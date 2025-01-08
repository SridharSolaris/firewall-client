import React, { useEffect, useState } from "react";
import { validateIP } from "../services/firewallService";

const ProtectedPage = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [userIP, setUserIP] = useState(null);

  useEffect(() => {
    const fetchUserIP = async () => {
      try {
        // Fetch the user's IP using an external IP service
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setUserIP(data.ip);
        return data.ip;
      } catch (error) {
        console.error("Error fetching user IP:", error);
        return null;
      }
    };

    const checkIP = async () => {
      try {
        const ip = await fetchUserIP(); // Get the user's IP dynamically
        if (ip) {
          const result = await validateIP(ip); // Validate the IP with the backend
          if (result.blocked) {
            setIsBlocked(true);
          }
        }
      } catch (error) {
        console.error("Error validating IP:", error);
      }
    };

    checkIP();
  }, []);

  if (isBlocked) {
    return <h1>Access Denied</h1>;
  }

  return (
    <div>
      <h1>Welcome to the Protected Page</h1>
      <p>This page is protected by the firewall.</p>
      {userIP && <p>Your IP: {userIP}</p>}
    </div>
  );
};

export default ProtectedPage;
