import { NgModule, Component } from '@angular/core';
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
import { AddTrainingComponent } from './trainings/add-training/add-training.component';
import { UpdateTrainingComponent } from './trainings/update-training/update-training.component';
import { AddBlogCategoryComponent } from './blog_category/add-blog-category/add-blog-category.component';
import { UpdateBlogCategoryComponent } from './blog_category/update-blog-category/update-blog-category.component';
import { UpdateProSituationComponent } from './pro_situations/update-pro-situation/update-pro-situation.component';
import { ChatComponent } from './chat/chat.component'
import { AddContactComponent } from './contacts/add-contact/add-contact.component';
import { UpdateContactComponent } from './contacts/update-contact/update-contact.component';
import { DetailsContractComponent } from './contracts/details-contract/details-contract.component';
import { TemplateUpdateComponent } from './templates/template-update/template-update.component';
import { TemplateCreateComponent } from './templates/template-create/template-create.component';
import { AddAssignmentTypeComponent } from './assignment-types/add-assignment-type/add-assignment-type.component';
import { UpdateAssignmentTypeComponent } from './assignment-types/update-assignment-type/update-assignment-type.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';

//import { AddProfileComponent } from './profiles/add-profile/add-profile.component';
//import { UpdateProfileComponent } from './profiles/update-profile/update-profile.component';
import { DetailsProfileComponent } from './profiles/details-profile/details-profile.component';
import { AllProfileComponent } from './profiles/all-profile/all-profile.component';
import { AddVacationTypeComponent } from './vacation_types/add-vacation-type/add-vacation-type.component';
import { UpdateVacationTypeComponent } from './vacation_types/update-vacation-type/update-vacation-type.component';
import { AddLicenseComponent } from './licenses/add-license/add-license.component';
import { UpdateLicenseComponent } from './licenses/update-license/update-license.component';
import { AddLicensetypesComponent } from './licensetypes/add-licensetypes/add-licensetypes.component';
import { UpdateLicensetypesComponent } from './licensetypes/update-licensetypes/update-licensetypes.component';
import { AllDivisionComponent } from './divisions/all-division/all-division.component';
import { DetailsDivisionComponent } from './divisions/details-division/details-division.component';
import { AddDivisionComponent } from './divisions/add-division/add-division.component';
import { UpdateDivisionComponent } from './divisions/update-division/update-division.component';
import { AllSubmissionsComponent } from './submissions/all-submissions/all-submissions.component';
import { AllBlogPostComponent } from './blog-post/all-blog-post/all-blog-post.component';
import { DetailBlogPostComponent } from './blog-post/detail-blog-post/detail-blog-post.component';
import { AllContactComponent } from './contacts/all-contact/all-contact.component';
import { DetailContactComponent } from './contacts/detail-contact/detail-contact.component';
import { AllProSituationComponent } from './pro_situations/all-pro-situation/all-pro-situation.component';
import { DetailsProSituationComponent } from './pro_situations/details-pro-situation/details-pro-situation.component';
import { DetailsSubmissionComponent } from './submissions/details-submission/details-submission.component';
import { AddVacationComponent } from './vacation/add-vacation/add-vacation.component';
import { UpdateVacationComponent } from './vacation/update-vacation/update-vacation.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { AllVacationComponent } from './vacations/all-vacation/all-vacation.component';
// import { AddVacationComponent } from './vacations/add-vacation/add-vacation.component';
// import { UpdateVacationComponent } from './vacations/update-vacation/update-vacation.component';
import { DetailVacationComponent } from './vacations/detail-vacation/detail-vacation.component';
import { CreateDiciplinaryTeamComponent } from './diciplinary-teams/create-diciplinary-team/create-diciplinary-team.component';
import { UpdateDiciplinaryTeamComponent } from './diciplinary-teams/update-diciplinary-team/update-diciplinary-team.component';
import { AllTrainingsComponent } from './trainings/all-trainings/all-trainings.component';
import { DetailsTrainingsComponent } from './trainings/details-trainings/details-trainings.component';

import { AllTemplatesComponent } from './templates/all-templates/all-templates.component';
import { DetailsTemplatesComponent } from './templates/details-templates/details-templates.component';
import { AllLicensetypesComponent } from './licensetypes/all-licensetypes/all-licensetypes.component';
import { DetailsLycensetypeComponent } from './licensetypes/details-lycensetype/details-lycensetype.component';
import { AddBlogPostComponent } from './blogPosts/add-blog-post/add-blog-post.component';
import { UpdateBlogPostComponent } from './blogPosts/update-blog-post/update-blog-post.component';
import { UserProfileComponent } from './profiles/user-profile/user-profile.component';
import { FindTemplatesComponent } from './templates/find-templates/find-templates.component';
import { AllLicensesComponent } from './licenses/all-licenses/all-licenses.component';
import { DetailsLicensesComponent } from './licenses/details-licenses/details-licenses.component';
import { AllSettingsComponent } from './settings/all-settings/all-settings.component';
import { AddSettingsComponent } from './settings/add-settings/add-settings.component';
import { DetailsSettingsComponent } from './settings/details-settings/details-settings.component';
import { FindSettingsComponent } from './settings/find-settings/find-settings.component';
import { UpdateSettingsComponent } from './settings/update-settings/update-settings.component';


