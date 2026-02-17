import { Component, inject, OnInit, signal } from '@angular/core';
import { ICompetition } from '../../types/interfaces';
import { CompetitionService } from '../../Services/competition.service';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { SearchByTiTleOrDescriptionPipe } from '../../pipes/search-by-ti-tle-or-description-pipe';

@Component({
  selector: 'app-all-competitions',
  imports: [RouterLink , FormsModule , SearchByTiTleOrDescriptionPipe],
  templateUrl: './all-competitions.component.html',
  styleUrl: './all-competitions.component.css',
})
export class AllCompetitionsComponent implements OnInit {
competitions !: ICompetition[];
competitionService = inject(CompetitionService);
competitionsLoading= signal<boolean>(false);
searchTerm : string = '';

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
