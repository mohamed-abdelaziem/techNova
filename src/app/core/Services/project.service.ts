import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { IProject } from '../types/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
private http = inject(HttpClient);


createProject(projectValues:any){
return this.http.post(`/api/ProjectCompetition/project`,projectValues);
};

deleteProject(id:number){
return this.http.delete(`/api/ProjectCompetition/delete-submission/${id}`);
};

updateProject(projectValues:any,id:number){
return this.http.put(`/api/ProjectCompetition/update-submission/${id}`,projectValues)
}


getProjectsOfCompetition(id:number):Observable<Partial<IProject>[]>{
return this.http.get<Partial<IProject>[]>(`/api/ProjectCompetition/project/byCompetition/${id}`);
}


rejectProject(id:number,obj:any):Observable<any>{
return this.http.put<any>(`/api/ProjectCompetition/project/reject/${id}`,obj);
}

approveProject(id:number,obj:any){
return this.http.put(`/api/ProjectCompetition/project/approve/${id}`,obj);
};


makeWinnered(id:number,rank:number){
return this.http.put(`/api/ProjectCompetition/project/winner/${id}`,{rank})
}







}
