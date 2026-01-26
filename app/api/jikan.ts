import axios from "axios";

const baseURL = "https://api.jikan.moe/v4/";

// Create axios instance
const api = axios.create({
  baseURL,
});

// Add a rate limit interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    
    // If we hit a 429 (Too Many Requests)
    if (response && response.status === 429) {
      console.warn("Jikan API rate limit hit, retrying...");
      
      // Wait for 1 second before retrying (Jikan limit is 3 requests/sec)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Retry the request
      return api(config);
    }
    
    return Promise.reject(error);
  }
);

// ==========================
// Get Top Anime
// ==========================
export async function getTopAnime(page = 1, limit = 10) {
  try {
    const res = await api.get(`top/anime`, {
      params: { page, limit },
    });
    return res.data.data || [];
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
    const res = await api.get(`top/anime`, {
      params: { filter: "upcoming", page, limit },
    });
    return res.data.data || [];
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
    const res = await api.get(`top/anime`, {
      params: { filter: "favorite", page, limit },
    });
    return res.data.data || [];
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
    const res = await api.get(`top/anime`, {
      params: { filter: "airing", page, limit },
    });
    return res.data.data || [];
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
    const res = await api.get(`top/anime`, {
      params: { filter: "bypopularity", page, limit },
    });
    return res.data.data || [];
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
    const res = await api.get(`top/manga`, {
      params: { page, limit },
    });
    return res.data.data || [];
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
    const res = await api.get(`anime/${id}`);
    return res.data.data || null;
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
    const res = await api.get(`manga/${id}`);
    return res.data.data || null;
  } catch (error) {
    console.error(`Error fetching manga ID ${id}:`, error);
    return null;
  }
}

// ==========================
// Search Anime
// ==========================
export async function searchAnime(query: string, page = 1,) {
  try {
    const res = await api.get(`anime`, {
      params: { q: query, page },
    });
    return res.data || [];
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
    const res = await api.get(`manga`, {
      params: { q: query, page, limit },
    });
    return res.data.data || [];
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
    let url = `seasons/now`;
    if (year && season) {
      url = `seasons/${year}/${season}`;
    }
    const res = await api.get(url);
    return res.data.data || [];
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
    const res = await api.get(`anime/${id}/characters`);
    return res.data.data || [];
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
    const res = await api.get(`anime/${id}/recommendations`);
    return res.data.data.slice(0, 8) || [];
  } catch (error) {
    console.error(`Error fetching recommendations for anime ID ${id}:`, error);
    return [];
  }
}

// ==========================
// Get Anime Episodes
// ==========================
export async function getAnimeEpisodes(id: number, page = 1) {
  try {
    const res = await api.get(`anime/${id}/episodes`, {
      params: { page },
    });

    return {
      episodes: res.data.data || [],
      pagination: res.data.pagination,
    };
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return {
      episodes: [],
      pagination: null,
    };
  }
}

// api/jikan.ts
export async function fetchAnimeByCategory(
  category: "top" | "seasonal" | "genres" | "trending",
  page = 1,
  limit = 25,
  options?: { year?: number; season?: string; genreId?: number }
) {
  try {
    let url = "";

    switch (category) {
      case "top":
        url = `top/anime`;
        break;

      case "seasonal":
        if (options?.year && options?.season) {
          url = `seasons/${options.year}/${options.season}`;
        } else {
          url = `seasons/now`;
        }
        break;

      case "genres":
        if (!options?.genreId) throw new Error("genreId is required for genres");
        url = `genres/${options.genreId}/anime`;
        break;

      case "trending":
        url = `top/anime?filter=bypopularity`;
        break;

      default:
        throw new Error("Invalid category");
    }

    const res = await api.get(url, {
      params: { page, limit },
    });

    const animeList = res.data.data || [];
    const lastPage = res.data.pagination?.last_visible_page || 1;

    return { animeList, lastPage };
  } catch (error) {
    console.error(`Error fetching ${category} anime:`, error);
    return { animeList: [], lastPage: 1 };
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