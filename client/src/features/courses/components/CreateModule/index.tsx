/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@core/components/Button';
import FileUpload from '@core/components/FileUpload/Index';
import FormField from '@core/components/FormField';
import { ACCEPTED_VIDEO_SOURCE } from '@features/courses/models/allowedResources.model';
import type { ModuleType } from '@features/courses/store/courseCreationStore';
import CreateFormPart from '../CreateFormPart';

interface CreateModuleProps {
  saveModule: (module: any) => void;
  addLesson: () => void;
  module?: ModuleType | null;
}

export default function CreateModule({
  saveModule,
  module = { moduleTitle: '', lessons: [] },
  addLesson,
}: CreateModuleProps) {
  //const [module, setModule] = useState<CreateModuleType | null>(null);
  return (
    <div className="space-y-6 rounded-lg bg-neutral-100/50 p-6 shadow-app-1">
      <FormField
        id="moduleTitle"
        defaultValue={module?.moduleTitle || ''}
        label="Título del modulo"
        name="moduleTitle"
        type="text"
        placeholder="Nombre del modulo"
        classNameContainer="mb-2"
      />
      {module?.lessons?.map((_, i) => (
        <div key={`mlc-${i}`} className="rounded-lg bg-white/10 p-5">
          <div>
            <FormField
              id="moduleLesson"
              label="Título de la leccion"
              name="moduleLesson"
              type="text"
              placeholder="Nombre del modulo"
            />
            <div className="flex flex-row gap-x-6">
              <CreateFormPart title="Sube un video para leccion">
                <FileUpload
                  firstText="Sube un video para la leccion"
                  secondText="Arrastre o haga click aqui para subir su video"
                  name="moduleLessonVideo"
                  accept={ACCEPTED_VIDEO_SOURCE.join(',')}
                />
              </CreateFormPart>
              <CreateFormPart title="Sube una miniatura para la leccion">
                <FileUpload
                  firstText="Sube una miniatura para la leccion"
                  secondText="Arrastre o haga click aqui para subir su imagen"
                  name="moduleLessonThumbnail"
                />
              </CreateFormPart>
            </div>
          </div>
        </div>
      ))}

      <div className="flex flex-row gap-x-5">
        <Button variant="ghost" size="default" onClick={addLesson}>
          Agregar Leccion
        </Button>
        <Button variant="default" size="default" onClick={saveModule}>
          Guardar modulo
        </Button>
      </div>
    </div>
  );
}
