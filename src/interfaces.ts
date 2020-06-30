export interface IJob {
  id: string;
  type: string;
  url: string;
  created_at: string;
  company: string | null;
  company_url: string | null;
  location: string;
  title: string;
  description: string;
  how_to_apply: string;
  company_logo: string | null;
}

export interface IJobFilter {
  description: string;
  location: string;
  full_time: boolean;
}
