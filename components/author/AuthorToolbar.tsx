"use client";

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
      <button
        type="button"
        className={`author-mode-toolbar__button${scoutToolActive ? " author-mode-toolbar__button--active" : ""}`}
        onClick={onScoutPlace}
      >
        Scout Place
      </button>
      <button
        type="button"
        className="author-mode-toolbar__button"
        onClick={onDelete}
        disabled={!canDelete}
      >
        Delete
      </button>
      <button
        type="button"
        className="author-mode-toolbar__button"
        onClick={onCopyMapEntry}
        disabled={!canCopyMapEntry}
      >
        Copy Map Entry
      </button>
      <button
        type="button"
        className="author-mode-toolbar__button"
        onClick={onCopyPlaceStub}
        disabled={!canCopyPlaceStub}
      >
        Copy Place Stub
      </button>
      <button
        type="button"
        className="author-mode-toolbar__button"
        onClick={onCopyAllMapEntries}
      >
        Copy All Map Entries
      </button>
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
