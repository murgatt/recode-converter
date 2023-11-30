import { AlertOctagonIcon, CheckCircleIcon, FileVideoIcon, Loader2Icon } from 'lucide-react';
import { fileStatusSchema } from 'src/types/file.types';
import type { FileStatus } from 'src/types/file.types';

type FileCardIconProps = {
  status: FileStatus;
};

export const FileCardIcon = ({ status }: FileCardIconProps) => {
  switch (status) {
    case fileStatusSchema.enum.imported:
      return <FileVideoIcon className="shrink-0" data-testid="FileCardIcon_fileIcon" size="24" />;
    case fileStatusSchema.enum.converting:
      return <Loader2Icon className="shrink-0 animate-spin" data-testid="FileCardIcon_loaderIcon" size="24" />;
    case fileStatusSchema.enum.conversionSuccess:
      return <CheckCircleIcon className="shrink-0 text-success" data-testid="FileCardIcon_checkIcon" size="24" />;
    case fileStatusSchema.enum.conversionError:
      return <AlertOctagonIcon className="shrink-0 text-destructive" data-testid="FileCardIcon_alertIcon" size="24" />;
  }
};
