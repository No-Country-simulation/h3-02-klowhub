import { useAtom } from 'jotai';
import { type FormEvent, useActionState, useCallback, useEffect, useTransition } from 'react';
import type { ActionResponse } from '@coreTypes/actionResponse';
import { CreateCourseTriggers } from '../models/enums/createCourseEnums';
import createCourseDetails from '../service/createCourseDetails';
import { courseCreationStore } from '../store/courseCreationStore';

export const useCreateCourseDetailsStep = () => {
  const [{ courseDetailsStep }, setCourseCreation] = useAtom(courseCreationStore);
  const [result, dispatch] = useActionState<ActionResponse | undefined, FormData>(
    createCourseDetails,
    undefined
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (result) {
      startTransition(() => {});
    }
  }, [result]);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => dispatch(formData));
    setCourseCreation(prev => ({
      ...prev,
      activeStep: CreateCourseTriggers.MODULES,
      courseDetailsStep: {
        ...prev.courseDetailsStep,
        courseLearnings: (formData.get('courseLearnings')?.toString() || '').split(',') || [],
        courseRequirements: (formData.get('courseRequirements')?.toString() || '').split(',') || [],
        courseBenefits: (formData.get('courseBenefits')?.toString() || '').split(',') || [],
      },
    }));
  }, []);

  return {
    handleSubmit,
    setCourseCreation,
    courseDetailsStep,
    result,
    isPending,
  };
};
