import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Course } from '@shared/schema';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition border-t-4 border-primary">
      <CardContent className="p-0">
        <h3 className="font-heading font-semibold text-xl mb-3">{course.title}</h3>
        <p className="text-neutral-medium mb-4">{course.description}</p>
        <ul className="mb-4 space-y-2">
          <li className="flex items-start">
            <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
            <span>Course Code: {course.code}</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
            <span>Instructor: {course.instructor}</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
            <span>Credits: {course.credits}</span>
          </li>
        </ul>
        <a href="#" className="text-primary font-medium hover:underline inline-flex items-center">
          Course details
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </CardContent>
    </Card>
  );
}
