async function getusers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    return await response.json();
  } catch (err) {
    console.error("Error getting from getting users form the api: " + err);
  }
}

export { getusers };
