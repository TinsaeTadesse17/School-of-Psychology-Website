import { db } from './db';
import { eq } from 'drizzle-orm';
import { 
  courses, 
  courseMaterials
} from '@shared/schema';

async function addMoreCourses() {
  console.log('Adding more courses and materials...');
  
  try {
    // Add more active courses (2025-1)
    await db.insert(courses).values([
      {
        code: 'PSY201-2025-1',
        title: 'Research Methods in Psychology',
        description: 'Introduction to scientific methodology in psychological research including experimental design, data collection, and statistical analysis.',
        instructor: 'Dr. Hewan Bekele',
        credits: 3,
        isPublic: true
      },
      {
        code: 'PSY301-2025-1',
        title: 'Abnormal Psychology',
        description: 'Study of psychological disorders, their symptoms, causes, and treatment approaches from various theoretical perspectives.',
        instructor: 'Dr. Meron Tafesse',
        credits: 3,
        isPublic: true
      },
      {
        code: 'PSY205-2025-1',
        title: 'Social Psychology',
        description: 'Examination of how individuals think, feel, and behave in social situations and how social factors influence behavior.',
        instructor: 'Dr. Solomon Girma',
        credits: 3,
        isPublic: true
      }
    ]).onConflictDoNothing();

    // Add past courses (2024-2 and 2024-1)
    await db.insert(courses).values([
      {
        code: 'PSY101-2024-2',
        title: 'Introduction to Psychology',
        description: 'Comprehensive introduction to the field of psychology covering major theories, research methods, and applications.',
        instructor: 'Dr. Sarah Bekele',
        credits: 3,
        isPublic: true
      },
      {
        code: 'PSY202-2024-2',
        title: 'Developmental Psychology',
        description: 'Study of human development from conception through old age, focusing on physical, cognitive, and socioemotional changes.',
        instructor: 'Dr. David Abebe',
        credits: 3,
        isPublic: true
      },
      {
        code: 'PSY203-2024-1',
        title: 'Cognitive Psychology',
        description: 'Exploration of mental processes including perception, attention, memory, language, and problem-solving.',
        instructor: 'Dr. Meron Tafesse',
        credits: 3,
        isPublic: true
      },
      {
        code: 'PSY204-2024-1',
        title: 'Biological Psychology',
        description: 'Study of the biological bases of behavior and mental processes, including neuroanatomy and neurophysiology.',
        instructor: 'Dr. Hewan Bekele',
        credits: 3,
        isPublic: true
      }
    ]).onConflictDoNothing();

    // Get course IDs to add materials
    const allCourses = await db.select().from(courses);
    
    // Add course materials for various courses
    const courseMaterialsData = [];
    
    for (const course of allCourses) {
      // Add syllabus for all courses
      courseMaterialsData.push({
        type: 'Syllabus',
        title: `${course.title} - Course Syllabus`,
        description: `Complete syllabus for ${course.title} including objectives, schedule, and requirements.`,
        courseId: course.id,
        fileUrl: `/materials/${course.code}/syllabus.pdf`
      });

      // Add lecture notes for current courses
      if (course.code.includes('2025-1')) {
        courseMaterialsData.push({
          type: 'Lecture Notes',
          title: 'Week 1-4 Lecture Notes',
          description: 'Comprehensive notes covering the first four weeks of lectures.',
          courseId: course.id,
          fileUrl: `/materials/${course.code}/lecture-notes-1-4.pdf`
        });

        courseMaterialsData.push({
          type: 'Assignment',
          title: 'Research Paper Assignment',
          description: 'Guidelines and requirements for the mid-term research paper.',
          courseId: course.id,
          fileUrl: `/materials/${course.code}/research-paper-assignment.pdf`
        });

        courseMaterialsData.push({
          type: 'Reading',
          title: 'Required Readings List',
          description: 'List of required readings for the course with access links.',
          courseId: course.id,
          fileUrl: `/materials/${course.code}/required-readings.pdf`
        });
      }

      // Add exam materials for past courses
      if (course.code.includes('2024')) {
        courseMaterialsData.push({
          type: 'Exam',
          title: 'Final Exam Study Guide',
          description: 'Comprehensive study guide for the final examination.',
          courseId: course.id,
          fileUrl: `/materials/${course.code}/final-exam-guide.pdf`
        });

        courseMaterialsData.push({
          type: 'Lecture Notes',
          title: 'Complete Lecture Notes',
          description: 'Full semester lecture notes and presentations.',
          courseId: course.id,
          fileUrl: `/materials/${course.code}/complete-lecture-notes.pdf`
        });
      }
    }

    // Insert all course materials
    if (courseMaterialsData.length > 0) {
      await db.insert(courseMaterials).values(courseMaterialsData).onConflictDoNothing();
    }

    console.log('Successfully added more courses and materials!');
  } catch (error) {
    console.error('Error adding courses:', error);
  }
}

// Run the function
addMoreCourses().then(() => {
  console.log('Course addition completed!');
  process.exit(0);
}).catch((error) => {
  console.error('Error during course addition:', error);
  process.exit(1);
});

export { addMoreCourses };