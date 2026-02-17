import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CompetitionService } from '../../Services/competition.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ICompetition, IProject } from '../../types/interfaces';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ProjectService } from '../../Services/project.service';

@Component({
  selector: 'app-competition-details',
  imports: [DatePipe, ReactiveFormsModule, FormsModule],
  templateUrl: './competition-details.component.html',
  styleUrl: './competition-details.component.css',
})
export class CompetitionDetailsComponent {
  private competitionService = inject(CompetitionService);
  private toast = inject(ToastrService);
  private activedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  projectsArr : any[] = [];
  competition!: ICompetition;
  selectedId = signal<any>(undefined);
  cookieService = inject(CookieService);
  projectService = inject(ProjectService);
  getSpecificCompetitionLoading = signal<boolean>(false);
  createCompetitionLoading = signal<boolean>(false);
  platformId = inject(PLATFORM_ID);

  constructor() {
    debugger;
   if(isPlatformBrowser(this.platformId)){
     if(localStorage.getItem('projectList') != null){
      this.projectsArr = JSON.parse(localStorage.getItem('projectList')!) || [];
      console.log(this.projectsArr);
    }else{
      this.projectsArr = [];
    }
   }


    this.activedRoute.paramMap.subscribe((params) => {
      const id: string | null = params.get('id');
      this.selectedId.set(Number(id));
      this.getCompetition(Number(id));
    });
  }

  addProjectForm = new FormGroup({
    competitionId: new FormControl<number>(0),
    userId: new FormControl<number>(0),
    description: new FormControl('',[Validators.min(3)]),
    status: new FormControl('created'),
    rank: new FormControl<number>(0),
    submissionId: new FormControl<number>(0),
    submissionDate: new FormControl(),
    githubLink: new FormControl('',[Validators.min(3)]),
    projectTitle: new FormControl('',[Validators.min(3)]),
  });

  getCompetition(id: number) {
    debugger;
    this.getSpecificCompetitionLoading.set(true);
    this.competitionService.getCompetitionById(id).subscribe({
      next: (res) => {
        this.competition = res;
        this.getSpecificCompetitionLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.getSpecificCompetitionLoading.set(false);
      },
    });
  }

  createProject() {
    this.addProjectForm.patchValue({ competitionId: Number(this.selectedId()) });
    if(isPlatformBrowser(this.platformId)){
      this.addProjectForm.patchValue({ userId: Number(this.cookieService.get('userId')) });
    }
    if(!this.addProjectForm.valid && this.addProjectForm.errors){
      this.toast.error(`Please Enter Valid Data`);
      return;
    }
    this.createCompetitionLoading.set(true);
    this.projectService.createProject(this.addProjectForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.toast.success('Project Created Successfully');
        this.projectsArr.push(res);
        console.log(res);
        localStorage.setItem('projectList' , JSON.stringify(this.projectsArr || []));
        this.addProjectForm.reset();
        this.createCompetitionLoading.set(false);
      },
      error: (err) => {
        this.toast.error(`Maximum 2 project submissions per user per competition.`);
        this.addProjectForm.reset();
        this.createCompetitionLoading.set(false);
      },
    });
  }
}
