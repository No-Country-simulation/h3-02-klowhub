import { useAtom } from 'jotai';
import {
  type FormEvent,
  useActionState,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from 'react';
import type { ActionResponse } from '@coreTypes/actionResponse';
import { CreateCourseTriggers } from '../models/enums/createCourseEnums';
import createCourseGeneral from '../service/createCourseGeneral';
import { courseCreationStore } from '../store/courseCreationStore';

export const useCreateCourseGeneralStep = () => {
  const [{ generalStep }, setActiveTab] = useAtom(courseCreationStore);
  const [result, dispatch] = useActionState<ActionResponse | undefined, FormData>(
    createCourseGeneral,
    undefined
  );
  const [isPending, startTransition] = useTransition();
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (result) {
      startTransition(() => {});
    }
  }, [result]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      formData.append('courseDescription', description);
      startTransition(() => dispatch(formData));
      setActiveTab(prev => ({
        ...prev,
        activeStep: CreateCourseTriggers.DETAILS,
        generalStep: {
          courseTitle: formData.get('courseTitle')?.toString() || '',
          courseMonetizable: formData.get('courseMonetizable')?.toString() || '',
          courseType: formData.get('courseType')?.toString() || '',
          courseDescription: formData.get('courseDescription')?.toString() || '',
          courseCompetence: formData.get('courseCompetence')?.toString() || '',
          coursePlatform: formData.get('coursePlatform')?.toString() || '',
          courseLanguage: formData.get('courseLanguage')?.toString() || '',
        },
      }));
    },
    [description]
  );

  return {
    handleSubmit,
    setDescription,
    generalStep,
    result,
    isPending,
  };
};
