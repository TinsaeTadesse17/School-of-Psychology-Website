import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4">About Our Department</h1>
          <p className="max-w-3xl mx-auto text-lg text-blue-100">
            Learn about the history, mission, and vision of the Psychology Department at Addis Ababa University.
          </p>
        </div>
      </div>

      {/* Department Overview */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h2 className="font-heading font-bold text-2xl mb-4 text-primary">Our Department</h2>
              <div className="w-20 h-1 bg-primary mb-6"></div>
              <p className="mb-4 text-neutral-medium">
                The Department of Psychology at Addis Ababa University was established in 1966 and has since grown to become one of the leading psychology departments in East Africa.
              </p>
              <p className="mb-4 text-neutral-medium">
                Over the decades, we have developed rigorous academic programs, innovative research initiatives, and community engagement projects that address the psychological needs and challenges in Ethiopia and beyond.
              </p>
              <p className="mb-4 text-neutral-medium">
                Our department offers undergraduate, graduate, and doctoral programs in various psychological specializations, providing students with comprehensive theoretical knowledge and practical skills in the field.
              </p>
              <p className="text-neutral-medium">
                With our distinguished faculty, state-of-the-art research facilities, and commitment to academic excellence, we have established a reputation for producing competent psychology professionals and impactful research.
              </p>
            </div>
            <div className="md:w-1/2 bg-gray-100 rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
                alt="Addis Ababa University Campus" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-heading font-bold text-2xl mb-4 text-primary">Mission & Vision</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-xl mb-4 text-primary">Our Mission</h3>
                <p className="mb-4 text-neutral-medium">
                  To advance psychological knowledge through innovative research, provide high-quality education that prepares students for diverse professional roles, and apply psychological principles to address societal challenges and promote well-being.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>Excellence in teaching and research</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>Culturally relevant psychological practices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>Community engagement and service</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-xl mb-4 text-primary">Our Vision</h3>
                <p className="mb-4 text-neutral-medium">
                  To be a leading center of excellence in psychological education, research, and practice in Africa, recognized for our contributions to the advancement of psychological science and its applications to improve individual and community well-being.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>Regional leadership in psychological education</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>Innovative research with real-world impact</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>Global collaboration and knowledge exchange</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Department History */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-2xl mb-4 text-primary">Our History</h2>
          <div className="w-20 h-1 bg-primary mb-6"></div>
          
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="bg-primary text-white font-bold text-xl p-4 rounded-lg md:w-32 text-center flex-shrink-0">
                1966
              </div>
              <div className="border-l-4 border-primary pl-4 pb-8">
                <h3 className="font-heading font-semibold text-xl mb-2">Establishment</h3>
                <p className="text-neutral-medium">
                  The Department of Psychology was established at Addis Ababa University as part of the Faculty of Social Sciences, offering its first undergraduate program in general psychology.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="bg-primary text-white font-bold text-xl p-4 rounded-lg md:w-32 text-center flex-shrink-0">
                1978
              </div>
              <div className="border-l-4 border-primary pl-4 pb-8">
                <h3 className="font-heading font-semibold text-xl mb-2">Graduate Program Launch</h3>
                <p className="text-neutral-medium">
                  The department expanded to offer master's programs in Clinical Psychology and Developmental Psychology, marking a significant growth in advanced psychological education in Ethiopia.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="bg-primary text-white font-bold text-xl p-4 rounded-lg md:w-32 text-center flex-shrink-0">
                1995
              </div>
              <div className="border-l-4 border-primary pl-4 pb-8">
                <h3 className="font-heading font-semibold text-xl mb-2">Research Centers</h3>
                <p className="text-neutral-medium">
                  The department established dedicated research centers focusing on child development, cognitive psychology, and mental health, strengthening its research capabilities and community impact.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="bg-primary text-white font-bold text-xl p-4 rounded-lg md:w-32 text-center flex-shrink-0">
                2005
              </div>
              <div className="border-l-4 border-primary pl-4 pb-8">
                <h3 className="font-heading font-semibold text-xl mb-2">Doctoral Programs</h3>
                <p className="text-neutral-medium">
                  The first doctoral programs in Clinical and Developmental Psychology were launched, elevating the department's academic offerings and research capacity.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="bg-primary text-white font-bold text-xl p-4 rounded-lg md:w-32 text-center flex-shrink-0">
                2015
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-heading font-semibold text-xl mb-2">International Recognition</h3>
                <p className="text-neutral-medium">
                  The department gained international recognition through collaborative research projects with universities in Europe and North America, and began hosting international conferences in psychological science.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Principles */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-2xl mb-4 text-primary">Our Values</h2>
          <div className="w-20 h-1 bg-primary mb-6"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white shadow-md hover:shadow-lg transition">
              <CardContent className="p-6">
                <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Academic Excellence</h3>
                <p className="text-neutral-medium">
                  We maintain high standards in teaching, research, and scholarly activities, striving for excellence in all our academic endeavors.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition">
              <CardContent className="p-6">
                <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Diversity & Inclusion</h3>
                <p className="text-neutral-medium">
                  We foster an inclusive environment that values diverse perspectives, experiences, and approaches to psychological understanding.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition">
              <CardContent className="p-6">
                <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Ethical Practice</h3>
                <p className="text-neutral-medium">
                  We adhere to the highest ethical standards in research, teaching, and professional practice, respecting human dignity and rights.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition">
              <CardContent className="p-6">
                <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Social Responsibility</h3>
                <p className="text-neutral-medium">
                  We apply psychological knowledge to address social challenges, promote well-being, and contribute positively to our communities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-3xl mb-4">Join Our Community</h2>
          <p className="max-w-2xl mx-auto mb-8 text-blue-100">
            Explore our programs and become part of a dynamic community dedicated to advancing psychological knowledge and practice.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/academics">
              <Button className="bg-white text-primary hover:bg-gray-100">
                Explore Programs
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-primary-dark">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
