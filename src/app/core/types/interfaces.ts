export interface IRegisterFormType {
  fullName: string;
  email: string;
  collageName: string;
  password: string;
  role: string;
}


export interface ICompetition{
  competitionId: number
  title: string
  description: string
  startDate: string
  endDate: string
  status: string
}



export interface IProject {
  submissionId: number
  competitionId: number
  userId: number
  projectTitle: string
  description: string
  githubLink: string
  submissionDate: string
  status: string
  rank: number
}