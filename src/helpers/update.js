import { arcPath, color } from '../constants';
import { arcTweenEnter, arcTweenExit, arcTweenUpdate } from './arcTween';
import { handleClick, handleMouseOut, handleMouseOver } from './eventHandlers';

const update = (data, legendGroup, legend, graph, pie, tip) => {
  //update color scale domain
  color.domain(data.map(item => item.name));

  legendGroup.call(legend);
  legendGroup.selectAll('text')
    .attr('fill', 'white');

  const path = graph.selectAll('path').data(pie(data));

  //handle exit
  path.exit()
    .transition()
    .duration(750)
    .attrTween('d', arcTweenExit)
    .remove();

  //handle DOM updates
  path.attr('d', arcPath)
    .transition().duration(750)
    .attrTween('d', arcTweenUpdate);

  path.enter().append('path')
    .attr('class', 'arc')
    .attr('d', arcPath)
    .attr('stroke', '#ffffff')
    .attr('stroke-width', 3)
    .attr('fill', d => color(d.data.name))
    .each(function(d) {
      this._current = d;
    })
    .transition().duration(750)
    .attrTween('d', arcTweenEnter);

  graph.selectAll('path')
    .on('mouseover', (data, index, selection) => {
      tip.show(data, selection[index]);
      handleMouseOver(data, index, selection);
    })
    .on('mouseout', (data, index, selection) => {
      tip.hide();
      handleMouseOut(data, index, selection);
    })
    .on('click', handleClick);
};

export default update;
