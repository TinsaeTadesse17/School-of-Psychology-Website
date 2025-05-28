import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FacultyMember } from '@shared/schema';
import FacultyCard from '@/components/FacultyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search } from 'lucide-react';

export default function FacultyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialization, setSpecialization] = useState('all');

  const { data: facultyMembers, isLoading } = useQuery<FacultyMember[]>({
    queryKey: ['/api/faculty'],
  });

  const filteredFaculty = facultyMembers?.filter(faculty => {
    const matchesSearch = searchTerm === '' || 
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialization = specialization === 'all' || 
      faculty.specialization.toLowerCase().includes(specialization.toLowerCase());
    
    return matchesSearch && matchesSpecialization;
  });

  const specializations = [
    'Clinical Psychology',
    'Cognitive Psychology',
    'Developmental Psychology',
    'Social Psychology',
    'Educational Psychology',
    'Neuropsychology'
  ];
  
  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4">Faculty & Staff</h1>
          <p className="max-w-3xl mx-auto text-lg text-blue-100">
            Meet our distinguished faculty members who are dedicated to excellence in teaching, research, and community service.
          </p>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="w-full md:w-64">
              <Select
                value={specialization}
                onValueChange={setSpecialization}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  {specializations.map(spec => (
                    <SelectItem key={spec} value={spec.toLowerCase()}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Faculty List */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-2xl mb-8 text-primary">
            {filteredFaculty ? `${filteredFaculty.length} Faculty Members` : 'Faculty Members'}
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
                  <div className="h-64 bg-neutral-light"></div>
                  <div className="p-4">
                    <div className="h-5 bg-neutral-light rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-neutral-light rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-neutral-light rounded w-full mb-3"></div>
                    <div className="h-4 bg-neutral-light rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredFaculty && filteredFaculty.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredFaculty.map(faculty => (
                <FacultyCard key={faculty.id} faculty={faculty} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold mb-2">No faculty members found</h3>
              <p className="text-neutral-medium mb-4">
                Try adjusting your search criteria or clear filters.
              </p>
              <Button onClick={() => {
                setSearchTerm('');
                setSpecialization('all');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Department Leadership */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-2xl mb-8 text-primary">Department Leadership</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="font-heading font-semibold text-lg mb-1">Department Chair</h3>
              <p className="text-primary font-medium mb-2">Dr. Solomon Girma</p>
              <p className="text-sm text-neutral-medium mb-4">
                Oversees the department's academic programs, research initiatives, and administrative functions.
              </p>
              <p className="text-sm">
                <strong>Email:</strong> solomon.girma@aau.edu.et<br />
                <strong>Office:</strong> Psychology Building, Room 301<br />
                <strong>Phone:</strong> +251-111-232055
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="font-heading font-semibold text-lg mb-1">Director of Graduate Studies</h3>
              <p className="text-primary font-medium mb-2">Dr. Meron Tadesse</p>
              <p className="text-sm text-neutral-medium mb-4">
                Coordinates the graduate programs and advises graduate students on academic matters.
              </p>
              <p className="text-sm">
                <strong>Email:</strong> meron.tadesse@aau.edu.et<br />
                <strong>Office:</strong> Psychology Building, Room 204<br />
                <strong>Phone:</strong> +251-111-232057
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="font-heading font-semibold text-lg mb-1">Director of Undergraduate Studies</h3>
              <p className="text-primary font-medium mb-2">Dr. Daniel Abebe</p>
              <p className="text-sm text-neutral-medium mb-4">
                Manages the undergraduate curriculum and student advising.
              </p>
              <p className="text-sm">
                <strong>Email:</strong> daniel.abebe@aau.edu.et<br />
                <strong>Office:</strong> Psychology Building, Room 105<br />
                <strong>Phone:</strong> +251-111-232058
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Staff Directory */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-2xl mb-8 text-primary">Administrative Staff</h2>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Kidist Hailu</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Department Administrator</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    kidist.hailu@aau.edu.et
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    +251-111-232060
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Dawit Mengistu</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Student Affairs Coordinator</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    dawit.mengistu@aau.edu.et
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    +251-111-232061
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Sara Tekle</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Administrative Assistant</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    sara.tekle@aau.edu.et
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    +251-111-232062
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Yonas Bekele</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">IT Support Specialist</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    yonas.bekele@aau.edu.et
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    +251-111-232063
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
