import deepEqual from './deepEqual';
import isNear from './isNear';

const KM_RADIUS = 0.01;

export default getPlaceVisited = (pointToBeCheck, places) => {
  const placeFiltered = places.filter((place) => {
    return isNear(pointToBeCheck, place, KM_RADIUS);
  });
  if (placeFiltered.length === 1 && placeFiltered[0]) {
    return {id: placeFiltered[0].id, isVisited: true};
  }
  return {id: null, isVisited: false};
};
