const API_URL = "https://api.thecatapi.com/v1/images/search";
const API_KEY =
  "live_d83g3mKJYHYIyLWkMa2iAYlieCX23DWt9baoQxRLtO5N3i7si6G5bVgWl0YAoPfe";

export const fetchCats = async (page: number) => {
  const response = await fetch(`${API_URL}?format=json&limit=15&page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
  });
  const data = await response.json();

  return data;
};
