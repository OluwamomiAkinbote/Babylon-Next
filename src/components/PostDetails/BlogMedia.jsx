import { ChevronLeft, ChevronRight } from 'lucide-react';
import { API_URL } from '../config';

const BlogMedia = ({ media, currentMediaIndex, onMediaChange }) => {
  const mediaItems = Array.isArray(media) && media.length > 0
    ? media
    : media && typeof media === 'object'
    ? [media]
    : [{
        type: 'image',
        media_url: `${API_URL}/static/images/Breakingnews.png`,
        caption: 'Breaking News',
      }];

  const current = mediaItems[currentMediaIndex];

  return (
    <div className="space-y-3">
      {/* Media Container - Sharp edges */}
      <div className="w-full border border-gray-200">
        {current.type === 'video' ? (
          <video
            src={current.media_url}
            controls
            className="w-full h-auto max-h-[600px] object-cover"
          />
        ) : (
          <img
            src={current.media_url}
            alt={current.caption || `Media ${currentMediaIndex + 1}`}
            className="w-full h-auto max-h-[600px] object-cover"
            loading="lazy"
          />
        )}
      </div>

      {/* Caption */}
      {current.caption && (
        <p className="text-center text-sm text-gray-700">
          {current.caption}
        </p>
      )}

      {/* Navigation - Circular gray buttons with thick black icons */}
      {mediaItems.length > 1 && (
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-gray-600">
            {currentMediaIndex + 1} of {mediaItems.length}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => onMediaChange(currentMediaIndex - 1)}
              disabled={currentMediaIndex === 0}
              className={`
                p-2 rounded-full bg-gray-100
                ${currentMediaIndex === 0 ? 'opacity-50' : 'hover:bg-gray-200'}
              `}
              aria-label="Previous media"
            >
              <ChevronLeft 
                className="w-5 h-5 stroke-[3px] text-gray-800" 
                absoluteStrokeWidth
              />
            </button>

            <button
              onClick={() => onMediaChange(currentMediaIndex + 1)}
              disabled={currentMediaIndex === mediaItems.length - 1}
              className={`
                p-2 rounded-full bg-gray-100
                ${currentMediaIndex === mediaItems.length - 1 ? 'opacity-50' : 'hover:bg-gray-200'}
              `}
              aria-label="Next media"
            >
              <ChevronRight 
                className="w-5 h-5 stroke-[3px] text-gray-800" 
                absoluteStrokeWidth
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogMedia;