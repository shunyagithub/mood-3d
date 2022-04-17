import { useProgress } from '@react-three/drei';
import React from 'react';

export default function Overlay({ ready, clicked, setClicked }) {
  const { progress } = useProgress();
  const progressPercentage = progress.toFixed(1);

  return (
    <>
      <div className={`fullscreen bg ${ready ? 'ready' : 'notready'} ${clicked && 'clicked'}`}>
        <div onClick={() => ready && setClicked(true)}>
          {!ready ? `Loading ${progressPercentage}%` : 'Click to continue'}
        </div>
      </div>
    </>
  );
}
