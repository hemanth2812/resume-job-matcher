import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Briefcase, FileText, Type } from "lucide-react";
import FileUpload from "./FileUpload";

interface JobDescriptionInputProps {
  onJobSelect: (file: File | string) => void;
  selectedJob?: File | string | null;
}

const JobDescriptionInput = ({ onJobSelect, selectedJob }: JobDescriptionInputProps) => {
  const [textInput, setTextInput] = useState('');

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      onJobSelect(textInput);
    }
  };

  const handleFileSelect = (file: File) => {
    onJobSelect(file);
  };

  const isFileSelected = selectedJob instanceof File;
  const isTextSelected = typeof selectedJob === 'string';

  return (
    <Card className="shadow-card">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Job Description</h3>
        </div>

        <Tabs defaultValue="paste" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="paste" className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              Paste Text
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Upload File
            </TabsTrigger>
          </TabsList>

          <TabsContent value="paste" className="space-y-4">
            {isTextSelected ? (
              <div className="bg-success-light border border-success/20 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-success-foreground mb-2">Job description added</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedJob as string).length} characters
                    </p>
                    <div className="mt-2 p-2 bg-muted rounded text-sm max-h-20 overflow-y-auto">
                      {(selectedJob as string).substring(0, 200)}
                      {(selectedJob as string).length > 200 && '...'}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => onJobSelect(null as any)}>
                    Clear
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Textarea
                  placeholder="Paste the job description here..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="min-h-[200px] resize-y"
                />
                <Button 
                  onClick={handleTextSubmit}
                  disabled={!textInput.trim()}
                  className="w-full"
                >
                  Use This Job Description
                </Button>
              </>
            )}
          </TabsContent>

          <TabsContent value="upload">
            <div className="mt-4">
              <FileUpload
                type="job"
                onFileSelect={handleFileSelect}
                selectedFile={isFileSelected ? selectedJob as File : null}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default JobDescriptionInput;