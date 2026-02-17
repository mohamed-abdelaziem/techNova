import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICompetition } from '../types/interfaces';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompetitionService {
private http = inject(HttpClient);



getAllCompetitons():Observable<ICompetition[]>{
return this.http.get<ICompetition[]>(`${environment.baseUrl}/GetAllCompetition`);
}


createCompetition(competitionValues : ICompetition){
return this.http.post(`${environment.baseUrl}/competition`,competitionValues);
}


deleteCompetiton(id:number){
return this.http.delete(`${environment.baseUrl}/delete/${id}`);
}

getCompetitionById(id: number):Observable<ICompetition>{
return this.http.get<ICompetition>(`${environment.baseUrl}/competition/${id}`);
}


updateCompetition(competitionValues : any , id:number){
return this.http.put(`${environment.baseUrl}/update/${id}` , competitionValues);
}


}
