import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
// Import Video.js HLS plugin
import 'videojs-contrib-quality-levels';
import 'videojs-http-source-selector';

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer = ({ src }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<ReturnType<typeof videojs> | null>(null);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      playerRef.current = videojs(videoElement, {
        controls: true,
        fluid: true,
        responsive: true,
        html5: {
          hls: {
            enableLowInitialPlaylist: true,
            smoothQualityChange: true,
            overrideNative: true,
          },
        },
      });

      // Add HLS source
      playerRef.current.src({
        src: src,
        type: 'application/x-mpegURL',
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-lg bg-black">
      <video ref={videoRef} className="video-js vjs-default-skin vjs-big-play-centered" />
    </div>
  );
};

export default VideoPlayer;
