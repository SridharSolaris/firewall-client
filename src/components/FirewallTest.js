import React, { useState } from "react";

const FirewallTest = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const serverUrl =
    process.env.REACT_APP_FIREWALL_SERVER || "http://localhost:3000";

  const handleTestRequest = async () => {
    // Use serverUrl instead of hardcoding
    try {
      const res = await fetch(`${serverUrl}/test`);
      if (res.ok) {
        const data = await res.text();
        setResponse(data);
      } else {
        const error = await res.json();
        setResponse(error.message || "Request failed");
      }
    } catch (err) {
      setResponse(`Error making request: ${err.message}`);
    }
  };

  return (
    <div>
      <button onClick={handleTestRequest} disabled={loading}>
        {loading ? "Sending Request..." : "Send Test Request"}
      </button>
      {response && <p>Response: {response}</p>}
    </div>
  );
};

export default FirewallTest;
