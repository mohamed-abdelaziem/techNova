import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CompetitionService } from '../../Services/competition.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterLink } from '@angular/router';
import { ICompetition } from '../../types/interfaces';
import { DatePipe } from '@angular/common';
import { SearchByTiTleOrDescriptionPipe } from '../../pipes/search-by-ti-tle-or-description-pipe';

@Component({
  selector: 'app-competitions',
  imports: [ReactiveFormsModule, FormsModule, DatePipe, RouterLink , SearchByTiTleOrDescriptionPipe],
  templateUrl: './competitions.component.html',
  styleUrl: './competitions.component.css',
})
export class CompetitionsComponent implements OnInit {
  searchTerm : string = '';
  ModelIsShow = signal<boolean>(false);
  cookieService = inject(CookieService);
  competitionArr!: ICompetition[];
  addCompetitionIsLoading = signal<boolean>(false);
  getCompetitionsLoading = signal<boolean>(false);
  deleteCompetitionsLoading = signal<boolean>(false);
  updateModelShow = signal<boolean>(false);
  selectedCompetitionId = signal<number>(0);
  updateCompetitionLoading = signal<boolean>(false);
  router = inject(Router);
  toast = inject(ToastrService);
  competitionService = inject(CompetitionService);
  competitionForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });

  updateCompetitionForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });

  constructor() {
    this.getAllCompetitions();
  }
  ngOnInit(): void {
    
  }

  getAllCompetitions() {
    this.getCompetitionsLoading.set(true);
    this.competitionService.getAllCompetitons().subscribe({
      next: (res) => {
        console.log(res);
        this.getCompetitionsLoading.set(false);
        this.competitionArr = res;
      },
      error: (err) => {
        console.log(err);
        this.getCompetitionsLoading.set(false);
      },
    });
  }

  addCompetition() {
    if (this.competitionForm.invalid) {
      return;
    }
    this.addCompetitionIsLoading.set(true);
    this.competitionService.createCompetition(this.competitionForm.value).subscribe({
      next: (res) => {
        this.toast.success('Created Successfully');
        this.addCompetitionIsLoading.set(false);
        this.getAllCompetitions();
        this.competitionForm.reset();
        this.ModelIsShow.set(false);
      },
      error: (err) => {
        this.toast.error("The Competition Can't Created");
        this.addCompetitionIsLoading.set(false);
        this.competitionForm.reset();
        this.ModelIsShow.set(false);
      },
    });
  }

  deleteCompetition(id: number) {
    this.deleteCompetitionsLoading.set(true);
    this.competitionService.deleteCompetiton(id).subscribe({
      next: (res: any) => {
        this.toast.success(res?.message);
        this.deleteCompetitionsLoading.set(false);
        this.getAllCompetitions();
      },
      error: (err) => {
        this.toast.error(`Can't Delete This Competion Please Try Again`);
        this.deleteCompetitionsLoading.set(false);
        this.getAllCompetitions();
      },
    });
  }

  updateCompetition() {
    this.updateCompetitionLoading.set(true);
    if (!this.updateCompetitionForm.valid) {
      return;
    }

    const updateAbleObj = {
      ...this.updateCompetitionForm.value,
      competitionId: this.selectedCompetitionId(),
    };

    this.competitionService
      .updateCompetition(updateAbleObj, this.selectedCompetitionId())
      .subscribe({
        next: (res: any) => {
          this.updateCompetitionForm.reset();
          this.updateModelShow.set(false);
          this.toast.success(res?.message!);
          this.updateCompetitionLoading.set(false);
          this.getAllCompetitions();
        },
        error: (err) => {
          console.log(err);
          this.updateCompetitionLoading.set(false);
          this.toast.error(`Can't Update This Competition!`);
        },
      });
  }

  handleUpdate(id: number) {
    const selectedCompetition = this.competitionArr.find((competition) => {
      return competition.competitionId == id;
    });
    this.updateCompetitionForm.patchValue(selectedCompetition!);
  }
}
