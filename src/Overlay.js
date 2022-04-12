import React from 'react';

export default function Overlay({ ready, clicked, setClicked }) {
  return (
    <>
      <div className={`fullscreen bg ${ready ? 'ready' : 'notready'} ${clicked && 'clicked'}`}>
        <div onClick={() => ready && setClicked(true)}>{!ready ? 'Loading...' : 'Click to continue'}</div>
      </div>
    </>
  );
}
