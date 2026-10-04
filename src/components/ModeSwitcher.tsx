'use client';

import { useState } from 'react';
import ScreenshotFrame from './ScreenshotFrame';

interface ModeInfo {
  id: string;
  name: string;
  fontClass: string;
  hue: string;
  description: string;
  screenshotName:
    | 'touchpad-mode'
    | 'motion-mode'
    | 'touchless-mode'
    | 'gaming-mode'
    | 'remote-screen';
  isLandscape?: boolean;
}

const MODES: ModeInfo[] = [
  {
    id: 'touchpad',
    name: 'Touchpad',
    fontClass: 'f0',
    hue: '#8b5cf6',
    description:
      'Eighty-five percent precision surface, fifteen percent scroll strip. Drag, tap, scroll with two fingers, pinch to zoom.',
    screenshotName: 'touchpad-mode',
  },
  {
    id: 'motion',
    name: 'Motion',
    fontClass: 'f1',
    hue: '#22d3ee',
    description:
      'Hold the centre button and tilt. The accelerometer and gyroscope steer the cursor, handy for presentations.',
    screenshotName: 'motion-mode',
  },
  {
    id: 'touchless',
    name: 'Touchless',
    fontClass: 'f2',
    hue: '#fb7185',
    description:
      'The front camera tracks your hand. Move it to aim, pinch to click. Nothing to touch.',
    screenshotName: 'touchless-mode',
  },
  {
    id: 'gaming',
    name: 'Gaming',
    fontClass: 'f3',
    hue: '#fbbf24',
    description:
      'A virtual analog stick, D-pad and action buttons, on Wi-Fi or Bluetooth.',
    screenshotName: 'gaming-mode',
    isLandscape: true,
  },
  {
    id: 'remote-screen',
    name: 'Remote Screen',
    fontClass: 'f4',
    hue: '#34d399',
    description:
      'Your Windows desktop on the phone at up to 60 FPS. Touch it and the PC answers.',
    screenshotName: 'remote-screen',
  },
];

interface ModeSwitcherProps {
  initialIndex?: number;
}

export default function ModeSwitcher({ initialIndex = 0 }: ModeSwitcherProps) {
  const [selectedIdx, setSelectedIdx] = useState(initialIndex);
  const currentMode = MODES[selectedIdx];

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    document.documentElement.style.setProperty('--hue', MODES[idx].hue);
  };

  return (
    <div
      className="modes"
      style={{ '--hue': currentMode.hue } as React.CSSProperties}
    >
      <div className="list" role="tablist" aria-label="Input modes">
        {MODES.map((mode, idx) => {
          const isSelected = selectedIdx === idx;
          return (
            <button
              key={mode.id}
              role="tab"
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => handleSelect(idx)}
              onMouseEnter={() => handleSelect(idx)}
              onFocus={() => handleSelect(idx)}
              style={
                isSelected
                  ? ({ '--hue': mode.hue, color: 'var(--ink)' } as React.CSSProperties)
                  : undefined
              }
            >
              <span className={`nm ${mode.fontClass}`}>{mode.name}</span>
              <span className="ds">{mode.description}</span>
            </button>
          );
        })}
      </div>

      <figure className="stage" id="stage" aria-label={`${currentMode.name} mode preview`}>
        <div
          key={currentMode.id}
          className={`shot-wrap ${currentMode.isLandscape ? 'landscape' : ''}`}
        >
          <ScreenshotFrame
            name={currentMode.screenshotName}
            alt={`Pouse ${currentMode.name} mode on smartphone screen`}
            isLandscape={currentMode.isLandscape}
          />
        </div>
      </figure>
    </div>
  );
}
