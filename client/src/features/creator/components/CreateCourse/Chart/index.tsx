'use client';

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import type { Chart } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = () => {
  const data = {
    datasets: [
      {
        data: [2000, 900],
        backgroundColor: ['#9D32BC', '#DFD1F3'],
        borderWidth: 1,
      },
    ],
  };

  // const options: ChartOptions<"doughnut"> = {
  //   plugins: {
  //     tooltip: {
  //       enabled: true,
  //     },
  //   },
  //   maintainAspectRatio: false,
  //   responsive: true,
  //   cutout: "70%", // Hace espacio para el texto del centro
  // };

  // Plugin para agregar texto en el centro
  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart: unknown) => {
      const typedChart = chart as Chart;
      const { width } = typedChart;
      const { height } = typedChart;
      const ctx = typedChart.ctx;

      ctx.save();

      // Coordenadas centrales
      const centerX = width / 2;
      const centerY = height / 2;

      // Texto 1: "Balance de cursos"
      ctx.font = 'bold 12px sans-serif'; // Tamaño reducido
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Balance de cursos', centerX, centerY - 10); // Línea superior, ligeramente hacia arriba

      // Texto 2: "$150,238"
      ctx.font = 'bold 16px sans-serif'; // Un poco más grande para el valor
      ctx.fillStyle = '#ffffff';
      ctx.fillText('$150,238', centerX, centerY + 10); // Línea inferior, ligeramente hacia abajo

      ctx.restore();
    },
  };

  // Registrar el plugin
  ChartJS.register(centerTextPlugin);

  return (
    <div className="flex h-[458px] w-full items-center justify-center rounded-lg">
      <Doughnut data={data} />
    </div>
  );
};

export default Charts;
