// https://stackoverflow.com/a/10019872/901944
// http://jsfiddle.net/rGL52/

function byte2Hex(n) {
  const nybHexString = '0123456789ABCDEF';
  return String(nybHexString.substr((n >> 4) & 0x0f, 1)) + nybHexString.substr(n & 0x0f, 1);
}

function RGB2Color(r, g, b) {
  return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

export default function palette(
  length,
  frequency1 = 2.4,
  frequency2 = 2.4,
  frequency3 = 2.4,
  phase1 = 0,
  phase2 = 2,
  phase3 = 4,
  center = 128,
  width = 127
) {
  const colors = [];
  if (length == null) length = 50;
  if (center == null) center = 128;
  if (width == null) width = 127;

  for (let i = 0; i < length; ++i) {
    const red = Math.sin(frequency1 * i + phase1) * width + center;
    const grn = Math.sin(frequency2 * i + phase2) * width + center;
    const blu = Math.sin(frequency3 * i + phase3) * width + center;
    colors.push(RGB2Color(red, grn, blu));
  }

  return colors;
}
