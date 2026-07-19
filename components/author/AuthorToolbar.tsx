"use client";

import {
  ClipboardIcon,
  FileTextIcon,
  FolderOutputIcon,
  MapPinPlusIcon,
  Trash2Icon,
} from "@/components/author/AuthorToolbarIcons";

interface AuthorToolbarProps {
  scoutToolActive: boolean;
  canDelete: boolean;
  canCopyPlaceStub: boolean;
  canCopyMapEntry: boolean;
  onScoutPlace: () => void;
  onDelete: () => void;
  onCopyMapEntry: () => void;
  onCopyPlaceStub: () => void;
  onCopyAllMapEntries: () => void;
}

function ToolbarButton({
  label,
  icon,
  onClick,
  disabled = false,
  className = "",
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`author-mode-toolbar__button${className ? ` ${className}` : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export function AuthorToolbar({
  scoutToolActive,
  canDelete,
  canCopyPlaceStub,
  canCopyMapEntry,
  onScoutPlace,
  onDelete,
  onCopyMapEntry,
  onCopyPlaceStub,
  onCopyAllMapEntries,
}: AuthorToolbarProps) {
  return (
    <div className="author-mode-toolbar" role="toolbar" aria-label="Author mode tools">
      <div className="author-mode-toolbar__group">
        <ToolbarButton
          label="Add New Place"
          icon={<MapPinPlusIcon />}
          onClick={onScoutPlace}
          className={scoutToolActive ? "author-mode-toolbar__button--active" : ""}
        />
        <ToolbarButton
          label="Delete Draft"
          icon={<Trash2Icon />}
          onClick={onDelete}
          disabled={!canDelete}
          className="author-mode-toolbar__button--destructive"
        />
      </div>

      <div className="author-mode-toolbar__divider" aria-hidden="true" />

      <div className="author-mode-toolbar__group">
        <ToolbarButton
          label="Copy Coordinates"
          icon={<ClipboardIcon />}
          onClick={onCopyMapEntry}
          disabled={!canCopyMapEntry}
        />
        <ToolbarButton
          label="Copy Site Record"
          icon={<FileTextIcon />}
          onClick={onCopyPlaceStub}
          disabled={!canCopyPlaceStub}
        />
        <ToolbarButton
          label="Export All Coordinates"
          icon={<FolderOutputIcon />}
          onClick={onCopyAllMapEntries}
        />
      </div>
    </div>
  );
}

interface AuthorModeFeedbackProps {
  message: string | null;
}

export function AuthorModeFeedback({ message }: AuthorModeFeedbackProps) {
  if (!message) return null;
  return <p className="author-mode-panel__feedback">{message}</p>;
}
