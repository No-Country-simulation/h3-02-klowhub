import { atom } from 'jotai';
import { CreateCourseTriggers } from '../models/enums/createCourseEnums';

// Tipo para el paso "generalStep"
export interface GeneralStep {
  courseTitle: string;
  courseMonetizable: string;
  courseType: string;
  courseDescription: string;
  courseCompetence: string;
  coursePlatform: string;
  courseLanguage: string;
}

// Tipo para el paso "courseDetailsStep"
export interface CourseDetailsStep {
  courseLearnings: string[];
  courseRequirements: string[];
  courseBenefits: string[];
  coursePoster: string | undefined;
}

// Tipo principal para la store
export interface CreateCourseStore {
  activeStep: CreateCourseTriggers;
  generalStep: GeneralStep;
  courseDetailsStep: CourseDetailsStep;
}

export const courseCreationStore = atom<CreateCourseStore>({
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
  courseDetailsStep: {
    courseLearnings: [],
    courseRequirements: [],
    courseBenefits: [],
    coursePoster: undefined,
  },
});
