'use client';

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = () => {
  const data = {
    labels: ['Pagado', 'Pendiente'],
    datasets: [
      {
        data: [2000, 900],
        backgroundColor: ['#9D32BC', '#DFD1F3'],
        borderWidth: 0,
        spacing: 8,
        cutout: '80%',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  /*
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
*/

  return (
    <div className="relative mx-auto my-2 flex w-full max-w-xs items-center rounded-lg">
      <div className="h-[200px] w-full md:h-[300px] lg:h-[400px]">
        <Doughnut data={data} options={options} />
      </div>
      <div className="absolute left-1/2 top-1/2 flex w-fit -translate-x-1/2 -translate-y-1/2 flex-col gap-3 text-center">
        <p className="text-xs font-medium">Balance de cursos</p>
        <p className="text-xl font-bold">$173,6573</p>
      </div>
    </div>
  );
};

export default Charts;
