import { FileVideoIcon, TrashIcon } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/Card';

export const FileCard = () => {
  return (
    <Card>
      <div className="flex items-center px-6">
        <FileVideoIcon size="24" />
        <CardHeader className="grow">
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <Button size="icon" variant="outline">
          <TrashIcon size="16" />
        </Button>
      </div>
    </Card>
  );
};
