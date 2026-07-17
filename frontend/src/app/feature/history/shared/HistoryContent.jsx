import { Play, History as HistoryIcon, Trash2 } from 'lucide-react';
import { useHistory } from '../hooks/useHistory.js';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { playSong } from '../../song/song.slice.js';
import HistoryLoader from "../../../components/loader/HistoryLoader.jsx"

// "9:42 PM" jaisa time dikhane ke liye
const formatTime = (dateStr) => {
  return new Date(dateStr).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
};

// "Today", "Yesterday", ya normal date string return karta hai
const getDateLabel = (dateStr) => {
  const playedDate = new Date(dateStr).toDateString();   // e.g. "Wed Jul 15 2026"
  const today = new Date().toDateString();

  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = yesterdayDate.toDateString();

  if (playedDate === today) return "Today";
  if (playedDate === yesterday) return "Yesterday";

  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); // e.g. "Jul 10"
};

// history array ko date-label ke hisaab se group karta hai
const groupByDate = (historyItems) => {
  const groups = {};

  historyItems.forEach((item) => {
    const label = getDateLabel(item.playedAt);
    if (!groups[label]) groups[label] = [];
    groups[label].push(item);
  });

  return groups; // e.g. { Today: [...], Yesterday: [...], "Jul 10": [...] }
};

export default function HistoryContent() {
  const dispatch = useDispatch();
  const { handleGetHistory } = useHistory();
  const { history , loading } = useSelector((state) => state.history);

  useEffect(() => {
    handleGetHistory();
  }, [handleGetHistory]);

  if(loading) return <HistoryLoader />

  const handlePlaySong = (song) => {
    const songsOnly = history.map((h) => h.song);
    dispatch(playSong({ song: song.song, list: songsOnly }));
  };

  const groups = history ? groupByDate(history) : {};

  return (
    <main className="flex-1 bg-[#0a0f24] border border-purple-900/40 rounded-2xl p-6 overflow-y-auto h-full text-slate-300 flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <HistoryIcon className="w-5 h-5 text-purple-400" />
          <h1 className="text-base font-bold text-white tracking-wide">Listening History</h1>
        </div>
      </div>

      {/* Grouped list */}
      <div className="flex flex-col gap-6">
        {Object.keys(groups).length === 0 && (
          <p className="text-sm text-slate-500 text-center mt-10">No listening history yet.</p>
        )}

        {Object.entries(groups).map(([label, songs]) => (
          <div key={label}>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">{label}</h2>
            <div className="flex flex-col gap-2">
              {songs.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between bg-[#0f1636] border border-purple-950/60 hover:border-purple-500/40 rounded-xl px-5 py-3 transition-all group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <button
                      onClick={() => handlePlaySong(item)}
                      className="bg-purple-900/30 border border-purple-500/20 text-purple-400 p-1.5 rounded-full hover:bg-purple-500 hover:text-white transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {item.song?.songTitle || item.song?.title}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {item.song?.artist?.stageName || (typeof item.song?.artist === 'string' ? item.song.artist : 'Unknown Artist')}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 shrink-0">{formatTime(item.playedAt)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}