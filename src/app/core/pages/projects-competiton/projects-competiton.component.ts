import { Component, inject, OnInit, signal } from '@angular/core';
import { ProjectService } from '../../Services/project.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-projects-competiton',
  imports: [],
  templateUrl: './projects-competiton.component.html',
  styleUrl: './projects-competiton.component.css',
})
export class ProjectsCompetitonComponent implements OnInit{

private projectService = inject(ProjectService);
private toast = inject(ToastrService);
private activedRoute = inject(ActivatedRoute);
private competitionId = signal<number>(0);
getProjectLoading = signal<boolean>(false);
projectWinners : any[] = [];
projectsArr :any[] = [];

ngOnInit(): void {
this.activedRoute.paramMap.subscribe((params)=>{
const id = params.get('id');
this.getProjectsForTheCompetition(Number(id)!);
this.competitionId.set(Number(id)!);
})
}


getProjectsForTheCompetition(id:number){
this.getProjectLoading.set(true);
this.projectService.getProjectsOfCompetition(id).subscribe({
next:(res)=>{
this.projectsArr = res;
this.getProjectLoading.set(false);
console.log(res);
},
error:(err)=>{
this.getProjectLoading.set(false);
}
})
}


rejectProject(id:number,obj:any){
const myObj = obj;
console.log(myObj);
this.projectService.rejectProject(id,obj).subscribe({
next:(res)=>{
  this.toast.error('Please Try Again!');
  this.getProjectsForTheCompetition(this.competitionId());
},
error:(err)=>{
  this.toast.success('Project Rejected');
this.getProjectsForTheCompetition(this.competitionId());
}
})
}

approveProject(id:number,obj:any){
this.projectService.approveProject(id,obj).subscribe({
next:(res)=>{
  this.toast.error('Please Try Later');
  this.getProjectsForTheCompetition(this.competitionId());
},
error:(err)=>{
this.toast.success('Project Approved');
this.getProjectsForTheCompetition(this.competitionId());
}
})
};


makeWinner(id:number,rank:number,item:any){
this.projectService.makeWinnered(id,rank).subscribe({
next:(res)=>{
  this.toast.success('Project Marked Winner Successfully');
  this.getProjectsForTheCompetition(this.competitionId());
},
error:(err)=>{
this.toast.error('A project with rank 1 already exists for this competition.');
this.getProjectsForTheCompetition(this.competitionId());
}
})
}


}
