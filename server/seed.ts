import { db } from './db';
import { eq } from 'drizzle-orm';
import { 
  users, 
  newsEvents, 
  facultyMembers, 
  researchProjects, 
  courses, 
  courseMaterials, 
  announcements,
  UserRole
} from '@shared/schema';
import bcrypt from 'bcrypt';

async function seed() {
  console.log('Seeding database with initial data...');
  
  try {
    // Add admin user
    const hashedAdminPassword = await bcrypt.hash('adminPass123', 10);
    await db.insert(users).values({
      email: 'admin@aau.edu.et',
      password: hashedAdminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      verified: true
    }).onConflictDoNothing();
    
    // Add student user
    const hashedStudentPassword = await bcrypt.hash('studentPass123', 10);
    await db.insert(users).values({
      email: 'student@aau.edu.et',
      password: hashedStudentPassword,
      firstName: 'Student',
      lastName: 'User',
      role: UserRole.STUDENT,
      verified: true
    }).onConflictDoNothing();
    
    // Add news and events
    await db.insert(newsEvents).values({
      title: 'Annual Psychology Research Symposium',
      content: 'Join us for presentations of groundbreaking research from our faculty and graduate students in various psychology domains.',
      type: 'event',
      date: new Date('2025-06-15'),
      imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500',
      isPublic: true
    }).onConflictDoNothing();
    
    await db.insert(newsEvents).values({
      title: 'Department Welcomes New Faculty Member',
      content: 'Dr. Sarah Teklu joins our faculty, bringing expertise in developmental psychology and cognitive development research.',
      type: 'news',
      date: new Date('2025-05-05'),
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500',
      isPublic: true
    }).onConflictDoNothing();
    
    // Add faculty members
    await db.insert(facultyMembers).values({
      name: 'Dr. Sarah Bekele',
      title: 'Department Chair, Professor',
      department: 'Psychology',
      specialization: 'Cognitive Psychology',
      bio: 'Dr. Bekele has over 20 years of experience in cognitive psychology research, focusing on memory and learning processes. She has published numerous papers in prestigious journals and received several research grants.',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000',
      email: 'sarah.bekele@aau.edu.et',
      phone: '+251-111-232055'
    }).onConflictDoNothing();
    
    await db.insert(facultyMembers).values({
      name: 'Dr. Daniel Abebe',
      title: 'Associate Professor',
      department: 'Psychology',
      specialization: 'Clinical Psychology',
      bio: 'Dr. Abebe specializes in clinical psychology with a focus on trauma-informed therapy approaches. His research examines the effectiveness of various therapeutic interventions in different cultural contexts.',
      imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000',
      email: 'daniel.abebe@aau.edu.et',
      phone: '+251-111-232056'
    }).onConflictDoNothing();
    
    // Add research projects
    await db.insert(researchProjects).values({
      title: 'Cognitive Development in Ethiopian Children',
      description: 'This longitudinal study examines cognitive development in Ethiopian children from ages 3-10, focusing on language acquisition, executive function, and problem-solving skills in diverse cultural and socioeconomic contexts.',
      principalInvestigator: 'Dr. Sarah Bekele',
      researchers: 'Dr. Meron Tadesse, Abebe Kebede, Tigist Hailu',
      imageUrl: 'https://images.unsplash.com/photo-1599687351724-dfa3c4ff81b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500',
      isPublic: true
    }).onConflictDoNothing();
    
    await db.insert(researchProjects).values({
      title: 'Trauma Recovery Approaches in Post-Conflict Communities',
      description: 'This research evaluates the effectiveness of various psychological interventions for trauma recovery in post-conflict communities in Ethiopia, with particular attention to culturally appropriate therapeutic approaches.',
      principalInvestigator: 'Dr. Daniel Abebe',
      researchers: 'Dr. Hiwot Alemayehu, Dawit Solomon',
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500',
      isPublic: true
    }).onConflictDoNothing();
    
    // Add courses
    await db.insert(courses).values({
      title: 'Introduction to Psychology',
      code: 'PSY101-2025-1',
      description: 'A comprehensive introduction to the fundamental principles of psychology, including historical perspectives, research methods, and major theoretical frameworks.',
      instructor: 'Dr. Sarah Bekele',
      credits: 3,
      imageUrl: '',
      syllabus: '',
      isPublic: true
    }).onConflictDoNothing();
    
    await db.insert(courses).values({
      title: 'Cognitive Psychology',
      code: 'PSY245-2025-1',
      description: 'Study of mental processes such as attention, language use, memory, perception, problem solving, creativity, and reasoning.',
      instructor: 'Dr. Daniel Abebe',
      credits: 4,
      imageUrl: '',
      syllabus: '',
      isPublic: true
    }).onConflictDoNothing();
    
    // Add course materials (will need to get course IDs first)
    const introCoursesResult = await db.select({ id: courses.id })
      .from(courses)
      .where(eq(courses.code, 'PSY101-2025-1'))
      .limit(1);
      
    if (introCoursesResult.length > 0) {
      const introId = introCoursesResult[0].id;
      await db.insert(courseMaterials).values({
        courseId: introId,
        title: 'Introduction to Psychology - Lecture Slides',
        type: 'lecture',
        fileUrl: 'https://example.com/files/psy101-slides.pdf',
        description: 'Lecture slides for the first four weeks of the course.'
      }).onConflictDoNothing();
    }
    
    // Add announcements
    await db.insert(announcements).values({
      content: 'Fall 2025 registration opens on June 15. Please consult with your advisor before registering for psychology courses.',
      isPublic: true,
      active: true,
      expiresAt: new Date('2025-06-30')
    }).onConflictDoNothing();
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run the seed function
seed().then(() => {
  console.log('Seeding completed!');
  process.exit(0);
}).catch((error) => {
  console.error('Error during seeding:', error);
  process.exit(1);
});

export { seed };