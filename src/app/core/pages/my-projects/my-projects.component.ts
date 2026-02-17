import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { ProjectService } from '../../Services/project.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-projects',
  imports: [DatePipe , ReactiveFormsModule , FormsModule],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.css',
})
export class MyProjectsComponent {
  myProjectList = signal<any[]>([]);
  private platFormId = inject(PLATFORM_ID);
  private projectService = inject(ProjectService);
  private toast = inject(ToastrService);
  updateModelShow = signal<boolean>(false);
  updateModelLoading = signal<boolean>(false);
  selectedId = signal<number>(0);

  updateProjectForm = new FormGroup({
    competitionId: new FormControl<number>(0),
    userId: new FormControl<number>(0),
    description: new FormControl(''),
    status: new FormControl('created'),
    rank: new FormControl<number>(0),
    submissionId: new FormControl<number>(0),
    submissionDate: new FormControl(),
    githubLink: new FormControl(''),
    projectTitle: new FormControl(''),
  });


  constructor() {
    if (isPlatformBrowser(this.platFormId)) {
      if (localStorage.getItem('projectList')) {
        this.myProjectList.set(JSON.parse(localStorage.getItem('projectList')!));
      } else {
        this.myProjectList.set([]);
      }
    }
  }

  deleteProject(id: number) {
    this.projectService.deleteProject(id).subscribe({
      next: (res: any) => {
        this.toast.success(res?.message!);
        const filteredArr = this.myProjectList().filter((project) => {
          return project.submissionId != id;
        });
        this.myProjectList.set(filteredArr);
        localStorage.setItem('projectList', JSON.stringify(filteredArr));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handelUpdate(submissionId:number) {
    const updateAbleObj = this.myProjectList().find((project)=>{
    return project.submissionId == submissionId;
    });
    this.updateProjectForm.patchValue(updateAbleObj);
    this.updateModelShow.set(true);
    this.selectedId.set(submissionId);
    console.log(submissionId);
  }

  updateProject() {
    if(this.updateProjectForm.errors && !this.updateProjectForm.valid){
      this.toast.error(`Please Write Valid Data`);
      return;
    }


    this.updateModelLoading.set(true);

    this.projectService.updateProject(this.updateProjectForm.value,this.selectedId()).subscribe({
      next:(res:any)=>{
        this.toast.success(res?.message);
        let updateProjectIndex = this.myProjectList().findIndex((project)=>{
          return project.submissionId == this.selectedId();
        });
        if(isPlatformBrowser(this.platFormId)){
        this.myProjectList()[updateProjectIndex] = this.updateProjectForm.value;
        localStorage.setItem('projectList',JSON.stringify(this.myProjectList()));
       }
       this.updateModelShow.set(false);
       this.updateProjectForm.reset();
       this.updateModelLoading.set(false);
      },
      error:(err)=>{
       this.toast.error(`Something is Error`);
       this.updateModelShow.set(false);
       this.updateModelLoading.set(false);
       this.updateProjectForm.reset();
      }
    })


  }
}
