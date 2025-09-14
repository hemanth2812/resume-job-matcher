import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Hero from "@/components/Hero";
import FileUpload from "@/components/FileUpload";
import JobDescriptionInput from "@/components/JobDescriptionInput";
import ScoreCard from "@/components/ScoreCard";
import SuggestionsPanel from "@/components/SuggestionsPanel";
import { 
  Download, 
  Sparkles, 
  BarChart3, 
  FileText,
  TrendingUp,
  Award,
  Users,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<File | string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  // Mock analysis function - in real app this would call backend API
  const analyzeResume = async () => {
    if (!resumeFile || !jobDescription) {
      toast({
        title: "Missing files",
        description: "Please upload both a resume and job description.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults = {
        atsScore: 78,
        matchPercentage: 72,
        breakdown: [
          { label: 'Keywords Match', value: 8, max: 10 },
          { label: 'Skills Alignment', value: 7, max: 10 },
          { label: 'Experience Relevance', value: 8, max: 10 },
          { label: 'Format & Structure', value: 9, max: 10 },
        ],
        suggestions: [
          {
            id: '1',
            type: 'add',
            priority: 'high',
            title: 'Add Missing Keywords',
            description: 'Include these high-impact keywords from the job description to improve ATS compatibility.',
            impact: '+12% ATS Score',
            keywords: ['React', 'TypeScript', 'Node.js', 'AWS', 'Microservices']
          },
          {
            id: '2',
            type: 'improve',
            priority: 'high',
            title: 'Quantify Achievements',
            description: 'Add specific metrics and numbers to your accomplishments to demonstrate impact.',
            impact: '+8% Match Score',
            keywords: ['Revenue growth', 'Team leadership', 'Performance metrics']
          },
          {
            id: '3',
            type: 'format',
            priority: 'medium',
            title: 'Optimize Section Headers',
            description: 'Use standard section names that ATS systems easily recognize.',
            impact: '+5% ATS Score'
          },
          {
            id: '4',
            type: 'add',
            priority: 'medium',
            title: 'Technical Skills Section',
            description: 'Create a dedicated technical skills section with relevant technologies.',
            impact: '+6% Match Score',
            keywords: ['JavaScript', 'Python', 'Docker', 'Git']
          },
          {
            id: '5',
            type: 'improve',
            priority: 'low',
            title: 'Professional Summary',
            description: 'Enhance your summary to better align with the job requirements.',
            impact: '+3% Match Score'
          }
        ]
      };
      
      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete!",
        description: "Your resume has been analyzed successfully.",
      });
    }, 2000);
  };

  const exportResume = () => {
    toast({
      title: "Export initiated",
      description: "Your optimized resume will download shortly.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered system analyzes your resume against job descriptions to provide 
              actionable insights and optimization suggestions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Upload Files</h3>
              <p className="text-muted-foreground">
                Upload your resume and the job description you're targeting.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. AI Analysis</h3>
              <p className="text-muted-foreground">
                Our AI analyzes compatibility, keywords, and provides detailed scoring.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Get Insights</h3>
              <p className="text-muted-foreground">
                Receive actionable suggestions and export your optimized resume.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Resume Analysis Tool</h2>
              <p className="text-muted-foreground">
                Upload your resume and job description to get started with AI-powered analysis.
              </p>
            </div>

            <Tabs defaultValue="upload" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
                <TabsTrigger value="results" disabled={!analysisResults}>
                  Results & Suggestions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <FileUpload
                    type="resume"
                    onFileSelect={setResumeFile}
                    selectedFile={resumeFile}
                  />
                  <JobDescriptionInput
                    onJobSelect={setJobDescription}
                    selectedJob={jobDescription}
                  />
                </div>

                <div className="text-center">
                  <Button
                    size="lg"
                    onClick={analyzeResume}
                    disabled={!resumeFile || !jobDescription || isAnalyzing}
                    className="shadow-elegant"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Analyze Resume
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="results" className="space-y-8">
                {analysisResults && (
                  <>
                    <div className="grid lg:grid-cols-3 gap-6 mb-8">
                      <ScoreCard
                        score={analysisResults.atsScore}
                        title="ATS Compatibility Score"
                        description="How well your resume passes Applicant Tracking Systems"
                        breakdown={analysisResults.breakdown}
                      />
                      
                      <Card className="shadow-card bg-gradient-card">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary" />
                            Job Match
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-center mb-2">
                            {analysisResults.matchPercentage}%
                          </div>
                          <p className="text-center text-muted-foreground text-sm">
                            Alignment with job requirements
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="shadow-card bg-gradient-card">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-primary" />
                            Improvements
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-center mb-2">
                            {analysisResults.suggestions.length}
                          </div>
                          <p className="text-center text-muted-foreground text-sm">
                            Actionable suggestions
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <SuggestionsPanel
                          suggestions={analysisResults.suggestions}
                          matchPercentage={analysisResults.matchPercentage}
                        />
                      </div>
                      
                      <div className="space-y-6">
                        <Card className="shadow-card">
                          <CardHeader>
                            <CardTitle>Export Options</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <Button 
                              className="w-full"
                              onClick={exportResume}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download Optimized Resume
                            </Button>
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={exportResume}
                            >
                              <BarChart3 className="mr-2 h-4 w-4" />
                              Export Analysis Report
                            </Button>
                          </CardContent>
                        </Card>
                        
                        <Card className="shadow-card bg-success-light border-success/20">
                          <CardHeader>
                            <CardTitle className="text-success-foreground flex items-center gap-2">
                              <Users className="h-5 w-5" />
                              Success Stats
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3 text-success-foreground">
                            <div className="flex justify-between">
                              <span>Interviews Increased</span>
                              <span className="font-bold">+247%</span>
                            </div>
                            <Separator className="bg-success/20" />
                            <div className="flex justify-between">
                              <span>Average Score Improvement</span>
                              <span className="font-bold">+23 points</span>
                            </div>
                            <Separator className="bg-success/20" />
                            <div className="flex justify-between">
                              <span>Success Rate</span>
                              <span className="font-bold">91%</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;