import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function HeroSection() {
  return (
    <section className="relative bg-gray-900 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center z-10">
        <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
          Welcome to the Department of Psychology
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mb-8">
          Advancing psychological science and practice through research, education, and community engagement at Addis Ababa University
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/academics">
            <Button className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-md transition">
              Explore Programs
            </Button>
          </Link>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <img 
          src="/AAU-slams-association.jpg" 
          alt="AAU Psychology Department Campus" 
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
