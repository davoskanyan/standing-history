import React from 'react';
import {Composition} from 'remotion';
import {MyComposition} from './Composition';
import {datesCount, getFramesCount} from "./utils";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Empty"
        component={MyComposition}
        durationInFrames={getFramesCount(datesCount)}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
