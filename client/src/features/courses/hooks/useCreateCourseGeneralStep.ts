'use client';

import { useAtom } from 'jotai';
import {
  type FormEvent,
  useActionState,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from 'react';
import { useRouterQueryState } from '@core/hooks/useRouterQueryState';
import type { ActionResponse } from '@core/models/actionResponse.type';
import { CreateCourseTriggers } from '../models/enums/createCourseEnums.enum';
import createCourseGeneral from '../service/createCourseGeneral';
import { courseCreationStore } from '../store/courseCreationStore';

export const useCreateCourseGeneralStep = () => {
  const [{ generalStep }, setActiveTab] = useAtom(courseCreationStore);
  const [_, setActiveStep] = useRouterQueryState<[string]>(CreateCourseTriggers.KEY);
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

      setActiveTab(prev => ({
        ...prev,
        courseId: !prev.courseId ? crypto.randomUUID() : prev.courseId,
        generalStep: {
          active: true,
          courseTitle: formData.get('courseTitle')?.toString() || '',
          courseMonetizable: formData.get('courseMonetizable')?.toString() || '',
          courseType: formData.get('courseType')?.toString() || '',
          courseDescription: formData.get('courseDescription')?.toString() || '',
          courseCompetence: formData.get('courseCompetence')?.toString() || '',
          coursePlatform: formData.get('coursePlatform')?.toString() || '',
          courseLanguage: formData.get('courseLanguage')?.toString() || '',
        },
        courseDetailsStep: {
          ...prev.courseDetailsStep,
          active: true,
        },
      }));
      startTransition(() => dispatch(formData));
      setActiveStep([CreateCourseTriggers.DETAILS]);
    },
    [description, setActiveTab, result]
  );

  return {
    handleSubmit,
    setDescription,
    generalStep,
    result,
    isPending,
  };
};
