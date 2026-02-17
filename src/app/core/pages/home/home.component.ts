import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICompetition } from '../../types/interfaces';
import { CompetitionService } from '../../Services/competition.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
competitions !: ICompetition[];
competitionService = inject(CompetitionService);
competitionsLoading= signal<boolean>(false);


ngOnInit(): void {
this.getCompetions();
}


getCompetions(){
this.competitionsLoading.set(true);
this.competitionService.getAllCompetitons().subscribe({
next:(res)=>{
this.competitions = res;
this.competitionsLoading.set(false);
},
error : (err)=>{
this.competitionsLoading.set(false);
console.log(err);
}
})
}

}
