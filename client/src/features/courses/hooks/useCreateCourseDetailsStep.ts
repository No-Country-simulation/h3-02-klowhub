import { useAtom } from 'jotai';
import { type FormEvent, useActionState, useCallback, useEffect, useTransition } from 'react';
import { useRouterQueryState } from '@core/hooks/useRouterQueryState';
import type { ActionResponse } from '@core/models/actionResponse.type';
import { CreateCourseTriggers } from '../models/enums/createCourse.enum';
import createCourseDetails from '../service/createCourseDetails';
import { courseCreationStore } from '../store/courseCreationStore';

export const useCreateCourseDetailsStep = () => {
  const [{ courseDetailsStep }, setCourseCreation] = useAtom(courseCreationStore);
  const [_, setActiveStep] = useRouterQueryState<[string]>(CreateCourseTriggers.KEY);
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
    setActiveStep([CreateCourseTriggers.MODULES]);
    setCourseCreation(prev => ({
      ...prev,
      courseDetailsStep: {
        ...prev.courseDetailsStep,
        courseLearnings: (formData.get('courseLearnings')?.toString() || '').split(',') || [],
        courseRequirements: (formData.get('courseRequirements')?.toString() || '').split(',') || [],
        courseBenefits: (formData.get('courseBenefits')?.toString() || '').split(',') || [],
      },
      courseModulesStep: {
        ...prev.courseModulesStep,
        active: true,
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
