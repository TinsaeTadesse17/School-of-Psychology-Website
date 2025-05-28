import { db } from './db';
import { facultyMembers } from '@shared/schema';

async function addMoreFaculty() {
  console.log('Adding more faculty members...');
  
  try {
    await db.insert(facultyMembers).values([
      {
        name: 'Dr. Alemayehu Worku',
        title: 'Associate Professor',
        department: 'Clinical Psychology',
        specialization: 'Trauma and PTSD Research',
        bio: 'Dr. Alemayehu specializes in trauma psychology and post-traumatic stress disorder research, with extensive experience in culturally adapted therapeutic interventions for Ethiopian populations.',
        email: 'alemayehu.worku@aau.edu.et',
        phone: '+251-11-123-4567'
      },
      {
        name: 'Dr. Tigist Haile',
        title: 'Professor',
        department: 'Developmental Psychology',
        specialization: 'Child Development and Education',
        bio: 'Dr. Tigist is a leading researcher in child development and educational psychology, focusing on cognitive development in multicultural contexts and early childhood interventions.',
        email: 'tigist.haile@aau.edu.et',
        phone: '+251-11-234-5678'
      },
      {
        name: 'Dr. Bereket Teshome',
        title: 'Assistant Professor',
        department: 'Social Psychology',
        specialization: 'Group Dynamics and Cultural Psychology',
        bio: 'Dr. Bereket studies group behavior and cultural influences on psychological processes, with particular interest in collectivism and social identity in Ethiopian society.',
        email: 'bereket.teshome@aau.edu.et',
        phone: '+251-11-345-6789'
      },
      {
        name: 'Dr. Rahel Kassahun',
        title: 'Associate Professor',
        department: 'Cognitive Psychology',
        specialization: 'Memory and Learning',
        bio: 'Dr. Rahel researches memory processes and learning mechanisms, with focus on multilingual cognition and cross-cultural memory patterns in diverse linguistic environments.',
        email: 'rahel.kassahun@aau.edu.et',
        phone: '+251-11-456-7890'
      },
      {
        name: 'Dr. Yohannes Gebre',
        title: 'Professor',
        department: 'Clinical Psychology',
        specialization: 'Depression and Anxiety Disorders',
        bio: 'Dr. Yohannes is an expert in mood disorders and anxiety research, developing culturally sensitive assessment tools and treatment protocols for Ethiopian mental health contexts.',
        email: 'yohannes.gebre@aau.edu.et',
        phone: '+251-11-567-8901'
      },
      {
        name: 'Dr. Selamawit Desta',
        title: 'Assistant Professor',
        department: 'Health Psychology',
        specialization: 'Behavioral Health and Wellness',
        bio: 'Dr. Selamawit focuses on health behavior change, stress management, and wellness promotion, particularly in urban Ethiopian populations and healthcare settings.',
        email: 'selamawit.desta@aau.edu.et',
        phone: '+251-11-678-9012'
      },
      {
        name: 'Dr. Dawit Alemseged',
        title: 'Associate Professor',
        department: 'Experimental Psychology',
        specialization: 'Perception and Sensation',
        bio: 'Dr. Dawit conducts research on perceptual processes and sensory psychology, investigating cross-cultural differences in perception and the influence of environment on sensory development.',
        email: 'dawit.alemseged@aau.edu.et',
        phone: '+251-11-789-0123'
      },
      {
        name: 'Dr. Helen Tekle',
        title: 'Professor',
        department: 'Neuropsychology',
        specialization: 'Brain and Behavior',
        bio: 'Dr. Helen studies the relationship between brain structure and psychological function, with research focus on neurological disorders and cognitive rehabilitation in resource-limited settings.',
        email: 'helen.tekle@aau.edu.et',
        phone: '+251-11-890-1234'
      }
    ]).onConflictDoNothing();

    console.log('Successfully added more faculty members!');
  } catch (error) {
    console.error('Error adding faculty:', error);
  }
}

// Run the function
addMoreFaculty().then(() => {
  console.log('Faculty addition completed!');
  process.exit(0);
}).catch((error) => {
  console.error('Error during faculty addition:', error);
  process.exit(1);
});

export { addMoreFaculty };