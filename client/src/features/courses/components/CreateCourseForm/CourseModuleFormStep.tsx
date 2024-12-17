import { useAtom } from 'jotai';
import Button from '@core/components/Button';
import { courseCreationStore } from '@features/courses/store/courseCreationStore';
import CreateModule from '../CreateModule';

interface CourseModuleFormStepProps {
  next: string;
}

export default function CourseModuleFormStep({ next }: CourseModuleFormStepProps) {
  const [courseModules, setModules] = useAtom(courseCreationStore);
  return (
    <form className="mt-5 space-y-12 rounded-lg bg-neutral-100 p-8">
      {courseModules.courseModulesStep.modules.map((module, i) => (
        <CreateModule
          key={`ccm-${i}`}
          saveModule={module =>
            setModules(prev => {
              prev.courseModulesStep.modules[i] = module;
              return {
                ...prev,
                courseModulesStep: {
                  ...prev.courseModulesStep,
                  modules: [...prev.courseModulesStep.modules],
                },
              };
            })
          }
          addLesson={() =>
            setModules(prev => {
              prev.courseModulesStep.modules[i]?.lessons.push(null);
              return {
                ...prev,
                courseModulesStep: {
                  ...prev.courseModulesStep,
                  modules: [...prev.courseModulesStep.modules],
                },
              };
            })
          }
          module={module}
        />
      ))}
      <Button
        variant="ghost"
        size="full"
        className="border border-dashed border-white/40 py-9 text-center hover:border-white/50 hover:bg-white/5"
        onClick={() =>
          setModules(prev => ({
            ...prev,
            courseModulesStep: {
              ...prev.courseModulesStep,
              modules: [...prev.courseModulesStep.modules, null],
            },
          }))
        }>
        Agregar nuevo modulo
      </Button>
      <div className="inline-flex w-full">
        <Button variant="default" className="ms-auto px-11" type="submit" size="default">
          {next}
        </Button>
      </div>
    </form>
  );
}
