import React, { useState } from "react";

const FirewallForm = () => {
  const [ip, setIp] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseColor, setResponseColor] = useState("black");

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleRequest = async (endpoint) => {
    if (!ip) {
      setResponseMessage("Please enter an IP address.");
      setResponseColor("red");
      return;
    }
    try {
      const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip }),
      });
      const message = await response.text();
      setResponseMessage(message);
      setResponseColor(response.ok ? "green" : "red");
    } catch (error) {
      setResponseMessage(`Failed to ${endpoint} IP. Check the API connection.`);
      setResponseColor("red");
    }
  };

  const handleBlock = () => handleRequest("block");
  const handleUnblock = () => handleRequest("unblock");

  return (
    <div className="firewall-form">
      <input
        type="text"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
        placeholder="Enter IP Address"
        className="ip-input"
      />
      <div className="button-group">
        <button onClick={handleBlock} className="block-button">
          Block IP
        </button>
        <button onClick={handleUnblock} className="unblock-button">
          Unblock IP
        </button>
      </div>
      <p className="response-message" style={{ color: responseColor }}>
        {responseMessage}
      </p>
    </div>
  );
};

export default FirewallForm;
