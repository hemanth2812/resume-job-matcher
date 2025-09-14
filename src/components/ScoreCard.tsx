import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

interface ScoreCardProps {
  score: number;
  title: string;
  description?: string;
  breakdown?: { label: string; value: number; max: number }[];
}

const ScoreCard = ({ score, title, description, breakdown }: ScoreCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'success';
    if (score >= 70) return 'warning';
    return 'destructive';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 85) return CheckCircle;
    if (score >= 70) return TrendingUp;
    return AlertTriangle;
  };

  const scoreColor = getScoreColor(score);
  const ScoreIcon = getScoreIcon(score);

  return (
    <Card className="shadow-card bg-gradient-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge 
            variant={scoreColor === 'success' ? 'default' : 'secondary'}
            className={`${
              scoreColor === 'success' 
                ? 'bg-success text-success-foreground' 
                : scoreColor === 'warning'
                ? 'bg-warning text-warning-foreground'
                : 'bg-destructive text-destructive-foreground'
            }`}
          >
            <ScoreIcon className="h-3 w-3 mr-1" />
            {score}/100
          </Badge>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Score</span>
            <span className="font-medium">{score}%</span>
          </div>
          <Progress 
            value={score} 
            className={`h-3 ${
              scoreColor === 'success' 
                ? '[&>div]:bg-success' 
                : scoreColor === 'warning'
                ? '[&>div]:bg-warning'
                : '[&>div]:bg-destructive'
            }`}
          />
        </div>

        {breakdown && (
          <div className="space-y-3 pt-2 border-t">
            <h4 className="text-sm font-medium">Breakdown</h4>
            {breakdown.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.value}/{item.max}</span>
                </div>
                <Progress 
                  value={(item.value / item.max) * 100} 
                  className="h-1"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScoreCard;