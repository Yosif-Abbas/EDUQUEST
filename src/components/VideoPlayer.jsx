import { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Minimize,
  Settings,
  Maximize,
} from 'lucide-react';
import { PiSubtitlesSlashThin, PiSubtitlesThin } from 'react-icons/pi';

const VideoPlayer = ({ src, poster, subtitleSrc }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [bufferedProgress, setBufferedProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [idleTimeoutId, setIdleTimeoutId] = useState(null);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);

  useEffect(() => {
    videoRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
      setHasStarted(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleSubtitles = () => {
    setSubtitlesEnabled(!subtitlesEnabled);
    const track = videoRef.current.textTracks[0]; // Enable/disable first track
    track.mode = subtitlesEnabled ? 'hidden' : 'showing';
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? 1 : 0);
  };

  const handleProgress = () => {
    const video = videoRef.current;
    setCurrentTime(video.currentTime);
    setProgress((video.currentTime / video.duration) * 100);

    // Update buffered progress
    const buffered = video.buffered;
    if (buffered.length > 0) {
      const bufferedEnd = buffered.end(buffered.length - 1);
      const bufferedPercentage = (bufferedEnd / video.duration) * 100;
      setBufferedProgress(bufferedPercentage);
    }
  };

  const seek = (e) => {
    const video = videoRef.current;
    const seekTime = (e.target.value / 100) * video.duration;
    video.currentTime = seekTime;
    setProgress(e.target.value);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;

    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const handleMouseEnter = () => {
    // Clear any existing timeouts when the mouse enters
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    if (idleTimeoutId) {
      clearTimeout(idleTimeoutId); // Clear the idle timeout if the mouse moves
      setIdleTimeoutId(null);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // Set a timeout to hide the controls after a delay
    const id = setTimeout(() => {
      setIsHovered(false);
    }, 500); // 500ms delay before hiding controls
    setTimeoutId(id);
  };

  const handleMouseMove = () => {
    // Reset the idle timeout whenever the mouse moves
    if (idleTimeoutId) {
      clearTimeout(idleTimeoutId);
    }
    const id = setTimeout(() => {
      setIsHovered(false); // Hide the controls after 2 seconds of inactivity
    }, 2000); // 2000ms (2 seconds) idle timeout
    setIdleTimeoutId(id);

    // Reset the visibility of controls if the mouse is actively moving
    if (!isHovered) {
      setIsHovered(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto max-w-4xl overflow-hidden ${isFullscreen ? 'h-screen w-screen' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Video Element */}

      <video
        ref={videoRef}
        className="h-auto w-full object-cover"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleProgress}
        muted={isMuted}
        controls={false} // **Hides default browser controls**
      >
        <source src={src} type="video/mp4" />
        <track
          src={subtitleSrc} // Path to the subtitle file
          kind="subtitles"
          srcLang="en"
          label="English"
          default
        />
      </video>

      <div
        className={`absolute top-0 left-0 h-full w-full cursor-pointer bg-cover bg-center transition-opacity duration-300 ${
          hasStarted ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={togglePlay}
        style={{ backgroundImage: `url(${poster})` }}
      ></div>

      {/* Custom Controls */}
      <div
        className={`absolute right-0 bottom-0 left-0 flex flex-col space-y-2 px-6 pb-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} ${isFullscreen ? 'text-xl' : ''} `}
        onMouseEnter={() => {
          if (idleTimeoutId) {
            clearTimeout(idleTimeoutId);
          }
          setTimeoutId(null);
          setIsHovered(true);
        }}
      >
        {/* Progress Bar */}
        <input
          type="range"
          className="h-1 w-full cursor-pointer appearance-none [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-thumb]:pointer-events-none [&::-webkit-slider-thumb]:h-0 [&::-webkit-slider-thumb]:w-0 [&::-webkit-slider-thumb]:opacity-0"
          min="0"
          max="100"
          value={progress}
          onChange={seek}
          style={{
            background: `linear-gradient(to right, #ff6636 0%, #ff6636 ${progress}%, #fff ${progress}%, #fff ${bufferedProgress}%, #9e9e9e66 ${bufferedProgress}%, #9e9e9e66 100%)`,
          }}
        />

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between gap-x-6">
            {/* Play / Pause */}
            <button onClick={togglePlay} className="p-2 text-white">
              {isPlaying ? (
                <Pause size={isFullscreen ? 28 : 24} />
              ) : (
                <Play size={isFullscreen ? 28 : 24} />
              )}
            </button>

            {/* Time */}
            <span
              className={`${isFullscreen ? 'text-lg' : 'text-xs'} font-thin text-white`}
            >
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            {/* Volume */}
            <div className="flex items-center">
              <button onClick={toggleMute} className="p-2 text-white">
                {isMuted ? (
                  <VolumeX size={isFullscreen ? 28 : 24} />
                ) : (
                  <Volume2 size={isFullscreen ? 28 : 24} />
                )}
              </button>
              <input
                type="range"
                className="custom-slider h-1 w-24"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                style={{
                  background: `linear-gradient(to right, #ff6636 0%, #ff6636 ${volume * 100}%, white ${volume * 100}%, white 100%)`,
                }}
              />
            </div>
          </div>

          <div
            className={`flex items-center justify-between ${isFullscreen ? 'gap-x-8' : 'gap-x-4'}`}
          >
            {/* CC Button (Placeholder) */}
            <button className="p-2 text-white" onClick={toggleSubtitles}>
              <span className="text-white">
                {subtitlesEnabled ? (
                  <PiSubtitlesSlashThin size={isFullscreen ? 28 : 24} />
                ) : (
                  <PiSubtitlesThin size={isFullscreen ? 28 : 24} />
                )}
              </span>
            </button>

            {/* Settings */}
            <button className="p-2 text-white">
              <Settings size={isFullscreen ? 28 : 24} />
            </button>

            {/* Fullscreen Toggle */}
            <button onClick={toggleFullscreen} className="p-2 text-white">
              {isFullscreen ? (
                <Minimize size={isFullscreen ? 28 : 24} />
              ) : (
                <Maximize size={isFullscreen ? 28 : 24} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
