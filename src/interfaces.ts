export interface Job {
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
