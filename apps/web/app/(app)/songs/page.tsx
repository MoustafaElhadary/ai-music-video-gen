import SongList from "@web/components/songs/SongList";
import NewSongModal from "@web/components/songs/SongModal";
import { api } from "@web/lib/trpc/api";
import { checkAuth } from "@web/lib/auth/utils";

export default async function Songs() {
  await checkAuth();
  const { songs } = await api.songs.getSongs.query();

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Songs</h1>
        <NewSongModal />
      </div>
      <SongList songs={songs} />
    </main>
  );
}
