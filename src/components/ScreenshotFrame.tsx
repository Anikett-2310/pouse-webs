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
  width?: number;
  height?: number;
}

const VARIANTS: Record<string, { srcSet: string; defaultWidth: number; defaultHeight: number }> = {
  'touchpad-mode': {
    srcSet: '/media/touchpad-mode-360w.webp 360w, /media/touchpad-mode-540w.webp 540w, /media/touchpad-mode-720w.webp 720w',
    defaultWidth: 720,
    defaultHeight: 1600,
  },
  'motion-mode': {
    srcSet: '/media/motion-mode-360w.webp 360w, /media/motion-mode-540w.webp 540w, /media/motion-mode-720w.webp 720w',
    defaultWidth: 720,
    defaultHeight: 1600,
  },
  'touchless-mode': {
    srcSet: '/media/touchless-mode-360w.webp 360w, /media/touchless-mode-540w.webp 540w, /media/touchless-mode-720w.webp 720w',
    defaultWidth: 720,
    defaultHeight: 1600,
  },
  'gaming-mode': {
    srcSet: '/media/gaming-mode-360w.webp 360w, /media/gaming-mode-540w.webp 540w, /media/gaming-mode-720w.webp 720w',
    defaultWidth: 720,
    defaultHeight: 324,
  },
  'remote-screen': {
    srcSet: '/media/remote-screen-360w.webp 360w, /media/remote-screen-540w.webp 540w, /media/remote-screen-720w.webp 720w',
    defaultWidth: 720,
    defaultHeight: 1600,
  },
  'connect-qr': {
    srcSet: '/media/connect-qr-360w.webp 360w, /media/connect-qr-540w.webp 540w, /media/connect-qr-720w.webp 720w',
    defaultWidth: 720,
    defaultHeight: 1600,
  },
  'bluetooth-discovery': {
    srcSet: '/media/bluetooth-discovery-360w.webp 360w, /media/bluetooth-discovery-540w.webp 540w, /media/bluetooth-discovery-720w.webp 720w',
    defaultWidth: 720,
    defaultHeight: 1600,
  },
  'pc-tray-menu': {
    srcSet: '/media/pc-tray-menu-360w.webp 360w, /media/pc-tray-menu-550w.webp 550w',
    defaultWidth: 550,
    defaultHeight: 380,
  },
  'pc-preferences': {
    srcSet: '/media/pc-preferences-640w.webp 640w, /media/pc-preferences-960w.webp 960w',
    defaultWidth: 960,
    defaultHeight: 680,
  },
  'hero-phone': {
    srcSet: '/media/hero-phone-360w.webp 360w, /media/hero-phone-540w.webp 540w, /media/hero-phone-720w.webp 720w',
    defaultWidth: 720,
    defaultHeight: 1600,
  },
  'utilities-dock': {
    srcSet: '/media/utilities-dock-360w.webp 360w, /media/utilities-dock-540w.webp 540w, /media/utilities-dock-720w.webp 720w',
    defaultWidth: 720,
    defaultHeight: 1600,
  },
};

export default function ScreenshotFrame({
  name,
  alt,
  isLandscape = false,
  className = '',
  width,
  height,
}: ScreenshotFrameProps) {
  const variant = VARIANTS[name];
  const src = `/media/${name}.webp`;
  const landscape = isLandscape || name === 'gaming-mode' || name === 'pc-preferences' || name === 'pc-tray-menu';
  const imgWidth = width || variant?.defaultWidth || 720;
  const imgHeight = height || variant?.defaultHeight || (landscape ? 405 : 1600);

  return (
    <div className={`phone-frame ${landscape ? 'landscape' : ''} ${className}`}>
      <img
        src={src}
        srcSet={variant?.srcSet}
        sizes={landscape ? '(max-width: 860px) 100vw, 480px' : '(max-width: 860px) 100vw, 360px'}
        alt={alt}
        width={imgWidth}
        height={imgHeight}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
