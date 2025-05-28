import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import HeroSection from '@/components/HeroSection';
import NewsCard from '@/components/NewsCard';
import CourseCard from '@/components/CourseCard';
import ResearchCard from '@/components/ResearchCard';
import FacultyCard from '@/components/FacultyCard';
import ResourceCard from '@/components/ResourceCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { NewsEvent, Course, ResearchProject, FacultyMember } from '@shared/schema';
import { useAuth } from '@/hooks/useAuth';

export default function HomePage() {
  const { user } = useAuth();
  
  const { data: newsEventsResponse } = useQuery<{newsEvents: NewsEvent[]}>({
    queryKey: ['/api/news-events/public'],
  });
  
  const newsEvents = newsEventsResponse?.newsEvents;
  
  const { data: coursesResponse } = useQuery<{courses: Course[]}>({
    queryKey: ['/api/courses/featured'],
  });
  
  const courses = coursesResponse?.courses;
  
  const { data: researchResponse } = useQuery<{research: ResearchProject[]}>({
    queryKey: ['/api/research/featured'],
  });
  
  const researchProjects = researchResponse?.research;
  
  const { data: facultyResponse } = useQuery<{faculty: FacultyMember[]}>({
    queryKey: ['/api/faculty/featured'],
  });
  
  const facultyMembers = facultyResponse?.faculty;

  return (
    <>
      <HeroSection />
      
      {/* News and Events */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="font-heading font-bold text-3xl mb-2 text-primary">News and Events</h2>
            <div className="w-20 h-1 bg-primary mb-6"></div>
            <p className="text-lg text-neutral-medium max-w-3xl">
              Stay updated with the latest news, events, and announcements from the Department of Psychology. Join us for seminars, workshops, and community outreach programs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsEvents ? (
              newsEvents.slice(0, 3).map(item => (
                <NewsCard key={item.id} item={item} />
              ))
            ) : (
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="h-80 animate-pulse">
                  <div className="h-48 bg-neutral-light"></div>
                  <div className="p-6">
                    <div className="h-4 bg-neutral-light rounded w-1/3 mb-4"></div>
                    <div className="h-6 bg-neutral-light rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-neutral-light rounded w-full mb-4"></div>
                    <div className="h-4 bg-neutral-light rounded w-1/4"></div>
                  </div>
                </Card>
              ))
            )}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/news">
              <Button variant="outline" className="border-2 border-primary text-primary font-medium px-6 py-2 rounded-md hover:bg-primary hover:text-white transition">
                View All News & Events
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Programs */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="font-heading font-bold text-3xl mb-2 text-primary">Our Programs</h2>
            <div className="w-20 h-1 bg-primary mb-6"></div>
            <p className="text-lg text-neutral-medium max-w-3xl">
              The Department of Psychology offers a range of undergraduate and graduate programs designed to provide students with comprehensive knowledge and practical skills in various psychology domains.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses ? (
              courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <>
                <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-primary">
                  <h3 className="font-heading font-semibold text-xl mb-3">Bachelor of Arts in Psychology</h3>
                  <p className="text-neutral-medium mb-4">A comprehensive undergraduate program covering the fundamental areas of psychology with opportunities for specialization.</p>
                  <ul className="mb-4 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5" />
                      <span>4-year program</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5" />
                      <span>Research opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5" />
                      <span>Practical internships</span>
                    </li>
                  </ul>
                  <a href="#" className="text-primary font-medium hover:underline inline-flex items-center">
                    Program details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-primary">
                  <h3 className="font-heading font-semibold text-xl mb-3">Master of Science in Clinical Psychology</h3>
                  <p className="text-neutral-medium mb-4">Advanced training in assessment, diagnosis, and treatment of psychological disorders with supervised clinical practice.</p>
                  <ul className="mb-4 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5" />
                      <span>2-year program</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5" />
                      <span>Clinical placements</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5" />
                      <span>Research thesis</span>
                    </li>
                  </ul>
                  <a href="#" className="text-primary font-medium hover:underline inline-flex items-center">
                    Program details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-primary">
                  <h3 className="font-heading font-semibold text-xl mb-3">PhD in Developmental Psychology</h3>
                  <p className="text-neutral-medium mb-4">Rigorous research-focused program examining psychological development across the lifespan with opportunities for specialization.</p>
                  <ul className="mb-4 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5" />
                      <span>4-year program</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5" />
                      <span>Advanced research methods</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5" />
                      <span>Dissertation</span>
                    </li>
                  </ul>
                  <a href="#" className="text-primary font-medium hover:underline inline-flex items-center">
                    Program details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </>
            )}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/academics">
              <Button className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-md transition">
                View All Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Research */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="font-heading font-bold text-3xl mb-2 text-primary">Research Spotlight</h2>
            <div className="w-20 h-1 bg-primary mb-6"></div>
            <p className="text-lg text-neutral-medium max-w-3xl">
              Our faculty and students conduct innovative research across various domains of psychology, contributing to the advancement of psychological science and addressing social challenges.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {researchProjects ? (
              researchProjects.slice(0, 2).map(research => (
                <ResearchCard key={research.id} research={research} />
              ))
            ) : (
              Array.from({ length: 2 }).map((_, index) => (
                <Card key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row animate-pulse">
                  <div className="w-full md:w-2/5 h-56 md:h-auto bg-neutral-light"></div>
                  <div className="p-6 flex-1">
                    <div className="h-6 bg-neutral-light rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-neutral-light rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-neutral-light rounded w-full mb-2"></div>
                    <div className="h-4 bg-neutral-light rounded w-full mb-2"></div>
                    <div className="h-4 bg-neutral-light rounded w-1/3 mt-4"></div>
                  </div>
                </Card>
              ))
            )}
          </div>
          
          <div className="mt-10 bg-gray-50 rounded-lg p-6 shadow-md">
            <h3 className="font-heading font-semibold text-xl mb-4">Research Centers and Laboratories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded border border-neutral-light">
                <h4 className="font-heading font-semibold mb-2">Cognitive Psychology Lab</h4>
                <p className="text-sm text-neutral-medium">Research on attention, memory, decision-making, and problem-solving processes.</p>
              </div>
              <div className="bg-white p-4 rounded border border-neutral-light">
                <h4 className="font-heading font-semibold mb-2">Child Development Center</h4>
                <p className="text-sm text-neutral-medium">Studies on social, emotional, and cognitive development in children.</p>
              </div>
              <div className="bg-white p-4 rounded border border-neutral-light">
                <h4 className="font-heading font-semibold mb-2">Clinical Psychology Clinic</h4>
                <p className="text-sm text-neutral-medium">Research and training facility for evidence-based psychological interventions.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/research">
              <Button variant="outline" className="border-2 border-primary text-primary font-medium px-6 py-2 rounded-md hover:bg-primary hover:text-white transition">
                Explore All Research
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Faculty */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="font-heading font-bold text-3xl mb-2 text-primary">Our Faculty</h2>
            <div className="w-20 h-1 bg-primary mb-6"></div>
            <p className="text-lg text-neutral-medium max-w-3xl">
              Our distinguished faculty members bring diverse expertise and research interests, providing students with quality education and mentorship.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facultyMembers ? (
              facultyMembers.map(faculty => (
                <FacultyCard key={faculty.id} faculty={faculty} />
              ))
            ) : (
              Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
                  <div className="h-64 bg-neutral-light"></div>
                  <div className="p-4">
                    <div className="h-5 bg-neutral-light rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-neutral-light rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-neutral-light rounded w-full mb-3"></div>
                    <div className="h-4 bg-neutral-light rounded w-1/4"></div>
                  </div>
                </Card>
              ))
            )}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/faculty">
              <Button variant="outline" className="border-2 border-primary text-primary font-medium px-6 py-2 rounded-md hover:bg-primary hover:text-white transition">
                View All Faculty
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Student Resources */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="font-heading font-bold text-3xl mb-2 text-primary">Student Resources</h2>
            <div className="w-20 h-1 bg-primary mb-6"></div>
            <p className="text-lg text-neutral-medium max-w-3xl">
              Access resources, support services, and opportunities to enhance your academic experience at the Department of Psychology.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center mb-6">
              <div className="mb-4 md:mb-0 md:mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-xl mb-2">Restricted Resources</h3>
                <p className="text-neutral-medium">Access course materials, schedules, and internal announcements by logging in with your AAU credentials.</p>
              </div>
              <div className="mt-4 md:mt-0 md:ml-auto">
                {user ? (
                  <Link href="/dashboard">
                    <Button className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-md transition flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm2 9v5h10v-5H5zm10-7v5H5V5h10z" clipRule="evenodd" />
                      </svg>
                      Access Portal
                    </Button>
                  </Link>
                ) : (
                  <Button className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-md transition flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                    Student Login
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ResourceCard
              title="Academic Advising"
              description="Get guidance on course selection, academic planning, and career development."
              icon="book"
              link="/academic-advising"
            />
            <ResourceCard
              title="Counseling Services"
              description="Access confidential counseling and mental health support services."
              icon="counseling"
              link="/counseling"
            />
            <ResourceCard
              title="Research Opportunities"
              description="Find information about research assistant positions and projects."
              icon="research"
              link="/research-opportunities"
            />
            <ResourceCard
              title="Academic Calendar"
              description="View important dates, deadlines, and events for the academic year."
              icon="calendar"
              link="/calendar"
            />
            <ResourceCard
              title="Student Organizations"
              description="Join psychology-related student groups and participate in activities."
              icon="organizations"
              link="/organizations"
            />
            <ResourceCard
              title="Support Request"
              description="Submit inquiries or requests for assistance with academic matters."
              icon="support"
              link="/support"
            />
          </div>
        </div>
      </section>
    </>
  );
}
