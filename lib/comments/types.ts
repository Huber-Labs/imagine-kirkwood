export interface ConceptComment {
  id: string;
  authorDisplayName: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  isOwn: boolean;
}

export interface AdminConceptComment {
  id: string;
  placeName: string;
  conceptSlug: string;
  conceptTitle: string;
  authorDisplayName: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export const CONCEPT_COMMENT_MAX_LENGTH = 400;
