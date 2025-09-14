import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Lightbulb, 
  Plus, 
  Minus, 
  AlertCircle, 
  Target,
  Zap,
  CheckCircle2,
  Copy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Suggestion {
  id: string;
  type: 'add' | 'remove' | 'improve' | 'format';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  keywords?: string[];
}

interface SuggestionsPanelProps {
  suggestions: Suggestion[];
  matchPercentage: number;
}

const SuggestionsPanel = ({ suggestions, matchPercentage }: SuggestionsPanelProps) => {
  const { toast } = useToast();

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'add': return Plus;
      case 'remove': return Minus;
      case 'improve': return Zap;
      case 'format': return Target;
      default: return Lightbulb;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const copyKeywords = (keywords: string[]) => {
    navigator.clipboard.writeText(keywords.join(', '));
    toast({
      title: "Keywords copied",
      description: "Keywords have been copied to your clipboard.",
    });
  };

  const highPriority = suggestions.filter(s => s.priority === 'high');
  const mediumPriority = suggestions.filter(s => s.priority === 'medium');
  const lowPriority = suggestions.filter(s => s.priority === 'low');

  return (
    <div className="space-y-6">
      {/* Match Overview */}
      <Card className="shadow-card bg-gradient-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Job Match Analysis
            </CardTitle>
            <Badge 
              variant={matchPercentage >= 80 ? 'default' : matchPercentage >= 60 ? 'secondary' : 'destructive'}
              className={`text-lg px-3 py-1 ${
                matchPercentage >= 80 
                  ? 'bg-success text-success-foreground' 
                  : matchPercentage >= 60
                  ? 'bg-warning text-warning-foreground'
                  : 'bg-destructive text-destructive-foreground'
              }`}
            >
              {matchPercentage}% Match
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {matchPercentage >= 80 
              ? "Excellent match! Your resume aligns well with this job description."
              : matchPercentage >= 60
              ? "Good match with room for improvement. Consider the suggestions below."
              : "Low match detected. Focus on high-priority improvements for better results."
            }
          </p>
        </CardContent>
      </Card>

      {/* High Priority Suggestions */}
      {highPriority.length > 0 && (
        <Card className="shadow-card border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              High Priority ({highPriority.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {highPriority.map((suggestion, index) => (
              <SuggestionItem 
                key={suggestion.id} 
                suggestion={suggestion} 
                onCopyKeywords={copyKeywords}
                isLast={index === highPriority.length - 1}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Medium Priority Suggestions */}
      {mediumPriority.length > 0 && (
        <Card className="shadow-card border-warning/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <Zap className="h-5 w-5" />
              Medium Priority ({mediumPriority.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mediumPriority.map((suggestion, index) => (
              <SuggestionItem 
                key={suggestion.id} 
                suggestion={suggestion} 
                onCopyKeywords={copyKeywords}
                isLast={index === mediumPriority.length - 1}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Low Priority Suggestions */}
      {lowPriority.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="h-5 w-5" />
              Nice to Have ({lowPriority.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowPriority.map((suggestion, index) => (
              <SuggestionItem 
                key={suggestion.id} 
                suggestion={suggestion} 
                onCopyKeywords={copyKeywords}
                isLast={index === lowPriority.length - 1}
              />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

interface SuggestionItemProps {
  suggestion: Suggestion;
  onCopyKeywords: (keywords: string[]) => void;
  isLast: boolean;
}

const SuggestionItem = ({ suggestion, onCopyKeywords, isLast }: SuggestionItemProps) => {
  const Icon = getSuggestionIcon(suggestion.type);
  
  return (
    <div>
      <div className="flex gap-3">
        <div className={`mt-1 p-1 rounded-full ${
          suggestion.priority === 'high' 
            ? 'bg-destructive/10 text-destructive' 
            : suggestion.priority === 'medium'
            ? 'bg-warning/10 text-warning'
            : 'bg-muted text-muted-foreground'
        }`}>
          <Icon className="h-4 w-4" />
        </div>
        
        <div className="flex-1 space-y-2">
          <div>
            <h4 className="font-medium">{suggestion.title}</h4>
            <p className="text-sm text-muted-foreground">{suggestion.description}</p>
          </div>
          
          <Badge variant="outline" className="text-xs">
            Impact: {suggestion.impact}
          </Badge>
          
          {suggestion.keywords && suggestion.keywords.length > 0 && (
            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">Suggested Keywords:</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onCopyKeywords(suggestion.keywords!)}
                  className="h-6 px-2"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {suggestion.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {!isLast && <Separator className="my-4" />}
    </div>
  );
};

const getSuggestionIcon = (type: string) => {
  switch (type) {
    case 'add': return Plus;
    case 'remove': return Minus;
    case 'improve': return Zap;
    case 'format': return Target;
    default: return Lightbulb;
  }
};

export default SuggestionsPanel;