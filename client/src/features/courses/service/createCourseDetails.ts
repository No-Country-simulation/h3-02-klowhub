'use server';

import type { ActionResponse } from '@core/models/actionResponse.type';

export default async function createCourseDetails(
  _state: unknown,
  formData: FormData
): Promise<ActionResponse | undefined> {
  const data = {
    courseLearnings: (formData.get('courseLearnings')?.toString() || '').split(',') || [],
    courseRequirements: (formData.get('courseRequirements')?.toString() || '').split(',') || [],
    courseBenefits: (formData.get('courseBenefits')?.toString() || '').split(',') || [],
    coursePoster: formData.get('coursePoster'),
  };

  console.log({ data });
  return Promise.resolve({});
}