//const routes: Routes = [];
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'pro-situations/add', component: AddProSituationComponent },
  { path: 'pro-situations/update/:id', component: UpdateProSituationComponent },
  { path: 'pro-situations/all', component: AllProSituationComponent },
  { path: 'pro-situations/details/:id', component: DetailsProSituationComponent },
  { path: 'profiles/all', component: AllProfileComponent },
  { path: 'profiles/details/:id', component: DetailsProfileComponent },
  // { path: 'pro-situations/update/:id', component: UpdateProSituationComponent},
  // { path: 'pro-situations/all',  component: AllProSituationComponent},
  // { path: 'pro-situations/details/:id', component: DetailsProSituationComponent },
  // { path: 'pro-situations/update/:id', component: UpdateProSituationComponent},
  // { path: 'pro-situations/all',  component: AllProSituationComponent},
  // { path: 'pro-situations/details/:id', component: DetailsProSituationComponent },
  // { path: 'pro-situations/all', component: AllProSituationComponent },
  // { path: 'pro-situations/details/:id', component: DetailsProSituationComponent },
  //{ path: 'profiles/add', component: AddProfileComponent },
  //{ path: 'profiles/update/:id', component: UpdateProfileComponent },
  { path: 'profiles/all', component: AllProfileComponent },
  { path: 'profiles/details/:id', component: DetailsProfileComponent },
  { path: 'licensetypes/add', component: AddLicensetypesComponent },
  { path: 'licensetypes/update/:id', component: UpdateLicensetypesComponent },
  { path: 'licensetypes/all', component: AllLicensetypesComponent },
  { path: 'licensetypes/details/:id', component: DetailsLycensetypeComponent },
  { path: 'roles/add', component: AddRoleComponent },
  { path: 'roles/all', component: AllRolesComponent },
  { path: 'users/add', component: AddUserComponent },
  { path: 'users/update/:id', component: UpdateUserComponent },
  { path: 'roles/update/:id', component: UpdateRoleComponent },
  { path: 'templates/create', component: TemplateCreateComponent },
  { path: 'templates/update/:id', component: TemplateUpdateComponent },
  { path: 'templates/all', component: AllTemplatesComponent },
  { path: 'templates/details/:id', component: DetailsTemplatesComponent },
  { path: 'roles/details/:id', component: DetailsRoleComponent },
  { path: 'vacations/all', component: AllVacationComponent },
  { path: 'vacations/add', component: AddVacationComponent },
  { path: 'vacations/update/:id', component: UpdateVacationComponent },
  { path: 'vacations/details/:id', component: DetailVacationComponent },
  { path: 'vacation-types/add', component: AddVacationTypeComponent },
  { path: 'vacation-types/update/:id', component: UpdateVacationTypeComponent },

  { path: 'licenses/add', component: AddLicenseComponent },
  { path: 'licenses/update/:id', component: UpdateLicenseComponent },
  { path: 'licenses/all', component: AllLicensesComponent },
  { path: 'licenses/details/:id', component: DetailsLicensesComponent },
//path to settings
  { path: 'settings/add', component: AddSettingsComponent},
  { path: 'settings/update/:id', component: UpdateSettingsComponent },
  { path: 'settings/all', component: AllSettingsComponent },
  { path: 'settings/details/:id', component: DetailsSettingsComponent },


  { path: 'divisions/add', component: AddDivisionComponent },
  { path: 'divisions/update/:id', component: UpdateDivisionComponent },
  { path: 'divisions/all', component: AllDivisionComponent },
  { path: 'divisions/details/:id', component: DetailsDivisionComponent },
  { path: 'submissions/details/:id', component: DetailsSubmissionComponent },
  { path: 'document-viewer', component: DocumentViewerComponent },
  { path: 'trainings/add', component: AddTrainingComponent},
  { path: 'trainings/update/:id', component: UpdateTrainingComponent},
  { path: 'blog-category/add', component: AddBlogCategoryComponent },
  { path: 'blog-category/update/:id', component: UpdateBlogCategoryComponent },
  //routes pour l'affichage des formations
  { path: 'trainings/all',  component: AllTrainingsComponent},
  { path: 'trainings/details/:id', component: DetailsTrainingsComponent },
  //routes pour ajout et update des contacts
  { path: 'contacts/update/:id', component:UpdateContactComponent},
  { path: 'contacts/add',component:AddContactComponent},
  { path: 'contacts/all', component: AllContactComponent },
  { path: 'contacts/details/:id', component:DetailContactComponent},
  { path: 'contacts/update/:id', component: UpdateContactComponent },
  { path: 'contacts/add', component: AddContactComponent },
  { path: 'assignment-types/add', component: AddAssignmentTypeComponent },
  { path: 'assignment-types/update/:id', component: UpdateAssignmentTypeComponent },
  { path: 'update-password', component: UpdatePasswordComponent },

  { path: 'vacations/update/:id', component: UpdateVacationComponent },
  { path: 'vacations/add', component: AddVacationComponent },
  { path: 'blog-posts/all', component: AllBlogPostComponent },
  { path: 'blog-posts/add', component: AddBlogPostComponent },
  { path: 'blog-posts/update/:id', component: UpdateBlogPostComponent },
  { path: 'blog-posts/details/:id', component:DetailBlogPostComponent},
  { path: 'profile', component:UserProfileComponent},
  { path: 'diciplinary-team/add', component: CreateDiciplinaryTeamComponent },
  { path: 'diciplinary-team/update/:id', component: UpdateDiciplinaryTeamComponent },
  //{ path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: 'login' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
