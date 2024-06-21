"use client";
import { CompleteSong } from "@web/lib/db/schema/songs";
import { trpc } from "@web/lib/trpc/client";
import SongModal from "./SongModal";

export default function SongList({ songs }: { songs: CompleteSong[] }) {
  const { data: s } = trpc.songs.getSongs.useQuery(undefined, {
    initialData: { songs },
    refetchOnMount: false,
  });

  if (s.songs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.songs.map((song) => (
        <Song song={song} key={song.id} />
      ))}
    </ul>
  );
}

const Song = ({ song }: { song: CompleteSong }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{song.url}</div>
      </div>
      <SongModal song={song} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No songs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new song.
      </p>
      <div className="mt-6">
        <SongModal emptyState={true} />
      </div>
    </div>
  );
};
