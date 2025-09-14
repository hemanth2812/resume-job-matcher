import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, File, X, FileText, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  type: 'resume' | 'job';
  onFileSelect: (file: File) => void;
  selectedFile?: File | null;
}

const FileUpload = ({ type, onFileSelect, selectedFile }: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const isValidFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const isValidType = validTypes.includes(file.type);
    const hasValidExtension = file.name.endsWith('.docx') || file.name.endsWith('.pdf') || file.name.endsWith('.txt');
    
    console.log('File validation:', {
      fileName: file.name,
      fileType: file.type,
      validTypes,
      isValidType,
      hasValidExtension,
      finalResult: isValidType || hasValidExtension
    });
    
    return isValidType || hasValidExtension;
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && isValidFile(file)) {
      onFileSelect(file);
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been selected for analysis.`,
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOCX, or TXT file.",
        variant: "destructive",
      });
    }
  }, [onFileSelect, toast]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('File selected:', file);
    console.log('File type:', file?.type);
    console.log('File name:', file?.name);
    
    if (file) {
      const isValid = isValidFile(file);
      console.log('Is file valid:', isValid);
      
      if (isValid) {
        console.log('Calling onFileSelect with file:', file);
        onFileSelect(file);
        toast({
          title: "File uploaded successfully",
          description: `${file.name} has been selected for analysis.`,
        });
      } else {
        console.log('File validation failed');
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, DOCX, or TXT file.",
          variant: "destructive",
        });
      }
    } else {
      console.log('No file selected');
    }
  }, [onFileSelect, toast]);

  const removeFile = () => {
    onFileSelect(null as any);
  };

  const icon = type === 'resume' ? FileText : Briefcase;
  const IconComponent = icon;

  return (
    <Card className="shadow-card">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <IconComponent className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">
            {type === 'resume' ? 'Upload Resume' : 'Upload Job Description'}
          </h3>
        </div>

        {selectedFile ? (
          <div className="bg-success-light border border-success/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <File className="h-8 w-8 text-success" />
                <div>
                  <p className="font-medium text-success-foreground">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={removeFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-all",
              isDragOver 
                ? "border-primary bg-primary/5" 
                : "border-muted-foreground/25 hover:border-primary/50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">
              Drag & drop your {type === 'resume' ? 'resume' : 'job description'} here
            </p>
            <p className="text-muted-foreground mb-4">
              or click to browse files
            </p>
            <input
              type="file"
              accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
              onChange={handleFileSelect}
              className="hidden"
              id={`file-${type}`}
              ref={(input) => {
                if (input) {
                  (window as any)[`fileInput_${type}`] = input;
                }
              }}
            />
            <Button 
              variant="outline" 
              onClick={() => {
                console.log('Button clicked, triggering file input');
                const input = document.getElementById(`file-${type}`) as HTMLInputElement;
                console.log('Found input element:', input);
                if (input) {
                  input.click();
                  console.log('Input click triggered');
                } else {
                  console.error('Input element not found');
                }
              }}
              className="cursor-pointer"
            >
              Choose File
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Supports PDF, DOCX, and TXT files
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUpload;