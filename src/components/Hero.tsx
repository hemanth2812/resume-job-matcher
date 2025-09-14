import { Button } from "@/components/ui/button";
import { Upload, Target, BarChart3, FileCheck } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Optimize Your Resume with
              <span className="block bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
                AI-Powered ATS Analysis
              </span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Upload your resume and job description to get instant ATS scoring, 
              detailed feedback, and actionable suggestions to land more interviews.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" variant="secondary" className="shadow-glow">
                <Upload className="mr-2 h-5 w-5" />
                Analyze My Resume
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                View Demo
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-3">
                  <Target className="h-8 w-8 text-white mx-auto" />
                </div>
                <h3 className="font-semibold text-white mb-1">ATS Scoring</h3>
                <p className="text-sm text-white/70">Get instant compatibility scores</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-3">
                  <BarChart3 className="h-8 w-8 text-white mx-auto" />
                </div>
                <h3 className="font-semibold text-white mb-1">Smart Analysis</h3>
                <p className="text-sm text-white/70">AI-powered recommendations</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-3">
                  <FileCheck className="h-8 w-8 text-white mx-auto" />
                </div>
                <h3 className="font-semibold text-white mb-1">Export Optimized</h3>
                <p className="text-sm text-white/70">Download improved resume</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-primary rounded-2xl blur-2xl opacity-30"></div>
            <img 
              src={heroImage} 
              alt="Resume ATS Analysis Dashboard" 
              className="relative w-full h-auto rounded-2xl shadow-elegant"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;