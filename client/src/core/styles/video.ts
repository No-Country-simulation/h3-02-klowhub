export const videPlayerStyles = `
      /* Custom Video.js theme*/
      .video-js {
        font-family: var(--font-inter), -apple-system, sans-serif;
      }


      /* Control bar styling */
      .video-js .vjs-control-bar {
        background: linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.1));
        height: 49px;
        padding-top: 3px;
        padding-inline: 1em;
        justify-content: flex-start;
        align-items: center;
      }

      /* Play Button styling */
      .video-js .vjs-big-play-button {
        background-color: rgb(179 177 222 / 10%);
        border: none;
        border-radius: 50%;
        width: 3em;
        height: 3em;
        line-height: 3em;
        left: 55%;
        top: 55%;
        transform: translate(-50%, -50%);
        transition: all 500ms ease-in-out;
      }


      /* Progress bar container styling */
      .video-js .vjs-progress-control {
        position: absolute;
        width: 100%;
        top: -0.45em;
        left: 0;
        height: 0.4em;
      }
      /* Progress bar holder styling */
      .video-js .vjs-progress-holder {
        height: 5px;
      }

      .video-js .vjs-progress-holder .vjs-play-progress:before {
        display: none;
      }
      .video-js .vjs-time-control {
        margin-inline-end: auto;
      }
      .video-js .vjs-remaining-time span {
        font-size: 1.5em;
        line-height: 35px;
        white-space: nowrap;
        color: #ddd;
      }
      .video-js .vjs-control-bar .vjs-button {
        width: 48px;
      }
      .video-js .vjs-button > .vjs-icon-placeholder:before {
        font-size: 2em;
        line-height: 35px;
      }`;

export const videoJSTranslations = {
  en: {
    Play: 'Play',
    Pause: 'Pause',
    'Current Time': 'Time played',
    'Duration Time': 'Total duration',
    'Playback Rate': 'Playback Rate',
    'Play Video': 'Play Video',
    'Picture-in-Picture': 'Mini player',
    Fullscreen: 'Fullscreen',
    Mute: 'Mute',
  },
  es: {
    Play: 'Reproducción',
    Pause: 'Pausa',
    'Current Time': 'Tiempo reproducido',
    'Duration Time': 'Duración total',
    'Remaining Time': 'Tiempo restante',
    'Playback Rate': 'Velocidad de reproducción',
    'Play Video': 'Reproducir vídeo',
    'Picture-in-Picture': 'Minireproductor',
    Fullscreen: 'Pantalla completa',
    Mute: 'Silenciar',
  },
};
