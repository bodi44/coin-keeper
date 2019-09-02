import * as d3 from 'd3';

export const dimensions = {
  height: 300,
  width: 300,
  radius: 150,
};
export const center = {
  x: dimensions.width / 2 + 5,
  y: dimensions.height / 2 + 5,
};

export const arcPath = d3.arc()
  .outerRadius(dimensions.radius)
  .innerRadius(dimensions.radius / 2);

export const color = d3.scaleOrdinal(d3['schemeSet3']);
