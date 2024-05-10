import React from 'react';
import { VictoryPie, VictoryLabel } from 'victory';

const PieChart = ({ data }) => {
  return (
    <VictoryPie
      width={500}
      data={data}
      colorScale={['orange', 'green', 'red']}
      labelComponent={<VictoryLabel style={{ fontSize: 16 }} />}
    />
  );
};

export default PieChart;
