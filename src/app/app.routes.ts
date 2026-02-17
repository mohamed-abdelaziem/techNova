import { Routes } from '@angular/router';
import { authenticationGuard } from './core/guards/authentication-guard';
import { allCompetionGuard } from './core/guards/all-competion-guard';
import { projectGuard } from './core/guards/project-guard';

export const routes: Routes = [
 

    {
        path : "",
        redirectTo : "/home",
        pathMatch : "full"
    }
    ,
    {
        path : "home",
        loadComponent : ()=>import('./core/pages/home/home.component').then(file=>file.HomeComponent),
        title : "Home"
    },

    {
        path : "login",
        loadComponent : ()=>import("./core/pages/login/login.component").then(file=>file.LoginComponent),
        title : "Login"
    },
    {
        path : "register",
        loadComponent : ()=>import("./core/pages/register/register.component").then(file=>file.RegisterComponent),
        title : "Register"
    },
    {
        path : "submit-project",
        loadComponent : ()=>import("./core/pages/submit-project/submit-project.component").then(file=>file.SubmitProjectComponent),
        title : "Submit Project"
    },

    {
        path : "dashboard",
        loadComponent : ()=>import('./core/pages/dashboard/dashboard.component').then(file=>file.DashboardComponent),
        title : "Dashboard"
    },
    {
        path : "competitions",
        canActivate : [authenticationGuard],
        loadComponent : ()=>import('./core/pages/competitions/competitions.component').then(file=>file.CompetitionsComponent),
        title : "Competitions"
    },
     {
        path : "all-competitions",
        loadComponent : ()=>import('./core/pages/all-competitions/all-competitions.component').then(file=>file.AllCompetitionsComponent),
        title : "All Competitions",
    },

     {
        path : "projects-competition/:id",
        loadComponent : ()=>import('./core/pages/projects-competiton/projects-competiton.component').then(file=>file.ProjectsCompetitonComponent),
        title : "Projects Competition",
        canActivate:[authenticationGuard]
    },

    {
        path : "my-projects",
        loadComponent : ()=>import('./core/pages/my-projects/my-projects.component').then(file=>file.MyProjectsComponent),
        title : "My Projects",
        canActivate : [projectGuard]
    },
     {
        path : "competition-details/:id",
        loadComponent : ()=>import('./core/pages/competition-details/competition-details.component').then(file=>file.CompetitionDetailsComponent),
        title : "Competiton"
    },
    {
        path : "past-winners",
        loadComponent : ()=>import('./core/pages/past-winners/past-winners.component').then(file=>file.PastWinnersComponent),
        title : "Past Winners"
    },
    {
        path : "about",
        loadComponent : ()=>import('./core/pages/about/about.component').then(file=>file.AboutComponent),
        title : "About"
    },

    {
        path : "**",
        loadComponent : ()=>import('./core/pages/not-found/not-found.component').then(file=>file.NotFoundComponent),
        title : "Not found"
    }


];
