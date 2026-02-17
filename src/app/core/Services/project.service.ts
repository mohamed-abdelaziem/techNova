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
return this.http.post(`${environment.baseUrl}/project`,projectValues);
};

deleteProject(id:number){
return this.http.delete(`${environment.baseUrl}/delete-submission/${id}`);
};

updateProject(projectValues:any,id:number){
return this.http.put(`${environment.baseUrl}/update-submission/${id}`,projectValues)
}


getProjectsOfCompetition(id:number):Observable<Partial<IProject>[]>{
return this.http.get<Partial<IProject>[]>(`${environment.baseUrl}/project/byCompetition/${id}`);
}


rejectProject(id:number,obj:any):Observable<any>{
return this.http.put<any>(`${environment.baseUrl}/project/reject/${id}`,obj);
}

approveProject(id:number,obj:any){
return this.http.put(`${environment.baseUrl}/project/approve/${id}`,obj);
};


makeWinnered(id:number,rank:number){
return this.http.put(`${environment.baseUrl}/project/winner/${id}`,{rank})
}







}
