import { useState, useEffect } from "react";
import { BookOpen, RefreshCw } from "lucide-react";
import { BlurFadeText } from "./partials/blurfade";

interface Verse {
  text: string;
  reference: string;
}

export default function Verses() {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Generate a consistent verse index based on the day of the year
  const getDailyVerseIndex = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear;
  };

  const fetchVerse = async () => {
    setLoading(true);
    setError(null);

    try {
      // Using Bible API (bible-api.com) - free and no authentication required
      const dailyIndex = getDailyVerseIndex();

      // Array of popular verses that rotate daily
      const verses = [
        "john 3:16",
        "philippians 4:13",
        "jeremiah 29:11",
        "romans 8:28",
        "proverbs 3:5-6",
        "matthew 6:33",
        "isaiah 41:10",
        "psalm 23:1-4",
        "joshua 1:9",
        "romans 12:2",
        "galatians 5:22-23",
        "ephesians 2:8-9",
        "1 corinthians 13:4-7",
        "matthew 5:14-16",
        "psalm 46:1",
        "proverbs 16:3",
        "james 1:2-4",
        "colossians 3:23",
        "2 timothy 1:7",
        "hebrews 11:1"
      ];

      const verseRef = verses[dailyIndex % verses.length];
      const response = await fetch(`https://bible-api.com/${verseRef}`);

      if (!response.ok) {
        throw new Error("Failed to fetch verse");
      }

      const data = await response.json();
      setVerse({
        text: data.text.trim() as string,
        reference: data.reference
      });
    } catch (err) {
      setError("Unable to load verse. Please try again.");
      console.error("Error fetching verse:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerse();
  }, []);

  return (
    <div>
         <h1 className="mb-6 text-center animate-fade-in pt-20">
          <BlurFadeText title="Verse of the day" subtitle="Here are some verse thats makes your day" />
        </h1>
      <div className="min-h-screen flex items-center justify-center ">
       
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
          {/* Left Column */}
          <div className="md:col-span-1 flex flex-col items-center justify-center text-center p-6 rounded-2xl  shadow-lg">
            <img
              className="rounded-2xl"
              src="https://images.pexels.com/photos/1615776/pexels-photo-1615776.jpeg"
              alt=""
            />
          </div>

          {/* Right Column */}
          <div className="md:col-span-2  p-8 md:p-12">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-200">
                  Daily Verse
                </h1>
              </div>
              <button
                onClick={fetchVerse}
                disabled={loading}
                className="p-2 rounded-full hover:bg-indigo-800 transition-colors disabled:opacity-50"
                title="Refresh verse"
              >
                <RefreshCw
                  className={`w-5 h-5 text-indigo-400 ${
                    loading ? "animate-spin" : ""
                  }`}
                />
              </button>
            </div>

            {/* Content */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-12 h-12 border-4 border-indigo-300 border-t-indigo-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-400">Loading today's verse...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={fetchVerse}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : verse ? (
              <div className="space-y-6">
                <blockquote className="text-xl md:text-2xl text-gray-300 leading-relaxed font-serif italic border-l-4 border-indigo-400 pl-6">
                  "{verse?.text}"
                </blockquote>
                <p className="text-right text-lg font-semibold text-indigo-400">
                  — {verse?.reference}
                </p>
                <div className="pt-6 border-t border-indigo-800">
                  <p className="text-sm text-gray-400 text-center">
                    This verse updates daily. Come back tomorrow for a new one!
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
