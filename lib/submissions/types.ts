export const IDEA_TITLE_MAX_LENGTH = 160;
export const IDEA_DESCRIPTION_MAX_LENGTH = 4000;
export const IDEA_NAME_MAX_LENGTH = 120;
export const IDEA_EMAIL_MAX_LENGTH = 254;
export const IDEA_PHOTO_MAX_BYTES = 8 * 1024 * 1024; // 8 MB
export const IDEA_PHOTO_ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/heic",
  "image/heif",
];

export type IdeaSubmissionStatus = "new" | "reviewed" | "archived";

export type AdminIdeaSubmission = {
  id: string;
  title: string;
  description: string;
  submitterName: string | null;
  submitterEmail: string | null;
  photoUrl: string | null;
  status: IdeaSubmissionStatus;
  createdAt: string;
  updatedAt: string;
};
