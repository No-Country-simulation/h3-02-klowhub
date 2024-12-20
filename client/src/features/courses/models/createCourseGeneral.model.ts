import {
  CourseCompetence,
  CourseMonetizable,
  CoursePlatform,
  CourseType,
} from './enums/createCourseEnums.enum';

export const createCourseGeneralModel = {
  courseMonetizable: (labels: string[]) => [
    { value: CourseMonetizable.FREE, label: labels[0] || '', id: 'radio-free' },
    { value: CourseMonetizable.PAYMENT, label: labels[1] || '', id: 'payment-free' },
  ],
  courseType: (labels: string[]) => [
    { value: CourseType.COURSE, label: labels[0] || '', id: 'course-free' },
    { value: CourseType.LESSON, label: labels[1] || '', id: 'lesson-free' },
  ],
  courseCompetence: (labels: string[]) => [
    { value: CourseCompetence.BASIC, label: labels[0] || '', id: 'competence-basic' },
    { value: CourseCompetence.INTERMEDIATE, label: labels[1] || '', id: 'competence-inter' },
  ],
  coursePlatform: [
    { value: CoursePlatform.POWER_APPS, label: 'Power Apps', id: 'platfowm-powerapp' },
    { value: CoursePlatform.APP_SHEET, label: 'App Sheet', id: 'platfowm-appsheet' },
  ],
  courseLanguage: (labels: string[]) => [
    { value: 'es', label: labels[0] || '', id: 'language-es' },
    { value: 'en', label: labels[1] || '', id: 'language-en' },
  ],
};
