import * as d3 from 'd3';
import { color } from '../constants';
import {db} from '../firebaseConfig';

export const handleMouseOver = (data, index, selection) => {
  d3.select(selection[index])
    .transition('changeSliceFill').duration(300)
    .attr('fill', '#ffffff');
};

export const handleMouseOut = (data, index, selection) => {
  d3.select(selection[index])
    .transition('changeSliceFill').duration(300)
    .attr('fill', color(data.data.name));
};

export const handleClick = (data) => {
  db.collection('expenses').doc(data.data.id).delete();
};
