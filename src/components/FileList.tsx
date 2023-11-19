import { FileCard } from './FileCard';

export const FileList = () => {
  return (
    <ul className="flex flex-col gap-3">
      <li>
        <FileCard />
      </li>
      <li>
        <FileCard />
      </li>
    </ul>
  );
};
