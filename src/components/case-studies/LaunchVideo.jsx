import { useState } from "react";
import { Play } from "lucide-react";
import { LAUNCH_YOUTUBE_ID } from "../../data/caseStudies.js";

const LaunchVideo = ({ youtubeId = LAUNCH_YOUTUBE_ID }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="launch-player">
      {playing ? (
        <div className="video-embed">
          <iframe
            title="SocioHood launch video"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <button
          type="button"
          aria-label="Play SocioHood launch video"
          onClick={() => setPlaying(true)}
        >
          <img
            src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
            alt="SocioHood launch video thumbnail"
          />
          <span className="play-circle">
            <Play size={24} fill="currentColor" />
          </span>
          <span className="video-caption">
            SOCIOHOOD × TATA MOTORS
            <br />
            <b>Watch the product launch</b>
          </span>
        </button>
      )}
    </div>
  );
};

export default LaunchVideo;
