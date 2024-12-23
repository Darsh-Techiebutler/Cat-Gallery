// src/utils/fetchCatData.js

const CatDatalist = async () => {
  const apiKey =
    "live_d83g3mKJYHYIyLWkMa2iAYlieCX23DWt9baoQxRLtO5N3i7si6G5bVgWl0YAoPfe";
  const url = `https://api.thecatapi.com/v1/images/search?format=json&limit=10&page=1`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default CatDatalist;
