import React from 'react';

interface ScreenshotFrameProps {
  name:
    | 'touchpad-mode'
    | 'motion-mode'
    | 'touchless-mode'
    | 'gaming-mode'
    | 'remote-screen'
    | 'connect-qr'
    | 'bluetooth-discovery'
    | 'pc-tray-menu'
    | 'pc-preferences'
    | 'hero-phone'
    | 'utilities-dock';
  alt: string;
  isLandscape?: boolean;
  className?: string;
  priority?: boolean;
}

interface ImageMeta {
  width: number;
  height: number;
  srcSet: string;
}

const META: Record<string, ImageMeta> = {
  'touchpad-mode': {
    width: 540,
    height: 928,
    srcSet: '/media/touchpad-mode-360w.webp 360w, /media/touchpad-mode-540w.webp 540w, /media/touchpad-mode-720w.webp 720w',
  },
  'motion-mode': {
    width: 540,
    height: 928,
    srcSet: '/media/motion-mode-360w.webp 360w, /media/motion-mode-540w.webp 540w, /media/motion-mode-720w.webp 720w',
  },
  'touchless-mode': {
    width: 540,
    height: 906,
    srcSet: '/media/touchless-mode-360w.webp 360w, /media/touchless-mode-540w.webp 540w, /media/touchless-mode-720w.webp 720w',
  },
  'gaming-mode': {
    width: 540,
    height: 910,
    srcSet: '/media/gaming-mode-360w.webp 360w, /media/gaming-mode-540w.webp 540w, /media/gaming-mode-720w.webp 720w',
  },
  'remote-screen': {
    width: 540,
    height: 910,
    srcSet: '/media/remote-screen-360w.webp 360w, /media/remote-screen-540w.webp 540w, /media/remote-screen-720w.webp 720w',
  },
  'utilities-dock': {
    width: 540,
    height: 910,
    srcSet: '/media/utilities-dock-360w.webp 360w, /media/utilities-dock-540w.webp 540w, /media/utilities-dock-720w.webp 720w',
  },
  'connect-qr': {
    width: 540,
    height: 906,
    srcSet: '/media/connect-qr-360w.webp 360w, /media/connect-qr-540w.webp 540w, /media/connect-qr-720w.webp 720w',
  },
  'bluetooth-discovery': {
    width: 540,
    height: 906,
    srcSet: '/media/bluetooth-discovery-360w.webp 360w, /media/bluetooth-discovery-540w.webp 540w, /media/bluetooth-discovery-720w.webp 720w',
  },
  'hero-phone': {
    width: 540,
    height: 928,
    srcSet: '/media/hero-phone-360w.webp 360w, /media/hero-phone-540w.webp 540w, /media/hero-phone-720w.webp 720w',
  },
  'pc-tray-menu': {
    width: 550,
    height: 689,
    srcSet: '/media/pc-tray-menu-360w.webp 360w, /media/pc-tray-menu-550w.webp 550w',
  },
  'pc-preferences': {
    width: 960,
    height: 644,
    srcSet: '/media/pc-preferences-640w.webp 640w, /media/pc-preferences-960w.webp 960w',
  },
};

export default function ScreenshotFrame({
  name,
  alt,
  isLandscape = false,
  className = '',
  priority = false,
}: ScreenshotFrameProps) {
  const meta = META[name] || { width: 540, height: 928, srcSet: `/media/${name}.webp` };
  const landscape = isLandscape || name === 'pc-preferences' || name === 'pc-tray-menu';

  return (
    <div
      className={`phone-frame ${landscape ? 'landscape' : ''} ${className}`}
      style={{
        aspectRatio: `${meta.width} / ${meta.height}`,
      }}
    >
      <img
        src={`/media/${name}.webp`}
        srcSet={meta.srcSet}
        sizes={landscape ? '(max-width: 860px) 100vw, 520px' : '(max-width: 860px) 100vw, 320px'}
        alt={alt}
        width={meta.width}
        height={meta.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />
    </div>
  );
}
