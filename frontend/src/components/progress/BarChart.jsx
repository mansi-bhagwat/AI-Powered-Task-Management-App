import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryLegend } from 'victory';

const BarChart = ({ data }) => {
  return (
    <VictoryChart domainPadding={20} height={400} width={500}>
      <VictoryAxis tickValues={[1, 2, 3]} tickFormat={['High', 'Medium', 'Low']} />
      <VictoryAxis dependentAxis />
      <VictoryBar
        data={data}
        x='priority'
        y='count'
        style={{ data: { fill: '#3498db' } }}
        labels={({ datum }) => datum.count}
        labelComponent={<VictoryLabel dy={-10} style={{ fontSize: 12 }} />}
      />
      {/* Adding legend to display task names */}
      <VictoryLegend
        x={290} // Adjust position as needed
        y={10} // Adjust position as needed
        title="Task Names"
        centerTitle
        orientation="vertical"
        gutter={20}
        style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
        data={data.map((item) => ({
          name: item.taskName || 'Priority',
          symbol: { fill: '#3498db' }
        }))}
      />
    </VictoryChart>
  );
};

export default BarChart;
