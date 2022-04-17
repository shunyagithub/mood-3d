import { useEffect, useRef } from 'react';

export function useKeyPress(target, event) {
  useEffect(() => {
    const downHandler = ({ key }) => target.indexOf(key) !== -1 && event(true);
    const upHandler = ({ key }) => target.indexOf(key) !== -1 && event(false);
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);
}

export function useKeySquence(target) {
  const sequence = [];
  const downHandler = ({ key }) => {
    sequence.push(key);
    console.log(sequence);
    console.log(sequence.join('').includes(target));
  };
  window.addEventListener('keydown', downHandler);

  if (sequence.join('').includes(target)) {
    return true;
  }

  return false;
}

export function useControls() {
  const keys = useRef({
    keyM: false,
    keyO: false,
    keyD: false,
  });
  useKeyPress(['m'], (pressed) => (keys.current.keyM = pressed));
  useKeyPress(['o'], (pressed) => (keys.current.keyO = pressed));
  useKeyPress(['d'], (pressed) => (keys.current.keyD = pressed));
  return keys;
}
