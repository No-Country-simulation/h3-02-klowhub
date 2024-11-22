/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
// Import Video.js HLS plugin
import 'videojs-http-source-selector';
import 'videojs-contrib-eme';
import 'videojs-contrib-quality-levels';

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer = ({ src }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initPlayer = () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }

      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = videojs(videoElement, {
        controls: true,
        fluid: true,
        responsive: true,
        playbackRates: [0.5, 1, 1.5, 2],
        html5: {
          vhs: {
            fastQualityChange: true,
            useDevicePixelRatio: true,
            enableLowInitialPlaylist: true,
            smoothQualityChange: true,
            overrideNative: !videojs.browser.IS_SAFARI,
            maxPlaylistRetries: 3,
            bandwidth: 5000000,
          },
        },
        nativeAudioTracks: false,
        nativeVideoTracks: false,
      });

      // Add HLS source
      player.src({
        src: src,
        type: 'application/vnd.apple.mpegurl',
      });

      // Manejar errores
      player.on('error', function () {
        console.error('Video Error:', player.error());
      });

      player.on('loadedmetadata', () => {
        console.log('Video metadata loaded');
      });
      player.ready(() => {
        console.log('Player is ready');
      });

      playerRef.current = player;
    };

    initPlayer();
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src]);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
      <video
        ref={videoRef}
        className="video-js vjs-default-skin vjs-big-play-centered vjs-quality-button size-full"
      />
    </div>
  );
};

export default VideoPlayer;
