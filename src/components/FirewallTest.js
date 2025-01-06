import React, { useState } from "react";

const FirewallTest = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const serverUrl = process.env.REACT_APP_FIREWALL_SERVER;

  const handleTestRequest = async () => {
    setLoading(true); // Set loading to true when the request starts
    setResponse(""); // Reset previous response

    try {
      const res = await fetch(`${serverUrl}/test`);
      if (res.ok) {
        const data = await res.text();
        setResponse(data); // Display the response data
      } else {
        const error = await res.json();
        setResponse(error.message || "Request failed");
      }
    } catch (err) {
      setResponse(`Error making request: ${err.message}`);
    } finally {
      setLoading(false); // Set loading to false when request is completed
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
