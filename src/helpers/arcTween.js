import * as d3 from "d3";

import { arcPath } from '../constants';

export const arcTweenEnter = data => {
  let i = d3.interpolate(data.endAngle, data.startAngle);
  return t => {
    data.startAngle = i(t);
    return arcPath(data);
  };
};

export const arcTweenExit = data => {
  let i = d3.interpolate(data.startAngle, data.endAngle);
  return t => {
    data.startAngle = i(t);
    return arcPath(data);
  };
};

export function arcTweenUpdate(d) {
  let i = d3.interpolate(this._current, d);
  this._current = d;

  return t => arcPath(i(t));
}
