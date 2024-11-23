export interface VideoLessons {
  id: string | number;
  name: string;
}

export interface VideoModule {
  id: string | number;
  name: string;
  lessons: VideoLessons[];
}
