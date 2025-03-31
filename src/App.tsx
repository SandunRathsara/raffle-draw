import { useState, useEffect, useCallback, useRef } from 'react';
import { Trophy, History, Trash2 } from 'lucide-react';

interface WinRecord {
  number: string;
  timestamp: number;
}

function App() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [displayNumber, setDisplayNumber] = useState('0000');
  const [winningNumber, setWinningNumber] = useState<string | null>(null);
  const [winHistory, setWinHistory] = useState<WinRecord[]>([]);
  const [title, setTitle] = useState('Number Raffle Draw');
  const [maxNumber, setMaxNumber] = useState(5000);
  const tickingAudioRef = useRef<HTMLAudioElement | null>(null);
  const winnerAudioRef = useRef<HTMLAudioElement | null>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('raffleWinHistory');
    if (savedHistory) {
      setWinHistory(JSON.parse(savedHistory));
    }

    // Get title from URL query parameter
    const params = new URLSearchParams(window.location.search);
    const displayTitle = params.get('displayTitle');
    if (displayTitle) {
      setTitle(displayTitle);
    }

    // Get max number from URL query parameter
    const maxParam = params.get('maxNumber');
    if (maxParam && !isNaN(parseInt(maxParam))) {
      setMaxNumber(parseInt(maxParam));
    }
  }, []);

  const generateRandomNumber = useCallback(() => {
    let newNumber: string;
    do {
      newNumber = Math.floor(Math.random() * maxNumber).toString().padStart(4, '0');
      // Keep generating new numbers until we find one that's not in history
    } while (winHistory.some(record => record.number === newNumber));
    return newNumber;
  }, [winHistory, maxNumber]);

  const animateNumbers = useCallback(() => {
    if (!isDrawing) return;

    // Start playing ticking sound
    if (tickingAudioRef.current) {
      tickingAudioRef.current.currentTime = 0;
      tickingAudioRef.current.play();
      tickingAudioRef.current.loop = true;
    }

    const interval = setInterval(() => {
      setDisplayNumber(Math.floor(Math.random() * maxNumber).toString().padStart(4, '0'));
    }, 50);

    // Stop after 3 seconds and show winning number
    setTimeout(() => {
      clearInterval(interval);
      const finalNumber = generateRandomNumber();
      setDisplayNumber(finalNumber);
      setWinningNumber(finalNumber);
      setIsDrawing(false);

      // Add to history (no need to check for duplicates here as generateRandomNumber already ensures uniqueness)
      const newRecord: WinRecord = {
        number: finalNumber,
        timestamp: Date.now()
      };
      const updatedHistory = [newRecord, ...winHistory]; // Remove the slice limit to keep all records
      setWinHistory(updatedHistory);
      localStorage.setItem('raffleWinHistory', JSON.stringify(updatedHistory));

      // Stop ticking sound and play winner sound
      if (tickingAudioRef.current) {
        tickingAudioRef.current.pause();
        tickingAudioRef.current.currentTime = 0;
      }
      if (winnerAudioRef.current) {
        winnerAudioRef.current.currentTime = 0;
        winnerAudioRef.current.play();
      }
    }, 3000);

    return () => {
      clearInterval(interval);
      if (tickingAudioRef.current) {
        tickingAudioRef.current.pause();
        tickingAudioRef.current.currentTime = 0;
      }
    };
  }, [isDrawing, generateRandomNumber, winHistory, maxNumber]);

  useEffect(() => {
    if (isDrawing) {
      animateNumbers();
    }
  }, [isDrawing, animateNumbers]);

  const startDraw = () => {
    setIsDrawing(true);
    setWinningNumber(null);
  };

  const clearHistory = () => {
    setWinHistory([]);
    localStorage.removeItem('raffleWinHistory');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-8 w-full max-w-4xl shadow-2xl flex flex-col lg:flex-row gap-6 lg:gap-8" style={{
        WebkitBackdropFilter: "inherit"
      }}>
        {/* Main Raffle Section */}
        <div className="flex-1">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 lg:mb-8">
              {title}
            </h1>

            <div className="relative mb-6 lg:mb-8">
              <div className="bg-white/5 rounded-xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm" style={{
                WebkitBackdropFilter: "inherit"
              }}>
                <div className={`text-5xl sm:text-6xl lg:text-7xl font-mono font-bold tracking-wider ${isDrawing ? 'text-yellow-300' : winningNumber ? 'text-green-400' : 'text-white'
                  } transition-colors duration-200`}>
                  {displayNumber}
                </div>

                {winningNumber && (
                  <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 text-yellow-300">
                    <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-lg sm:text-xl">Winner!</span>
                  </div>
                )}
              </div>

              {isDrawing && (
                <div className="absolute inset-0 bg-white/5 animate-pulse rounded-xl" />
              )}
            </div>

            <button
              onClick={startDraw}
              disabled={isDrawing}
              className={`
                w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-semibold rounded-lg
                ${isDrawing
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 transform hover:scale-105'
                }
                transition-all duration-200 shadow-lg
              `}
            >
              {isDrawing ? 'Drawing...' : 'Start Draw'}
            </button>
          </div>
        </div>

        {/* History Section */}
        <div className="lg:w-64 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-white">
              <History className="w-5 h-5" />
              <h2 className="text-xl font-semibold">History</h2>
            </div>
            {winHistory.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-red-400 hover:text-red-300 transition-colors"
                title="Clear History"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[300px] lg:max-h-[500px] pr-2 custom-scrollbar">
            {winHistory.length === 0 ? (
              <p className="text-white/50 text-sm">No previous draws</p>
            ) : (
              winHistory.map((record) => (
                <div
                  key={record.timestamp}
                  className="bg-white/5 rounded-lg p-3 text-white"
                >
                  <div className="text-xl sm:text-2xl font-mono font-bold text-yellow-300">
                    {record.number}
                  </div>
                  <div className="text-xs text-white/50 mt-1">
                    {new Date(record.timestamp).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Audio elements */}
      <audio
        ref={tickingAudioRef}
        src="https://assets.mixkit.co/active_storage/sfx/689/689-preview.mp3"
        preload="auto"
      />
      <audio
        ref={winnerAudioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2285/2285-preview.mp3"
        preload="auto"
      />
    </div>
  );
}

export default App;