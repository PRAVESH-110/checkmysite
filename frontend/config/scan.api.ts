import { apiEndpoints } from "./api";


export async function scanRequest(url: string) {
  const token = localStorage.getItem("token")

  if (!token) {
    throw new Error("You must be signed up to run a scan.");
  }

  const response = await fetch(apiEndpoints.scan.create, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ url })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to scan");
  }

  return response.json(); // { scanId, status }
}

export async function getScanById(scanId: string) {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("Not authenticated by token")

  const res = await fetch(apiEndpoints.scan.getById(scanId), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to get scan response");
  }

  return res.json();
}
