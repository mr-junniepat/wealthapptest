import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const TimeSeriesGraph = ({ securityTimeSeries }) => {
  if (!securityTimeSeries) {
    return null;
  }

  const screenWidth = Dimensions.get('window').width;

  const processData = (securityTimeSeries) => {
    const groupedData = securityTimeSeries.map((series) => {
      return {
        name: series.key.name,
        symbol: series.key.symbol,
        data: series.values.map((item) => ({
          label: item.key,
          value: item.value,
        })),
      };
    });
  
    const sortedLabels = Array.from(
      new Set(groupedData.flatMap((group) => group.data.map((item) => item.label)))
    ).sort();
  
    const quarters = sortedLabels.filter((label, index) => {
      const date = new Date(label);
      const isFirstOfMonth = date.getDate() === 1;
      const isQuarter = [0, 3, 6, 9, 12].includes(date.getMonth());
      return isFirstOfMonth && isQuarter;
    });
  
    return {
      labels: quarters.map((quarter) => {
        const date = new Date(quarter);
        const year = date.getFullYear();
        const quarterNumber = Math.floor(date.getMonth() / 2) + 1;
        return `Q${quarterNumber}-${year}`;
      }),
      datasets: groupedData.map((group, index) => ({
        data: quarters.map((quarter) => {
          const item = group.data.find((item) => item.label === quarter);
          return item ? item.value : 0;
        }),
        color: (opacity = 1) => {
          const hue = (index * 50) % 360;
          return `hsla(${hue}, 60%, 60%, ${opacity})`;
        },
        strokeWidth: 2,
      })),
      legend: groupedData.map((group) => group.symbol ?? group.name),
    };
  };
  
  

  const chartData = processData(securityTimeSeries);

  return (
    <LineChart
      data={chartData}
      width={screenWidth}
      height={220}
      withDots={true}
      withShadow={true}
      withVerticalLines={false}
      withHorizontalLines={false}
      withHorizontalLabels={true}
      chartConfig={{
        backgroundColor: '#FFFFFF',
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(35, 179, 113, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '0',
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};

export default TimeSeriesGraph;
