export enum BlockType {
  PARAGRAPH = 'paragraph',
  DEFINITION = 'definition',
  THEOREM = 'theorem',
  PROOF = 'proof',
  EXAMPLE = 'example',
  EXERCISE = 'exercise',
  IMAGE = 'image',
  LATEX = 'latex' // Block math
}

export interface ContentBlock {
  type: BlockType;
  title?: string;
  content: string; // Defines the latex content or text content
  id?: string;
}

export interface Section {
  id: string;
  title: string;
  blocks: ContentBlock[];
}

export interface Chapter {
  id: string;
  title: string;
  sections: Section[];
}

export interface CourseData {
  title: string;
  author: string;
  institution: string;
  email: string;
  chapters: Chapter[];
}