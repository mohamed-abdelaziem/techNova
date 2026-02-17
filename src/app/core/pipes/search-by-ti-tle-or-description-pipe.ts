import { Pipe, PipeTransform } from '@angular/core';
import { ICompetition } from '../types/interfaces';

@Pipe({
  name: 'searchByTiTleOrDescription',
})
export class SearchByTiTleOrDescriptionPipe implements PipeTransform {

  transform(value: ICompetition[], searchTerm:string): ICompetition[] {
    const searchedArray = value.filter((competition)=>{
     const returned = competition.title.toLowerCase().includes(searchTerm.toLowerCase()) || competition.description.toLowerCase().includes(searchTerm.toLowerCase());
     return returned;
    })
    return searchedArray;
  }

}
