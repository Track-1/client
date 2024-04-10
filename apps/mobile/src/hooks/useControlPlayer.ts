import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export default function useControlPlayer(audio: HTMLAudioElement, playingState: boolean) {
  const playBar = useRef<HTMLDivElement>(null);

  const [barWidth, setBarWidth] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaybarHovered, setIsPlaybarHovered] = useState(false);
  const [down, setDown] = useState(false);

  function downMouse() {
    setDown(true);
  }

  function upMouse() {
    setDown(false);
  }

  function hoverPlaybar() {
    setIsPlaybarHovered(true);
  }

  function detachPlyabar() {
    upMouse();
    setIsPlaybarHovered(false);
  }

  function controlAudio(e: React.MouseEvent<HTMLDivElement>) {
    const barPercent = Math.round((e.nativeEvent.offsetX / barWidth) * 100);
    const currentStop = (audio.duration * barPercent) / 100;

    audio.currentTime = currentStop;
  }

  function moveAudio(e: React.MouseEvent<HTMLDivElement>) {
    if (!down) return;

    const mousePoint = Math.round((e.nativeEvent.offsetX / barWidth) * 100);
    const currentStop = (audio.duration * mousePoint) / 100;

    audio.currentTime = currentStop;
  }

  function createTimeText(time: number) {
    if (!audio.duration) return;

    const currentSecond = Math.round(time);
    const minute =
      parseInt(String(currentSecond / 60)) < 10
        ? `0${parseInt(String(currentSecond / 60))}`
        : `${parseInt(String(currentSecond / 60))}`;
    const second = currentSecond % 60 < 10 ? `0${currentSecond % 60}` : `${currentSecond % 60}`;

    return minute + ':' + second;
  }

  function goProgress() {
    if (!audio.duration) return;
    const currentDuration = (audio.currentTime / audio.duration) * 100;
    setProgress(currentDuration);
  }

  useLayoutEffect(() => {
    playBar.current && setBarWidth(playBar.current.offsetWidth);
  });

  useEffect(() => {
    if (playingState) {
      audio.addEventListener('timeupdate', () => {
        goProgress();
      });
    } else {
      audio.removeEventListener('timeupdate', () => {
        goProgress();
      });
    }
  }, [playingState]);

  return {
    progress,
    isPlaybarHovered,
    playBar,
    currentTimeText: createTimeText(Math.round(audio.currentTime)),
    totalTimetext: createTimeText(Math.round(audio.duration)),
    controlAudio,
    downMouse,
    upMouse,
    moveAudio,
    hoverPlaybar,
    detachPlyabar,
  };
}
