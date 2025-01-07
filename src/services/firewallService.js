const FIREWALL_API_URL = "https://localhost:3000";

export async function validateIP(ip) {
  const response = await fetch(`${FIREWALL_API_URL}/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ip }),
  });
  if (!response.ok) {
    throw new Error("Failed to validate IP");
  }
  return response.json();
}
