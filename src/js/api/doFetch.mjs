export async function doApiFetch(url, fetchMethod, body = null) {
  try {
    const token = localStorage.getItem("accessToken");

    const options = {
      method: fetchMethod,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

// export async function doApiFetch(
//   url,
//   fetchMethod,
//   body = null,
//   fullResponse = false
// ) {
//   try {
//     const token = localStorage.getItem("accessToken");

//     const options = {
//       method: fetchMethod,
//       headers: {
//         "Content-Type": "application/json",
//         authorization: `Bearer ${token}`,
//       },
//     };
//     if (body) {
//       options.body = JSON.stringify(body);
//     }

//     const response = await fetch(url, options);
//     const json = await response.json();

//     if (fullResponse) {
//       // Return full response details when requested
//       return { data: json, status: response.status, ok: response.ok };
//     } else {
//       // Return only the JSON-parsed body by default
//       return json;
//     }
//   } catch (error) {
//     console.log(error);
//     if (fullResponse) {
//       return { data: null, status: "Network Error", ok: false };
//     } else {
//       return null; // Or handle this case appropriately
//     }
//   }
// }
