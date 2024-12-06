import { useAtom } from 'jotai';
import Button from '@core/components/Button';
import { courseResourcesStore } from '@features/courses/store/courseModulesStore';
import CreateModule from '../CreateModule';

export default function CourseModuleFormStep() {
  const [courseModules, setModules] = useAtom(courseResourcesStore);
  return (
    <form className="mt-5 space-y-12 rounded-lg bg-neutral-100 p-8">
      {courseModules.modules.map((_, i) => (
        <CreateModule
          key={`ccm-${i}`}
          saveModule={module =>
            setModules(prev => {
              prev.modules[i] = module;
              return { ...prev, modules: [...prev.modules] };
            })
          }
          courseId={courseModules.courseId}
        />
      ))}
      <Button
        variant="ghost"
        size="full"
        className="border border-dashed border-white/40 py-9 text-center hover:border-white/50 hover:bg-white/5"
        onClick={() =>
          setModules(prev => ({
            ...prev,
            modules: [...prev.modules, {}],
          }))
        }>
        Agregar nuevo modulo
      </Button>
      <div className="inline-flex w-full">
        <Button variant="default" className="ms-auto px-11" type="submit" size="default">
          Siguiente
        </Button>
      </div>
    </form>
  );
}
