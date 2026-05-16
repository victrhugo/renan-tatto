const fs = require('fs');

async function run() {
  console.log("Getting token...");
  const res1 = await fetch("https://renan-tatto.vercel.app/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "blob.generate-client-token",
      payload: {
        pathname: "test-image.jpg",
        callbackUrl: "https://renan-tatto.vercel.app/api/upload",
        clientPayload: "null",
        multipart: false
      }
    })
  });
  
  const data1 = await res1.json();
  console.log("Token response:", data1);
  
  if (!data1.clientToken) {
    console.error("No client token");
    return;
  }
  
  console.log("Uploading file...");
  const res2 = await fetch("https://vercel.com/api/blob/?pathname=test-image.jpg", {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${data1.clientToken}`,
      "x-api-version": "7" // Vercel blob api version
    },
    body: "dummy image content"
  });
  
  const text2 = await res2.text();
  console.log("Upload status:", res2.status);
  console.log("Upload response:", text2);
}

run();
