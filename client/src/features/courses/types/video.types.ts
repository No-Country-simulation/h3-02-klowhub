export interface VideoLessonsData {
  id: string | number;
  name: string;
  duration: string;
  thumbnail: string;
}

export interface VideoModule {
  id: string | number;
  name: string;
  lessons: VideoLessonsData[];
}
