import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { Card, CardContent } from '@/components/ui/card';

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4">Contact Us</h1>
          <p className="max-w-3xl mx-auto text-lg text-blue-100">
            We're here to answer your questions and provide you with more information about our programs, research, and services.
          </p>
        </div>
      </div>
      
      {/* Contact Information and Form */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
              <h2 className="font-heading font-bold text-2xl mb-2 text-primary">Contact Us</h2>
              <div className="w-20 h-1 bg-primary mb-6"></div>
              <p className="text-neutral-medium mb-6">
                We're here to answer your questions and provide you with more information about our programs, research, and services.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <MapPin className="text-primary mr-3 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h3 className="font-heading font-semibold text-lg">Department of Psychology</h3>
                    <p className="text-neutral-medium">Sidist Kilo Campus, King George VI St.<br/>Addis Ababa, Ethiopia</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="text-primary mr-3 h-6 w-6 flex-shrink-0" />
                  <p className="text-neutral-medium">+251-111-232050</p>
                </div>
                
                <div className="flex items-center">
                  <Mail className="text-primary mr-3 h-6 w-6 flex-shrink-0" />
                  <p className="text-neutral-medium">psychology@aau.edu.et</p>
                </div>
                
                <div className="flex items-center">
                  <Clock className="text-primary mr-3 h-6 w-6 flex-shrink-0" />
                  <p className="text-neutral-medium">Monday - Friday: 8:00 AM - 5:00 PM</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-heading font-semibold text-lg mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-full hover:bg-primary-dark transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-full hover:bg-primary-dark transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </a>
                  <a href="mailto:psychology@aau.edu.et" className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-full hover:bg-primary-dark transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 lg:pl-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-xl mb-4">Send Us a Message</h3>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-2xl mb-2 text-primary">Find Us</h2>
          <div className="w-20 h-1 bg-primary mb-6"></div>
          
          <div className="bg-gray-200 rounded-lg overflow-hidden h-96">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5512786812856!2d38.76118461478484!3d9.037974493527945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8f68a6697c61%3A0x24ea1be5795840eb!2sAddis%20Ababa%20University!5e0!3m2!1sen!2set!4v1627652456214!5m2!1sen!2set" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
              title="Addis Ababa University Map"
            ></iframe>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-2xl mb-2 text-primary">Frequently Asked Questions</h2>
          <div className="w-20 h-1 bg-primary mb-6"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-lg mb-2">How can I apply to the Psychology programs?</h3>
                <p className="text-neutral-medium">
                  Applications for our programs are processed through the university's central admissions office. Visit the Admissions section of our website for detailed information about application requirements and deadlines.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-lg mb-2">What career opportunities are available for Psychology graduates?</h3>
                <p className="text-neutral-medium">
                  Our graduates pursue diverse careers in clinical settings, research institutions, educational organizations, NGOs, corporate environments, and government agencies. Visit our Career Development page for more information.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-lg mb-2">Does the department offer research opportunities for students?</h3>
                <p className="text-neutral-medium">
                  Yes, we encourage students to participate in research projects. Undergraduate and graduate students can work as research assistants in our research centers or collaborate with faculty members on their research initiatives.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-lg mb-2">How can I schedule a visit to the department?</h3>
                <p className="text-neutral-medium">
                  You can schedule a department visit by contacting our administrative office via email or phone. We offer guided tours for prospective students and visitors interested in learning more about our programs and facilities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
