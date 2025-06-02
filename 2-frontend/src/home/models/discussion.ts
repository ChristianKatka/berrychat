export interface DiscussionMetaData {
  thread_id: string;
  run_id: string;
}

export interface Discussion {
  role: string;
  content: string;
  actions?: any;
  metaData?: any;
}
