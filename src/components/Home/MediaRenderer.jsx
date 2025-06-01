"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { API_URL } from "../config";

const MediaRenderer = ({ media, className, onClick }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((error) => {
        console.error("Video play failed:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleVideoClick = (e) => {
    if (onClick && !e.target.classList.contains("video-control")) {
      onClick(e);
    }
  };

  const getMediaUrl = (url) => {
    if (!url) return `${API_URL}/static/images/Breakingnews.png`;
    if (url.startsWith("http")) return url;
    if (url.startsWith("/")) return `${API_URL}${url}`;
    return `${API_URL}/${url}`;
  };

  // No media
  if (!media || (Array.isArray(media) && media.length === 0)) {
    return (
      <div className={className} onClick={onClick} style={{ position: "relative" }}>
        <img
          src={getMediaUrl()}
          alt="Default News Image"
          loading="lazy"
          className="w-full h-full object-cover absolute inset-0"
          onError={() => setImageError(true)}
        />
        {imageError && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Image unavailable</span>
          </div>
        )}
      </div>
    );
  }

  const mediaItems = Array.isArray(media) ? media : [media];
  const firstMedia = mediaItems[0];

  if (
    firstMedia.type?.toLowerCase() === "video" ||
    firstMedia.media_url?.match(/\.(mp4|webm|ogg|mov)$/i)
  ) {
    return (
      <div className={`relative ${className}`} onClick={handleVideoClick}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onClick={(e) => e.stopPropagation()}
          onPlay={() => {
            setIsPlaying(true);
            setShowPlayButton(false);
          }}
          onPause={() => {
            setIsPlaying(false);
            setShowPlayButton(true);
          }}
          onError={() => {
            setShowPlayButton(false);
            console.error("Video failed to load");
          }}
          playsInline
          controls={false}
          preload="metadata"
          muted
        >
          <source
            src={getMediaUrl(firstMedia.media_url || firstMedia.url)}
            type={`video/${firstMedia.media_url?.split(".").pop() || "mp4"}`}
          />
          Your browser doesn't support videos
        </video>

        {showPlayButton && (
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 flex items-center justify-center video-control"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            <div className="w-12 h-12 bg-red-600/80 rounded-full flex items-center justify-center hover:bg-red-600 transition-all">
              <Play className={`w-6 h-6 text-white ${isPlaying ? "hidden" : "block"}`} />
            </div>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} onClick={onClick}>
      {!imageError ? (
        <img
          src={getMediaUrl(firstMedia.media_url || firstMedia.url)}
          alt={firstMedia.alt || "News Image"}
          loading="lazy"
          className="w-full h-full object-cover absolute inset-0"
          onError={() => setImageError(true)}
        />
      ) : (
        <img
          src={getMediaUrl()}
          alt="Fallback News Image"
          className="w-full h-full object-cover absolute inset-0"
        />
      )}
    </div>
  );
};

export default MediaRenderer;
