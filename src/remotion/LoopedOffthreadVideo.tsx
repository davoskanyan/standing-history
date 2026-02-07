import { Loop, OffthreadVideo, useVideoConfig } from "remotion";

export const LoopedOffthreadVideo: React.FC<{
  durationInSeconds: number | null;
  src: string;
}> = ({ durationInSeconds, src }) => {
  const { fps } = useVideoConfig();

  if (durationInSeconds === null) {
    return null;
  }

  return (
    <Loop durationInFrames={Math.floor(fps * durationInSeconds)}>
      <OffthreadVideo src={src} />
    </Loop>
  );
};
