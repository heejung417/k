import { create } from "zustand";
import axios from "axios";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const useStore = create((set, get) => ({
  games: [],
  selectedGame: null,
  keyword: "",
  loading: false,

  setKeyword: (keyword) => set({ keyword }),

  fetchPopularGames: async () => {
    set({ loading: true });

    try {
      const response = await axios.get("https://api.rawg.io/api/games", {
        params: {
          key: API_KEY,
          page_size: 20,
          ordering: "-rating",
        },
      });

      set({
        games: response.data.results,
        selectedGame: null,
      });
    } catch (error) {
      console.error(error);
      alert("게임을 불러오지 못했습니다.");
    } finally {
      set({ loading: false });
    }
  },

  searchGames: async () => {
    const keyword = get().keyword;

    if (!keyword.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }

    set({ loading: true });

    try {
      const response = await axios.get("https://api.rawg.io/api/games", {
        params: {
          key: API_KEY,
          search: keyword,
          page_size: 20,
        },
      });

      set({
        games: response.data.results,
        selectedGame: null,
      });
    } catch (error) {
      console.error(error);
      alert("검색 결과를 불러오지 못했습니다.");
    } finally {
      set({ loading: false });
    }
  },

  fetchGameDetail: async (id) => {
    set({ loading: true });

    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}`,
        {
          params: {
            key: API_KEY,
          },
        }
      );

      set({
        selectedGame: response.data,
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(error);
      alert("게임 상세 정보를 불러오지 못했습니다.");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useStore;