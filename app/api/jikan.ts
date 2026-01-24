const baseURL = "https://api.jikan.moe/v4/";

// ==========================
// Get Top Anime
// ==========================
export async function getTopAnime(page = 1, limit = 10) {
  try {
    const res = await fetch(`${baseURL}top/anime?page=${page}&limit=${limit}`);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching top anime:", error);
    return [];
  }
}

// ==========================
// Get Upcoming Anime
// ==========================
export async function getUpcomingAnime(page = 1, limit = 10) {
  try {
    const res = await fetch(`${baseURL}top/anime?filter=upcoming&page=${page}&limit=${limit}`);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching upcoming anime:", error);
    return [];
  }
}

// ==========================
// Get Best Anime (by score)
// ==========================
export async function getBestAnime(page = 1, limit = 10) {
  try {
    const res = await fetch(`${baseURL}top/anime?filter=favorite&page=${page}&limit=${limit}`);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching best anime:", error);
    return [];
  }
}

// ==========================
// Get Currently Airing Anime
// ==========================
export async function getAiringAnime(page = 1, limit = 10) {
  try {
    const res = await fetch(`${baseURL}top/anime?filter=airing&page=${page}&limit=${limit}`);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching airing anime:", error);
    return [];
  }
}

// ==========================
// Get Most Popular Anime
// ==========================
export async function getPopularAnime(page = 1, limit = 10) {
  try {
    const res = await fetch(`${baseURL}top/anime?filter=bypopularity&page=${page}&limit=${limit}`);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching popular anime:", error);
    return [];
  }
}

// ==========================
// Get Top Manga
// ==========================
export async function getTopManga(page = 1, limit = 10) {
  try {
    const res = await fetch(`${baseURL}top/manga?page=${page}&limit=${limit}`);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching top manga:", error);
    return [];
  }
}

// ==========================
// Get Anime by ID
// ==========================
export async function getAnimeById(id: number | string) {
  try {
    const res = await fetch(`${baseURL}anime/${id}`);
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error(`Error fetching anime ID ${id}:`, error);
    return null;
  }
}

// ==========================
// Get Manga by ID
// ==========================
export async function getMangaById(id: number | string) {
  try {
    const res = await fetch(`${baseURL}manga/${id}`);
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error(`Error fetching manga ID ${id}:`, error);
    return null;
  }
}

// ==========================
// Search Anime
// ==========================
export async function searchAnime(query: string, page = 1, limit = 10) {
  try {
    const res = await fetch(`${baseURL}anime?q=${query}&page=${page}&limit=${limit}`);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error searching anime:", error);
    return [];
  }
}

// ==========================
// Search Manga
// ==========================
export async function searchManga(query: string, page = 1, limit = 10) {
  try {
    const res = await fetch(`${baseURL}manga?q=${query}&page=${page}&limit=${limit}`);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error searching manga:", error);
    return [];
  }
}

// ==========================
// Seasonal Anime
// ==========================
export async function getSeasonalAnime(year?: number, season?: string) {
  try {
    let url = `${baseURL}seasons/now`;
    if (year && season) {
      url = `${baseURL}seasons/${year}/${season}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching seasonal anime:", error);
    return [];
  }
}

// ==========================
// Get Anime Characters
// ==========================
export async function getAnimeCharacters(id: number | string) {
  try {
    const res = await fetch(`${baseURL}anime/${id}/characters`);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error(`Error fetching characters for anime ID ${id}:`, error);
    return [];
  }
}

// ==========================
// Get Anime Recommendations
// ==========================
export async function getAnimeRecommendations(id: number | string) {
  try {
    const res = await fetch(`${baseURL}anime/${id}/recommendations`);
    const data = await res.json();
    return data.data.slice(0, 8) || [];
  } catch (error) {
    console.error(`Error fetching recommendations for anime ID ${id}:`, error);
    return [];
  }
}

// ==========================
// Helper: Get data by section ID
// ==========================
export async function getDataBySection(sectionId: string, page = 1, limit = 10) {
  switch (sectionId) {
    case "top-anime":
      return getTopAnime(page, limit);
    case "upcoming-anime":
      return getUpcomingAnime(page, limit);
    case "best-anime":
      return getBestAnime(page, limit);
    case "airing-anime":
      return getAiringAnime(page, limit);
    case "popular-anime":
      return getPopularAnime(page, limit);
    case "seasonal-anime":
      return getSeasonalAnime();
    case "top-manga":
      return getTopManga(page, limit);
    default:
      return [];
  }
}