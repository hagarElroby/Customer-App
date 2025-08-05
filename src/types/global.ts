export interface SectionTitleProps {
  title: string;
  result?: boolean;
  resultValue?: number;
  children?: React.ReactNode;
  className?: string;
  height?: string;
}

export type SubCategory = {
  _id: string;
  name: string;
  category: {
    id: string;
    name: string;
  };
};

export type RejectionReasons =
  | "INAPPROPRIATE_CONTENT"
  | "VIOLATION_OF_POLICY"
  | "INCOMPLETE_INFORMATION"
  | "MEDIA_ISSUE"
  | "SPELLING_MISTAKE"
  | "OTHER";

export type RejectionReasonObj = {
  reason: RejectionReasons;
  notes: string;
};
