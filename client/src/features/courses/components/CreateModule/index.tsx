/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@core/components/Button';
import FileUpload from '@core/components/FileUpload/Index';
import FormField from '@core/components/FormField';
import {
  ACCEPTED_RESOURCE_SOURCE,
  ACCEPTED_VIDEO_SOURCE,
} from '@features/courses/models/allowedResources';
import CreateFormPart from '../CreateFormPart';

interface CreateModuleProps {
  saveModule: (module: any) => void;
  courseId: string;
}

export default function CreateModule({ saveModule, courseId }: CreateModuleProps) {
  //const [module, setModule] = useState<CreateModuleType | null>(null);
  return (
    <div className="rounded-lg bg-neutral-100/50 shadow-app-1">
      <FormField
        id="moduleTitle"
        label="Título del modulo"
        name="moduleTitle"
        type="text"
        placeholder="Nombre del modulo"
      />
      <div className="rounded-lg bg-white/10 p-4">
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
            <CreateFormPart title="Sube un recurso para la leccion">
              <FileUpload
                firstText="Sube un recurso para la leccion"
                secondText="Arrastre o haga click aqui para subir su recurso"
                name="moduleLessonResource"
                accept={ACCEPTED_RESOURCE_SOURCE.join(',')}
              />
            </CreateFormPart>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-x-5">
        <Button variant="ghost" size="default">
          Agregar Leccion
        </Button>
        <Button variant="default" size="default">
          Guardar modulo
        </Button>
      </div>
    </div>
  );
}
