/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
// Import Video.js HLS plugin
import 'videojs-http-source-selector';
import type { Locale } from '@core/lib/i18nRouting';
import { cn } from '@core/lib/utils';
import { getVideoSourceType } from '@features/courses/service/getVideoSourceType';
import { videoJSTranslations, videPlayerStyles } from '@styles/video';

interface VideoPlayerProps {
  src: string;
  locale: Locale;
  activeLessonId?: string | number;
  poster?: string;
}

const VideoPlayer = ({ src, locale, poster }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initPlayer = (style: HTMLStyleElement) => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }

      const videoElement = videoRef.current;
      if (!videoElement) return;
      videojs.addLanguage(locale, videoJSTranslations[locale as keyof typeof videoJSTranslations]);

      style.textContent = videPlayerStyles;
      document.head.appendChild(style);
      const player = videojs(videoElement, {
        controls: true,
        fluid: true,
        responsive: true,
        language: locale,
        playbackRates: [0.5, 1, 1.5, 2],
        preload: 'auto',
        poster,
        html5: {
          vhs: {
            fastQualityChange: true,
            useDevicePixelRatio: true,
            enableLowInitialPlaylist: true,
            smoothQualityChange: true,
            overrideNative: !videojs.browser.IS_SAFARI,
            maxPlaylistRetries: 5,
            bandwidth: 5000000,
            backBufferLength: 30,
            limitRenditionByPlayerDimensions: true,
          },
        },
        nativeAudioTracks: false,
        nativeVideoTracks: false,
        useBandwidthFromLocalStorage: true,
        playsinline: true,
      });

      // Add HLS source
      const type = getVideoSourceType(src);
      console.log({ src, type });
      console.log('Src:', src);
      player.src({
        src: src,
        type,
      });

      // Manejar errores
      player.on('error', function () {
        const error = player.error();
        console.error('Video Error Full Details:', error);
        console.error('Error Code:', error?.code);
        console.error('Error Message:', error?.message);
      });

      player.on('loadedmetadata', () => {
        console.log('Video metadata loaded');
      });

      player.ready(() => {
        console.log('Player is ready');
      });
      playerRef.current = player;
    };
    const style = document.createElement('style');

    initPlayer(style);
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      }
    };
  }, [src, locale]);

  return (
    <div className="relative aspect-[12/6.5] w-full overflow-hidden rounded-lg bg-black">
      <video
        ref={videoRef}
        className={cn('video-js vjs-default-skin vjs-big-play-centered vjs-quality-button')}
      />
    </div>
  );
};

export default VideoPlayer;
