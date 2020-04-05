import { times, random } from 'lodash-es';

const goldenAngle = 137.508;

// based on https://stackoverflow.com/a/20129594/901944
function selectColor(i: number): string {
  const hue = i * goldenAngle;
  const saturation = ((i * goldenAngle) % 50) + 50;
  const brightness = ((i * goldenAngle) % 60) + 20;
  return `hsl(${hue},${saturation}%,${brightness}%)`;
}

export default function palette(count: number): string[] {
  const seed = random(100);
  return times(count, (i) => selectColor(i + seed));
}
