import React, { useEffect, useState } from "react";
import { validateIP } from "../services/firewallService";

const ProtectedPage = () => {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const checkIP = async () => {
      try {
        const ip = "192.168.1.1"; // Replace with actual client IP retrieval logic
        const result = await validateIP(ip);
        if (result.blocked) {
          setIsBlocked(true);
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
    </div>
  );
};

export default ProtectedPage;
