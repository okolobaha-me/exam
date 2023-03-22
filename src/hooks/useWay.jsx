import { v4 as getId } from "uuid";
import { useLocalStorage } from "./useLocalStorage";
import { useGeodesy } from "./useGeodesy";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const useWay = () => {
  const initialStart = {
    id: getId(),
    coordinates: { x: 64660, y: 13585 },
    measures: { am: "", d: "" },
  };
  //  hooks
  const [startPoint, setStartPoint] = useLocalStorage(
    "startPoint",
    initialStart
  );
  const [dots, setDots] = useLocalStorage("dotList", [startPoint]);
  const [OGZ, setRc, rc] = useGeodesy(9);

  // actions
  const addDotToList = (x, y) => {
    setDots((prev) => [
      ...prev,
      { id: getId(), measures: { am: "", d: "" }, coordinates: { x, y } },
    ]);
  };

  const reset = () => {
    setStartPoint(initialStart);
    setDots([startPoint]);
  };

  const handleAddDotClick = () => {
    const lastDot = dots[dots.length - 1];
    if (lastDot.measures.am === "" || !lastDot.measures.d) {
      toast("Enter Am and distance first!");
      return;
    }
    const {
      coordinates: { x: oldX, y: oldY },
      measures: { am, d },
    } = lastDot;
    const { x, y } = OGZ(oldX, oldY, am, d);
    addDotToList(x, y);
  };

  const handleMeasureChange = (key, obj, measure) => {
    const allowed = "0123456789";
    if (measure && !allowed.includes(measure[measure.length - 1])) return;

    setDots((prev) =>
      prev.map((el) => {
        if (el.id !== key) return el;

        el.measures = { ...el.measures, ...{ [obj]: measure } };
        return el;
      })
    );
  };

  const getChartData = () => {
    return dots.map(({ coordinates: { x: y, y: x } }) => ({ x, y }));
  };

  const getTargetLine = () => {
    const {
      coordinates: { x, y },
    } = dots[dots.length - 1];
    return [
      { x: y, y: x },
      { x: 13250, y: 65750 },
    ];
  };

  const recalculate = (index) => {
    for (let i = index; i < dots.length - 1; i++) {
      const dot = dots[i];
      const key = dots[i + 1].id;
      const {
        coordinates: { x, y },
        measures: { am, d },
      } = dot;
      const { x: newX, y: newY } = OGZ(x, y, am, d);

      setDots((prev) =>
        prev.map((el) => {
          if (el.id !== key) return el;
          el.coordinates = { x: newX, y: newY };
          return el;
        })
      );
    }
  };

  const handleChangeStartPoint = async (key, coordinate) => {
    setDots(
      (prev) =>
        prev.map((el, index) => {
          if (index > 0) return el;
          return {
            ...el,
            ...{
              coordinates: {
                ...el.coordinates,
                ...{ [key]: Number(coordinate) },
              },
            },
          };
        }),
      () => {
        console.log(dots);
      }
    );
  };

  useEffect(() => {
    recalculate(0);
  }, [dots]);

  return [
    getChartData,
    getTargetLine,
    dots,
    handleMeasureChange,
    handleAddDotClick,
    reset,
    recalculate,
    handleChangeStartPoint,
    startPoint,
  ];
};
