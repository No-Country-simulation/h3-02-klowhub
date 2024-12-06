import React from 'react';
import Button from '@core/components/Button';
import CardCreateCourse from './CardCreateCourse';
import Charts from './Chart';
import ContentTabs from './ContentTabsCreate';

const SectionCreateCourse = () => {
  return (
    <div className="w-full">
      <div className="m-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-200"> Ultimas ventas</h2>
        <Button size="lg" className="w-260 py-5">
          {' '}
          Crear curso{' '}
        </Button>
      </div>

      <div className="min-h-screen rounded-lg bg-neutral-100 pl-2 pr-4 text-white">
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 rounded-lg p-3 lg:w-2/3">
            <ContentTabs
              general={'Ultimos movimientos'}
              apps={'Este mes'}
              courses={'3 Meses'}
              projects={'Este año'}
              headerAmount={'Monto'}
              headerName={'Nombre del cliente'}
              headerPlatform={'Estado'}
              viewDetails={'Ver detalles'}
            />
          </div>
          <div className="w-full self-center rounded-lg bg-white/10 p-2 lg:mt-12 lg:w-1/4">
            <Charts />
          </div>
        </div>
        <div className="m-5">
          <CardCreateCourse />
        </div>
      </div>
    </div>
  );
};

export default SectionCreateCourse;
