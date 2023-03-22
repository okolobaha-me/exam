export const useGeodesy = (rc) => {
  const setRc = (newRc) => {
    rc = newRc;
  };

  const OGZ = (x, y, am, d) => {
    const dk = amToDk(Number(am));
    const dx = Math.round(Number(d) * Math.cos((dk * Math.PI) / 180));
    const dy = Math.round(Number(d) * Math.sin((dk * Math.PI) / 180));

    return { x: x + dx, y: y + dy };
  };

  const amToDk = (am) => am + rc;

  return [OGZ, setRc, rc];
};
