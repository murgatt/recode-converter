import { ChevronDownIcon, ChevronUpIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fileStatusSchema } from 'schema';
import { useStore } from 'src/store';
import { formatFileSize } from 'src/utils';
import { StreamTable } from '../StreamTable';
import { Button } from '../ui/Button';
import { Card, CardDescription, CardHeader } from '../ui/Card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/Collapsible';
import { Progress } from '../ui/Progress';
import { Tooltip } from '../ui/Tooltip';
import { FileCardIcon } from './FileCardIcon';
import type { VideoFile } from 'schema';

type FileCardProps = {
  file: VideoFile;
};

export const FileCard = ({ file }: FileCardProps) => {
  const { t } = useTranslation();
  const [isStreamTableOpen, setIsStreamTableOpen] = useState(false);
  const toggleStreamTableLabel = isStreamTableOpen ? t('fileList.file.hideStreams') : t('fileList.file.displayStreams');

  const { metadata, name, path, progress, size, status, streamsTitle, streamsToCopy } = file;
  const formattedFileSize = formatFileSize(size);
  const isProgressDisplayed = status === fileStatusSchema.enum.converting && progress > 0;

  const removeFile = useStore(state => state.removeFile);
  const setStreamsToCopy = useStore(state => state.setStreamsToCopy);
  const setStreamsTitle = useStore(state => state.setStreamsTitle);

  const handleStreamCheckedChange = (streamIndex: number, checked: boolean) => {
    const newStreamsToCopy = { ...streamsToCopy, [streamIndex]: checked };
    setStreamsToCopy(path, newStreamsToCopy);
  };

  const handleStreamTitleChange = (streamIndex: number, title: string) => {
    const newStreamsTitle = { ...streamsTitle, [streamIndex]: title };
    setStreamsTitle(path, newStreamsTitle);
  };

  return (
    <Card className="relative">
      <div className="flex items-center px-6">
        <FileCardIcon status={status} />
        <CardHeader className="grow pb-0">
          <h3 className="title-sm">{name}</h3>
          <CardDescription>{formattedFileSize}</CardDescription>
        </CardHeader>
        <Tooltip content={t('fileList.file.remove')}>
          <Button
            aria-label={t('fileList.file.remove')}
            className="shrink-0"
            onClick={() => removeFile(path)}
            size="icon"
            variant="outline"
          >
            <TrashIcon size="16" />
          </Button>
        </Tooltip>
      </div>
      <Collapsible className="mb-1" onOpenChange={setIsStreamTableOpen} open={isStreamTableOpen}>
        <div className="flex justify-center">
          <Tooltip content={toggleStreamTableLabel}>
            <CollapsibleTrigger asChild className="flex justify-center">
              <Button aria-label={toggleStreamTableLabel} disabled={!metadata} size="icon" variant="ghost">
                {isStreamTableOpen ? <ChevronUpIcon size="16" /> : <ChevronDownIcon size="16" />}
              </Button>
            </CollapsibleTrigger>
          </Tooltip>
        </div>
        <CollapsibleContent>
          {metadata && (
            <StreamTable
              onStreamCheckedChange={handleStreamCheckedChange}
              onStreamTitleChange={handleStreamTitleChange}
              streams={metadata.streams}
              streamsTitle={streamsTitle}
              streamsToCopy={streamsToCopy}
            />
          )}
        </CollapsibleContent>
      </Collapsible>
      <div className="h-1">{isProgressDisplayed && <Progress className="h-1 rounded-t-none" value={progress} />}</div>
    </Card>
  );
};
