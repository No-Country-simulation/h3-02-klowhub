import Image from 'next/image';

const lessons = [
  {
    thumbnail: '/images/mocks/course_mock1.png',
    title: 'Lección 1',
    duration: '1:35',
  },
  {
    thumbnail: '/images/mocks/course_mock1.png',
    title: 'Lección 2',
    duration: '2:10',
  },
  {
    thumbnail: '/images/mocks/course_mock1.png',
    title: 'Lección 4',
    duration: '1:45',
  },
  {
    thumbnail: '/images/mocks/course_mock1.png',
    title: 'Lección 7',
    duration: '2:30',
  },
];

const VideoLessons = () => {
  return (
    <div className="overflow-auto pb-4">
      <div className="flex gap-4">
        {lessons.map((lesson, index) => (
          <button key={index} className="group relative w-[180px] shrink-0 focus:outline-none">
            <Image
              src={lesson.thumbnail}
              alt={lesson.title}
              width={180}
              height={108}
              className="group-hover:border-primary aspect-video w-full rounded-lg border object-cover transition-colors"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="font-medium text-white">{lesson.title}</span>
            </div>
            <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1 text-xs text-white">
              {lesson.duration}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VideoLessons;
