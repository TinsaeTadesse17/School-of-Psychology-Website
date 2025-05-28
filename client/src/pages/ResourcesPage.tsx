import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter,
  CardDescription
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CourseMaterial } from '@shared/schema';
import { FileText, Download, Search, FileArchive, FileImage, BookOpen } from 'lucide-react';

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: materials, isLoading } = useQuery<CourseMaterial[]>({
    queryKey: ['/api/resources/student'],
  });

  const filteredMaterials = materials?.filter(material => 
    material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'lecture':
        return <FileText className="h-10 w-10 text-primary" />;
      case 'assignment':
        return <BookOpen className="h-10 w-10 text-orange-500" />;
      case 'reference':
        return <FileArchive className="h-10 w-10 text-green-500" />;
      default:
        return <FileImage className="h-10 w-10 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Resources</h1>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="lecture">Lectures</TabsTrigger>
          <TabsTrigger value="assignment">Assignments</TabsTrigger>
          <TabsTrigger value="reference">Reference Materials</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded mb-2 w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
                    <div className="h-12 bg-gray-200 rounded w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredMaterials && filteredMaterials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMaterials.map((material) => (
                <Card key={material.id} className="flex flex-col h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {getFileIcon(material.type)}
                      <div>
                        <CardTitle className="text-base">{material.title}</CardTitle>
                        <CardDescription>{material.type}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">
                      {material.description || 'No description available.'}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full flex gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-medium text-lg mb-2">No resources found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm
                    ? "Try adjusting your search criteria"
                    : "There are no resources available at this time"}
                </p>
                {searchTerm && (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchTerm('')}
                  >
                    Clear Search
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {['lecture', 'assignment', 'reference'].map((type) => (
          <TabsContent key={type} value={type} className="space-y-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-gray-200 rounded mb-2 w-2/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
                      <div className="h-12 bg-gray-200 rounded w-full"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {filteredMaterials && filteredMaterials.filter(m => m.type.toLowerCase() === type).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredMaterials.filter(m => m.type.toLowerCase() === type).map((material) => (
                      <Card key={material.id} className="flex flex-col h-full">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            {getFileIcon(material.type)}
                            <div>
                              <CardTitle className="text-base">{material.title}</CardTitle>
                              <CardDescription>{material.type}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-sm text-muted-foreground">
                            {material.description || 'No description available.'}
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full flex gap-2">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <h3 className="font-medium text-lg mb-2">No {type} resources found</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchTerm
                          ? "Try adjusting your search criteria"
                          : `There are no ${type} resources available at this time`}
                      </p>
                      {searchTerm && (
                        <Button 
                          variant="outline" 
                          onClick={() => setSearchTerm('')}
                        >
                          Clear Search
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <Card className="bg-primary-light bg-opacity-10 border border-primary-light">
        <CardHeader>
          <CardTitle className="text-primary">Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            If you need assistance accessing any resources or have questions about course materials, 
            please contact the department or your course instructor.
          </p>
          <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white">
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
