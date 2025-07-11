import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react'; // For dynamic icons

interface DataWidgetProps {
  title: string;
  value: string | number;
  description?: string;
  Icon?: LucideIcon; // Optional icon component
  className?: string;
}

const DataWidget: React.FC<DataWidgetProps> = ({
  title,
  value,
  description,
  Icon,
  className,
}) => {
  console.log("Rendering DataWidget:", title);
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default DataWidget;