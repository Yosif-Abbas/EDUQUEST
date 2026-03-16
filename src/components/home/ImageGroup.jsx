import Picture from './Picture';

// Image data configuration
const imageConfig = [
  {
    name: 'course-app',
    alt: 'Course',
    className:
      'col-span-2 row-span-2 h-full w-full max-w-[580px] object-contain flex items-center justify-center md:col-span-2 md:row-span-2 lg:col-span-3 lg:row-span-4',
    alwaysVisible: true,
  },
  {
    name: 'big-icon',
    alt: 'Eduquest',
    className:
      'col-span-1 row-span-1 hidden h-full w-full max-w-[514px] object-contain flex items-center justify-center md:col-span-1 md:row-span-2 lg:col-span-2 lg:row-span-2 lg:block',
    alwaysVisible: false,
  },
  {
    name: 'ebook',
    alt: 'Ebook',
    className:
      'col-span-2 row-span-2 hidden h-full w-full max-w-[563px] object-contain flex items-center justify-center md:col-span-2 md:row-span-2 lg:col-span-3 lg:row-span-3 lg:block',
    alwaysVisible: false,
  },
  {
    name: 'exams',
    alt: 'Exams',
    className:
      'col-span-2 row-span-2 h-full w-full max-w-[447px] object-contain flex items-center justify-center md:col-span-2 md:row-span-2 lg:col-span-3 lg:col-start-1 lg:row-span-3 lg:row-start-5',
    alwaysVisible: true,
  },
  {
    name: 'video',
    alt: 'Video',
    className:
      'col-span-2 row-span-2 hidden max-w-[800px] object-contain  md:col-span-4 md:row-span-2 md:flex md:items-center md:mx-auto lg:col-span-5 lg:row-span-4 lg:h-full',
    alwaysVisible: false,
  },
];

function ImageGroup() {
  return (
    <div className="mt-12 grid grid-cols-2 grid-rows-4 gap-y-16 overflow-hidden md:grid-cols-4 md:grid-rows-4 md:gap-10 lg:h-fit lg:grid-cols-8 lg:grid-rows-7 lg:gap-0">
      {imageConfig.map(({ name, alt, className }) => (
        <Picture key={name} name={name} alt={alt} className={className} />
      ))}
    </div>
  );
}

export default ImageGroup;
