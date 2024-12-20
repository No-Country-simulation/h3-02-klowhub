'use server';

import type { ActionResponse } from '@core/models/actionResponse.type';

export default async function createCourseGeneral(
  _state: unknown,
  formData: FormData
): Promise<ActionResponse | undefined> {
  const data = {
    courseTitle: formData.get('courseTitle')?.toString() || '',
    courseMonetizable: formData.get('courseMonetizable')?.toString() || '',
    courseType: formData.get('courseType')?.toString() || '',
    courseDescription: formData.get('courseDescription')?.toString() || '',
    courseCompetence: formData.get('courseCompetence')?.toString() || '',
    coursePlatform: formData.get('coursePlatform')?.toString() || '',
    courseLanguage: formData.get('courseLanguage')?.toString() || '',
  };

  console.log({ data });
  return Promise.resolve({});
}
