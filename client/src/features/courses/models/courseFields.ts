export interface CourseFields {
  general: CourseGeneralFields;
  details: CourseDetailsFields;
}

export interface CourseDetailsFields {
  learnings: {
    label: string;
    placeholder: string;
  };
  requirements: {
    label: string;
    placeholder: string;
  };
  benefits: {
    label: string;
    placeholder: string;
  };
  poster: {
    label: string;
    placeholder: string;
    info: string;
  };
}

export interface CourseGeneralFields {
  title: {
    label: string;
    placeholder: string;
  };
  alert: string;
  payment: {
    label: string;
    free: string;
    premium: string;
  };
  type: {
    label: string;
    course: string;
    lesson: string;
  };
  description: {
    label: string;
    placeholder: string;
  };
  level: {
    label: string;
    basic: string;
    mid: string;
    advanced: string;
  };
  platform: {
    label: string;
  };
  language: {
    label: string;
    placeholder: string;
  };
}
