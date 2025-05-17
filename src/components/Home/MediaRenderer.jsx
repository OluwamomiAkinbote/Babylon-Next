"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { API_URL } from "../config";

const MediaRenderer = ({ media, className, onClick }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);

  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVideoClick = (e) => {
    if (onClick && !e.target.classList.contains("video-control")) {
      onClick(e);
    }
  };

  // Helper function to construct media URLs
  const getMediaUrl = (url) => {
    if (!url) return `${API_URL}/static/images/Breakingnews.png`;
    return url.startsWith("http") ? url : `${API_URL}${url}`;
  };

  if (!media || (Array.isArray(media) && media.length === 0)) {
    return (
      <div className={className} onClick={onClick} style={{ position: "relative", width: "100%", height: "100%" }}>
        <Image
          src={getMediaUrl()}
          alt="Default News"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </div>
    );
  }

  const mediaItems = Array.isArray(media) ? media : [media];
  const firstMedia = mediaItems[0];

  if (firstMedia.type && firstMedia.type.toLowerCase() === "video") {
    return (
      <div className={`relative ${className}`} onClick={handleVideoClick} style={{ cursor: "pointer" }}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onClick={(e) => {
            e.stopPropagation();
            handlePlayClick(e);
          }}
          onPlay={() => {
            setIsPlaying(true);
            setShowPlayButton(false);
          }}
          onPause={() => {
            setIsPlaying(false);
            setShowPlayButton(true);
          }}
          playsInline
          controls={false} // hides default controls
          preload="metadata"
        >
          <source
            src={getMediaUrl(firstMedia.media_url)}
            type={`video/${firstMedia.media_url.split(".").pop()}`}
          />
          Your browser doesn't support videos
        </video>

        {showPlayButton && (
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 flex items-center justify-center video-control"
            aria-label="Play video"
            type="button"
          >
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <Play className="w-4 h-4 text-white fill-white" />
            </div>
          </button>
        )}
      </div>
    );
  }

  // For images, use next/image for optimization
  return (
    <div className={className} onClick={onClick} style={{ position: "relative", width: "100%", height: "100%" }}>
      <Image
        src={getMediaUrl(firstMedia.media_url)}
        alt="News Media"
        layout="fill"
        objectFit="cover"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = getMediaUrl();
        }}
        priority={true}
      />
    </div>
  );
};

export default MediaRenderer;
