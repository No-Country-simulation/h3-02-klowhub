import { atomWithPersistence } from '@core/services/persistStore';

export interface DefaultStep {
  active: boolean;
}

// Tipo para el paso "generalStep"
export interface GeneralStep extends DefaultStep {
  courseTitle: string;
  courseMonetizable: string;
  courseType: string;
  courseDescription: string;
  courseCompetence: string;
  coursePlatform: string;
  courseLanguage: string;
}

// Tipo para el paso "courseDetailsStep"
export interface CourseDetailsStep extends DefaultStep {
  courseLearnings: string[];
  courseRequirements: string[];
  courseBenefits: string[];
  coursePoster: string | undefined;
}
export type ModuleLesson = {
  title: string;
  video: string | undefined;
  thumbnail: string | undefined;
};

export type ModuleType = {
  moduleTitle: string;
  lessons: (ModuleType | null)[];
};

export interface CourseModuleStep extends DefaultStep {
  modules: (ModuleType | null)[];
}

// Tipo principal para la store
export interface CreateCourseStore {
  courseId: string;
  generalStep: GeneralStep;
  courseDetailsStep: CourseDetailsStep;
  courseModulesStep: CourseModuleStep;
  coursePromotionStep: DefaultStep;
}

export const courseCreationStore = atomWithPersistence<CreateCourseStore>('courseCreationStore', {
  courseId: '',
  generalStep: {
    active: true,
    courseTitle: '',
    courseMonetizable: '',
    courseType: '',
    courseDescription: '',
    courseCompetence: '',
    coursePlatform: '',
    courseLanguage: '',
  },
  courseDetailsStep: {
    active: false,
    courseLearnings: [],
    courseRequirements: [],
    courseBenefits: [],
    coursePoster: undefined,
  },
  courseModulesStep: {
    active: false,
    modules: [],
  },
  coursePromotionStep: {
    active: false,
  },
});
