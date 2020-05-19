import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuardService as AuthGuard } from './_guards/auth.guard'

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AddProSituationComponent } from './pro_situations/add-pro-situation/add-pro-situation.component'
import { AddRoleComponent } from './roles/add-role/add-role.component';
import { AllRolesComponent } from './roles/all-roles/all-roles.component';
import { UpdateRoleComponent } from './roles/update-role/update-role.component';
import { DetailsRoleComponent } from './roles/details-role/details-role.component';
import { AddContractComponent } from './contracts/add-contract/add-contract.component';
import { AllContractComponent } from './contracts/all-contract/all-contract.component';
import { UpdateContractComponent } from './contracts/update-contract/update-contract.component';
import { AllBlogCategoryComponent } from './BlogCategory/all-blog-category/all-blog-category.component';
import { DetailsContractComponent } from './contracts/details-contract/details-contract.component';


//const routes: Routes = [];
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'pro-situation/add', component: AddProSituationComponent },
  { path: 'roles/add', component: AddRoleComponent },
  { path: 'roles/all', component: AllRolesComponent },
  { path: 'roles/update/:id', component: UpdateRoleComponent },
  { path: 'roles/details/:id', component: DetailsRoleComponent },
  { path: 'document-viewer', component: DocumentViewerComponent },
  { path: 'contracts/add', component: AddContractComponent },
  { path: 'contracts/all', component: AllContractComponent },
  { path: 'BlogCategory/all', component: AllBlogCategoryComponent },
  { path: 'contracts/update/:id', component: UpdateContractComponent },
  { path: 'contracts/details', component: DetailsContractComponent },
  //{ path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: 'login' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
