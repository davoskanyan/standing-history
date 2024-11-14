export const datesCount = 38;

export const framesForEachDate = 60;

export const getFramesCount = (datesCount: number) => datesCount * framesForEachDate;

export const getDateIndexOfFrame = (frame: number) => Math.floor(frame / framesForEachDate);