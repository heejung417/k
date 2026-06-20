import { useEffect } from "react";
import useStore from "../store/store";

export default function Page() {
  const {
    games,
    selectedGame,
    keyword,
    loading,
    setKeyword,
    fetchPopularGames,
    searchGames,
    fetchGameDetail,
  } = useStore();

  useEffect(() => {
    fetchPopularGames();
  }, []);

  return (
    <div className="min-h-screen bg-blue-100 p-6 text-gray-900">
      <h1 className="mb-3 text-3xl font-bold"> 🎮게임 도감</h1>

      <p className="mb-6">
        게임 이름을 검색하면 게임 정보와 상세 설명을 확인할 수 있어용!
      </p>

      <section className="mb-6 rounded-xl bg-white p-4 shadow-xl">
        <h2 className="mb-3 text-xl font-bold">🔍게임 검색</h2>

        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="게임 이름을 입력하세요"
          className="mr-2 rounded border px-3 py-2 border-blue-500 "
        />

        <button
          onClick={searchGames}
          className="mr-2 rounded-xl bg-blue-500 px-4 py-2 text-white font-bold hover:bg-blue-600"
        >
          검색
        </button>

        <button
          onClick={fetchPopularGames}
          className="rounded-xl bg-gray-700 px-4 py-2 text-white hover:bg-gray-800"
        >
          인기 게임 보기
        </button>
      </section>

      <section className="mb-6 rounded-xl bg-white p-4 shadow-xl">
        <h2 className="mb-3 text-xl font-bold">검색 상태</h2>
        <p>검색어: {keyword || "없음"}</p>
        <p>검색 결과 수: {games.length}개</p>
      </section>

      {selectedGame && (
        <section className="mb-6 rounded-lg bg-white p-4">
          <h2 className="mb-3 text-xl font-bold">게임 상세 정보</h2>

          {selectedGame.background_image && (
            <img
              src={selectedGame.background_image}
              alt={selectedGame.name}
              className="mb-3 w-72 rounded"
            />
          )}

          <h3 className="mb-2 text-2xl font-bold">{selectedGame.name}</h3>

          <p>⭐️평점: {selectedGame.rating || "정보 없음"}</p>
          <p>📆출시일: {selectedGame.released || "정보 없음"}</p>
          <p>메타크리틱: {selectedGame.metacritic || "정보 없음"}</p>
          <p>⏱️플레이타임: {selectedGame.playtime || "정보 없음"}시간</p>

          <div className="mt-3">
            <h4 className="font-bold">장르</h4>
            {selectedGame.genres && selectedGame.genres.length > 0 ? (
              selectedGame.genres.map((genre) => (
                <span key={genre.id} className="mr-2">
                  {genre.name}
                </span>
              ))
            ) : (
              <p>장르 정보 없음</p>
            )}
          </div>

          <div className="mt-3">
            <h4 className="font-bold">플랫폼</h4>
            {selectedGame.platforms && selectedGame.platforms.length > 0 ? (
              selectedGame.platforms.map((item) => (
                <span key={item.platform.id} className="mr-2">
                  {item.platform.name}
                </span>
              ))
            ) : (
              <p>플랫폼 정보 없음</p>
            )}
          </div>

          <div className="mt-3">
            <h4 className="font-bold">게임 설명</h4>
            <p>{selectedGame.description_raw || "상세 설명이 없습니다."}</p>
          </div>
        </section>
      )}

      <section className="rounded-lg bg-white p-4 ">
        <h2 className="mb-3 text-xl font-bold">게임 목록</h2>

        {loading ? (
          <p>게임 정보를 불러오는 중...</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <div key={game.id} className="rounded border p-3">
                <h3 className="mb-2 text-lg font-bold">{game.name}</h3>

                {game.background_image && (
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="mb-2 h-40 w-full rounded object-cover"
                  />
                )}

                <p>⭐️평점: {game.rating || "정보 없음"}</p>
                <p>📆출시일: {game.released || "정보 없음"}</p>

                <button
                  onClick={() => fetchGameDetail(game.id)}
                  className="mt-3 rounded bg-blue-500 px-3 py-2 hover:bg-blue-700 text-white"
                >
                  상세 정보 보기
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}