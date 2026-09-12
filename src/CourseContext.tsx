import { createContext, useContext, useState, ReactNode } from 'react';
import { MOCK_COURSES } from './data';

interface CourseContextType {
  courses: typeof MOCK_COURSES;
  addCourse: (course: any) => void;
  deleteCourse: (id: number) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState(MOCK_COURSES);

  const addCourse = (course: any) => {
    const newCourse = {
      ...course,
      id: Date.now(),
      modules: course.modules || 0,
      lessons: course.lessons || [],
    };
    setCourses([...courses, newCourse]);
  };

  const deleteCourse = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <CourseContext.Provider value={{ courses, addCourse, deleteCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};
