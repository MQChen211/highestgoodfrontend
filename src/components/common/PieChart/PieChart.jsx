import { useEffect, useState } from 'react';
import * as d3 from 'd3/dist/d3.min';
import { CHART_RADIUS, CHART_SIZE } from './constants';
import { generateArrayOfUniqColors } from './colorsGenerator';
import './PieChart.css';

// eslint-disable-next-line import/prefer-default-export, react/function-component-definition
export const PieChart = ({ data, dataLegend, pieChartId, dataLegendHeader, darkMode }) => {
  const [totalHours, setTotalHours] = useState(0);

  // create the pie chart
  const getCreateSvgPie = totalValue => {
    const svg = d3
      .select(`#pie-chart-container-${pieChartId}`)
      .append('svg')
      .attr('id', `pie-chart-${pieChartId}`)
      .attr('width', CHART_SIZE)
      .attr('height', CHART_SIZE)
      .append('g')
      .attr('transform', `translate(${CHART_SIZE / 2},${CHART_SIZE / 2})`);

    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .style('fill', darkMode ? 'white' : 'black')
      .text(totalValue.toFixed(2));

    return svg;
  };

  const color = d3.scaleOrdinal().range(generateArrayOfUniqColors(Object.keys(data).length));

  const pie = d3.pie().value(d => d[1]);

  useEffect(() => {
    // eslint-disable-next-line camelcase
    const data_ready = pie(Object.entries(data));

    const totalValue = data_ready
      .map(obj => obj.value)
      .reduce((a, c) => {
        return a + c;
      },0);
    setTotalHours(totalValue);

    getCreateSvgPie(totalValue)
      .selectAll('whatever')
      .data(data_ready)
      .join('path')
      .attr(
        'd',
        d3
          .arc()
          .innerRadius(70)
          .outerRadius(CHART_RADIUS),
      )
      .attr('fill', d => color(d.data[0]))
      .style('opacity', 0.8);

    return () => {
      d3.select(`#pie-chart-${pieChartId}`).remove();
    };
  }, [data]);

  return (
    <div className={`pie-chart-wrapper ${darkMode ? 'text-light' : ''}`}>
      <div id={`pie-chart-container-${pieChartId}`} className="pie-chart" />
      <div>
        <div className="pie-chart-legend-header">
          <div>Name</div>
          <div>{dataLegendHeader}</div>
        </div>
        {Object.keys(dataLegend).map(key => (
          <div key={key} className="pie-chart-legend-item">
            <div className="data-legend-color" style={{ backgroundColor: color(key) }} />
            <div className="data-legend-info">
              {dataLegend[key].map((legendPart, index) => (
                <div className={`data-legend-info-part ${darkMode ? 'text-light' : ''}`} key={index}>{legendPart}</div>
              ))}
            </div>
          </div>
        ))}
        <div className="data-total-value">Total Hours : {totalHours.toFixed(2)}</div>
      </div>
    </div>
  );
};
