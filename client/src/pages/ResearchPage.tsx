import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ResearchProject } from '@shared/schema';
import ResearchCard from '@/components/ResearchCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ResearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: researchResponse, isLoading } = useQuery<{research: ResearchProject[]}>({
    queryKey: ['/api/research/public'],
  });

  const researchProjects = researchResponse?.research || [];
  const filteredProjects = researchProjects?.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.principalInvestigator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const researchAreas = [
    {
      name: 'Cognitive Psychology',
      description: 'Research on mental processes such as attention, language use, memory, perception, problem solving, creativity, and reasoning.',
      projects: filteredProjects?.filter(p => 
        p.title.toLowerCase().includes('cognitive') || 
        p.description.toLowerCase().includes('cognitive')
      ) || [],
    },
    {
      name: 'Clinical Psychology',
      description: 'Research focused on assessment, diagnosis, treatment, and prevention of mental disorders.',
      projects: filteredProjects?.filter(p => 
        p.title.toLowerCase().includes('clinical') || 
        p.description.toLowerCase().includes('clinical') ||
        p.title.toLowerCase().includes('therapy') || 
        p.description.toLowerCase().includes('therapy')
      ) || [],
    },
    {
      name: 'Developmental Psychology',
      description: 'Studies on human development across the lifespan, including cognitive, social, emotional, and personality development.',
      projects: filteredProjects?.filter(p => 
        p.title.toLowerCase().includes('development') || 
        p.description.toLowerCase().includes('development') ||
        p.title.toLowerCase().includes('child') || 
        p.description.toLowerCase().includes('child')
      ) || [],
    },
    {
      name: 'Social Psychology',
      description: 'Research examining how individuals\' thoughts, feelings, and behaviors are influenced by others and social context.',
      projects: filteredProjects?.filter(p => 
        p.title.toLowerCase().includes('social') || 
        p.description.toLowerCase().includes('social')
      ) || [],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4">Research</h1>
          <p className="max-w-3xl mx-auto text-lg text-blue-100">
            Discover our innovative research projects and initiatives that contribute to the advancement of psychological science and practice.
          </p>
        </div>
      </div>
      
      {/* Search */}
      <div className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search research projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Research Areas */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-2xl mb-8 text-primary">Research Areas</h2>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              {researchAreas.map(area => (
                <TabsTrigger key={area.name} value={area.name}>
                  {area.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="all">
              {isLoading ? (
                <div className="space-y-8">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row animate-pulse">
                      <div className="w-full md:w-2/5 h-56 md:h-auto bg-neutral-light"></div>
                      <div className="p-6 flex-1">
                        <div className="h-6 bg-neutral-light rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-neutral-light rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-neutral-light rounded w-full mb-2"></div>
                        <div className="h-4 bg-neutral-light rounded w-full mb-2"></div>
                        <div className="h-4 bg-neutral-light rounded w-1/3 mt-4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredProjects && filteredProjects.length > 0 ? (
                <div className="space-y-8">
                  {filteredProjects.map(project => (
                    <ResearchCard key={project.id} research={project} />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg shadow text-center">
                  <h3 className="text-xl font-semibold mb-2">No research projects found</h3>
                  <p className="text-neutral-medium mb-4">
                    Try adjusting your search criteria or clear your search.
                  </p>
                  <Button onClick={() => setSearchTerm('')}>
                    Clear Search
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {researchAreas.map(area => (
              <TabsContent key={area.name} value={area.name}>
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                  <h3 className="font-heading font-semibold text-xl mb-2">{area.name}</h3>
                  <p className="text-neutral-medium mb-0">{area.description}</p>
                </div>
                
                {area.projects.length > 0 ? (
                  <div className="space-y-8">
                    {area.projects.map(project => (
                      <ResearchCard key={project.id} research={project} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-8 rounded-lg shadow text-center">
                    <h3 className="text-lg font-semibold mb-2">No projects found in this area</h3>
                    <p className="text-neutral-medium">
                      Try searching for different keywords or check back later for new projects.
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
      
      {/* Research Facilities */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-2xl mb-8 text-primary">Research Facilities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <div className="h-56 bg-primary-light flex items-center justify-center">
                <span className="text-2xl text-white">Cognitive Psychology Lab</span>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-semibold text-xl mb-2">Cognitive Psychology Laboratory</h3>
                <p className="text-neutral-medium mb-4">
                  Equipped with state-of-the-art equipment for experiments on attention, memory, perception, and decision-making. The lab includes eye-tracking systems, EEG equipment, and computerized testing stations.
                </p>
                <Button variant="outline" className="flex items-center">
                  Learn more <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <div className="h-56 bg-primary-light flex items-center justify-center">
                <span className="text-2xl text-white">Child Development Center</span>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-semibold text-xl mb-2">Child Development Center</h3>
                <p className="text-neutral-medium mb-4">
                  A specialized facility for research on child development. The center provides observation rooms, age-appropriate assessment tools, and spaces for interaction studies and developmental assessments.
                </p>
                <Button variant="outline" className="flex items-center">
                  Learn more <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <div className="h-56 bg-primary-light flex items-center justify-center">
                <span className="text-2xl text-white">Clinical Psychology Clinic</span>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-semibold text-xl mb-2">Clinical Psychology Clinic</h3>
                <p className="text-neutral-medium mb-4">
                  Serves as both a training facility for graduate students and a research center. The clinic is equipped with therapy rooms, assessment tools, and resources for clinical research and practice.
                </p>
                <Button variant="outline" className="flex items-center">
                  Learn more <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <div className="h-56 bg-primary-light flex items-center justify-center">
                <span className="text-2xl text-white">Social Psychology Lab</span>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-semibold text-xl mb-2">Social Psychology Laboratory</h3>
                <p className="text-neutral-medium mb-4">
                  Designed for studies on social interaction, group dynamics, and interpersonal behavior. Features flexible spaces for group experiments, interview rooms, and technology for behavioral observations.
                </p>
                <Button variant="outline" className="flex items-center">
                  Learn more <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Research Publications */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-2xl mb-8 text-primary">Recent Publications</h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <ul className="divide-y divide-gray-200">
              <li className="py-4">
                <p className="font-medium mb-1">Cognitive Development in Ethiopian Children: A Longitudinal Study</p>
                <p className="text-sm text-neutral-medium mb-2">Bekele, A., Tadesse, M., & Girma, S. (2024)</p>
                <p className="text-sm italic">Journal of Cross-Cultural Psychology, 55(2), 178-195</p>
              </li>
              <li className="py-4">
                <p className="font-medium mb-1">Effectiveness of Culturally Adapted Cognitive-Behavioral Therapy for Anxiety Disorders</p>
                <p className="text-sm text-neutral-medium mb-2">Tafesse, H., Abebe, D., & Bekele, S. (2024)</p>
                <p className="text-sm italic">Clinical Psychology Review, 42, 67-82</p>
              </li>
              <li className="py-4">
                <p className="font-medium mb-1">Social Support Networks and Mental Health Outcomes Among University Students</p>
                <p className="text-sm text-neutral-medium mb-2">Girma, S., & Hailu, F. (2023)</p>
                <p className="text-sm italic">Journal of Community Psychology, 51(3), 421-438</p>
              </li>
              <li className="py-4">
                <p className="font-medium mb-1">Perceptual Development in Early Childhood: Visual Processing and Spatial Cognition</p>
                <p className="text-sm text-neutral-medium mb-2">Abebe, D., & Bekele, A. (2023)</p>
                <p className="text-sm italic">Developmental Psychology, 59(4), 512-528</p>
              </li>
              <li className="py-4">
                <p className="font-medium mb-1">Traditional Healing Practices and Integration with Modern Psychological Interventions</p>
                <p className="text-sm text-neutral-medium mb-2">Tadesse, M., Tafesse, H., & Bekele, S. (2023)</p>
                <p className="text-sm italic">Cultural Diversity and Ethnic Minority Psychology, 29(1), 88-102</p>
              </li>
            </ul>
            
            <div className="text-center mt-6">
              <Button className="bg-primary hover:bg-primary-dark">View All Publications</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
