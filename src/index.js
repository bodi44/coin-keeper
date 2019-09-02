import * as d3 from 'd3';
import d3Tip from 'd3-tip';
import { legendColor } from 'd3-svg-legend';

import { center, color, dimensions } from './constants';
import update from './helpers/update';
import { db } from './firebaseConfig';

import './index.css';

const form = document.querySelector('form');
const name = document.querySelector('#name');
const cost = document.querySelector('#cost');
const error = document.querySelector('#error');

form.addEventListener('submit', event => {
  event.preventDefault();

  if (name.value && cost.value) {
    const item = {
      name: name.value,
      cost: parseInt(cost.value),
    };

    db.collection('expenses').add(item).then(resp => {
      error.textContent = '';
      name.value = '';
      cost.value = '';
    });
  } else {
    error.textContent = 'Please enter value before submit!';
  }
});

const svg = d3.select('.canvas')
  .append('svg')
  .attr('width', dimensions.width + 150)
  .attr('height', dimensions.height + 150);

const graph = svg.append('g')
  .attr('transform', `translate(${center.x}, ${center.y})`);

const pie = d3.pie().sort(null).value(d => d.cost);

const legendGroup = svg.append('g')
  .attr('transform', `translate(${dimensions.width + 40}, 10)`);

const legend = legendColor()
  .shape('circle')
  .shapePadding(10)
  .scale(color);

const tip = d3Tip()
  .attr('class', 'tip card')
  .html(d =>
    `<div class="name">${d.data.name}</div>
     <div class="cost">${d.data.cost}</div>
     <div class="delete">Click slice to delete</div>`);

graph.call(tip);

let data = [];

db.collection('expenses').onSnapshot(resp => {
  resp.docChanges().forEach(change => {
    const doc = { ...change.doc.data(), id: change.doc.id };

    switch (change.type) {
      case 'added':
        data.push(doc);
        break;
      case 'modified':
        const index = data.findIndex(item => item.id === doc.id);
        data[index] = doc;
        break;
      case 'removed':
        data = data.filter(item => item.id !== doc.id);
        break;
      default:
        break;
    }
  });

  update(data, legendGroup, legend, graph, pie, tip);
});
