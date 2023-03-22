export const useGeodesy = (rc) => {
  const setRc = (newRc) => {
    rc = newRc;
  };

  const pgz = (x, y, am, d) => {
    const dk = amToDk(Number(am));
    const dx = Math.round(Number(d) * Math.cos((dk * Math.PI) / 180));
    const dy = Math.round(Number(d) * Math.sin((dk * Math.PI) / 180));

    return { x: x + dx, y: y + dy };
  };

  const ogz = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const r = Math.round(Math.abs((Math.atan(dy / dx) * 180) / Math.PI));
    let angle = 0;
    if (dx >= 0 && dy >= 0) {
      angle = r;
    } else if (dx < 0 && dy >= 0) {
      angle = 180 - r;
    } else if (dx < 0 && dy < 0) {
      angle = r + 180;
    } else if (dx >= 0 && dy < 0) {
      angle = 360 - r;
    }
    const dist = Math.round(dx / Math.cos((angle * Math.PI) / 180));
    const dist2 = Math.round(dy / Math.sin((angle * Math.PI) / 180));
    angle -= rc;

    return { angle, dist: dist === 0 ? dist2 : dist };
  };

  const amToDk = (am) => am + rc;

  return [pgz, setRc, ogz, rc];
};
