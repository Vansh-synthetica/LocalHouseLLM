import { useEffect, useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

type AutoFilmProps = {
  /** Trimmed, audio-free mp4. Catalog: the src assets "films" folders. */
  src: string;
  /** First frame of the film — shown before it loads and for reduced-motion users. */
  poster: string;
  className?: string;
  /** `metadata` for near-the-fold films, `none` for deep sections. */
  preload?: 'metadata' | 'none';
  /** Decorative by default; set false to give the film an audible-equivalent a11y label. */
  label?: string;
};

/**
 * A motion-graphic that behaves like part of the page: it autoplays muted, loops,
 * pauses while off-screen, shows its poster again for prefers-reduced-motion and
 * never grabs focus. React does not serialize `muted` during SSR, so the ref
 * force-mutes before play is attempted.
 */
export default function AutoFilm({ src, poster, className, preload = 'metadata', label }: AutoFilmProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: '180px 0px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    if (reduce) {
      video.pause();
      return;
    }
    if (inView) {
      const playing = video.play();
      if (playing && typeof playing.catch === 'function') {
        // Autoplay is blocked only if something force-zooms the page; poster stays as fallback.
        playing.catch(() => {});
      }
    } else {
      video.pause();
    }
  }, [inView, reduce]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload={preload}
      disablePictureInPicture
      tabIndex={-1}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
