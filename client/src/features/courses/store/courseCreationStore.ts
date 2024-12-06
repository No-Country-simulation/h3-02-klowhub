import { atom } from 'jotai';
import { CreateCourseTriggers } from '../models/enums/createCourseEnums';

export const courseCreationStore = atom({
  activeStep: CreateCourseTriggers.GENERAL,
  generalStep: {
    courseTitle: '',
    courseMonetizable: '',
    courseType: '',
    courseDescription: '',
    courseCompetence: '',
    coursePlatform: '',
    courseLanguage: '',
  },
});
