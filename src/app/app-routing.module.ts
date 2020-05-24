import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuardService as AuthGuard } from './_guards/auth.guard';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AddProSituationComponent } from './pro_situations/add-pro-situation/add-pro-situation.component';
import { AddRoleComponent } from './roles/add-role/add-role.component';
import { AllRolesComponent } from './roles/all-roles/all-roles.component';
import { UpdateRoleComponent } from './roles/update-role/update-role.component';
import { DetailsRoleComponent } from './roles/details-role/details-role.component';

import { AddNoteCriteriasComponent } from './note_criterias/add-note-criterias/add-note-criterias.component';
import { UpdateNoteCriteriasComponent } from './note_criterias/update-note-criterias/update-note-criterias.component';
import { AddTrainingComponent } from './trainings/add-training/add-training.component';
import { UpdateTrainingComponent } from './trainings/update-training/update-training.component';
import { AddBlogCategoryComponent } from './blog_category/add-blog-category/add-blog-category.component';
import { DetailsComponent } from './blog_category/details/details.component';
import { UpdateBlogCategoryComponent } from './blog_category/update-blog-category/update-blog-category.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AllAssignmentsComponent } from './assignments/all-assignments/all-assignments.component';

import { UpdateProSituationComponent } from './pro_situations/update-pro-situation/update-pro-situation.component';
import { ChatComponent } from './chat/chat.component';
import { AddContactComponent } from './contacts/add-contact/add-contact.component';
import { AllDemandesVacationComponent } from './vacations/all-demandes-vacation/all-demandes-vacation.component';
import { DecisionVacationComponent } from './vacations/decision-vacation/decision-vacation.component';
import { UpdateContactComponent } from './contacts/update-contact/update-contact.component';
import { DetailsContractComponent } from './contracts/details-contract/details-contract.component';
import { TemplateUpdateComponent } from './templates/template-update/template-update.component';
import { TemplateCreateComponent } from './templates/template-create/template-create.component';
import { AddAssignmentTypeComponent } from './assignment-types/add-assignment-type/add-assignment-type.component';
import { UpdateAssignmentTypeComponent } from './assignment-types/update-assignment-type/update-assignment-type.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { AllUsersComponent } from './users/all-users/all-users.component';

// import { AddProfileComponent } from './profiles/add-profile/add-profile.component';
// import { UpdateProfileComponent } from './profiles/update-profile/update-profile.component';
import { DetailsProfileComponent } from './profiles/details-profile/details-profile.component';
import { AllProfileComponent } from './profiles/all-profile/all-profile.component';
import { AddVacationTypeComponent } from './vacation_types/add-vacation-type/add-vacation-type.component';
import { UpdateVacationTypeComponent } from './vacation_types/update-vacation-type/update-vacation-type.component';
import { AddLicenseComponent } from './licenses/add-license/add-license.component';
import { UpdateLicenseComponent } from './licenses/update-license/update-license.component';
import { AddLicensetypesComponent } from './licensetypes/add-licensetypes/add-licensetypes.component';

// import { UpdateLicensetypesComponent } from './licensetypes/update-licensetypes/update-licensetypes.component'
import { AllNotecriteriasComponent } from './notecriterias/all-notecriterias/all-notecriterias.component';
import { DeleteNotecriteriasComponent } from './notecriterias/delete-notecriterias/delete-notecriterias.component';
import { DetailsNotecriteriasComponent } from './notecriterias/details-notecriterias/details-notecriterias.component';

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
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { DisciplinaryTeam } from './_models/disciplinary-team.model';
import { AllDisciplinaryTeamsComponent } from './disciplinary-teams/all-disciplinary-teams/all-disciplinary-teams.component';
import { DetailsDisciplinaryTeamComponent } from './disciplinary-teams/details-disciplinary-team/details-disciplinary-team.component';
import { UpdateAssignmentComponent } from './assignments/update-assignment/update-assignment.component';
import { AllVacationComponent } from './vacations/all-vacation/all-vacation.component';
import { DetailVacationComponent } from './vacations/detail-vacation/detail-vacation.component';
import { CreateDiciplinaryTeamComponent } from './disciplinary-teams/create-diciplinary-team/create-diciplinary-team.component';
import { UpdateDiciplinaryTeamComponent } from './disciplinary-teams/update-diciplinary-team/update-diciplinary-team.component';
import { AllTrainingsComponent } from './trainings/all-trainings/all-trainings.component';
import { DetailsTrainingsComponent } from './trainings/details-trainings/details-trainings.component';
import { AllDisciplinaryComponent } from './disciplinaryBoard/all-disciplinary/all-disciplinary.component';
import { DetailsDisciplinaryComponent } from './disciplinaryBoard/details-disciplinary/details-disciplinary.component';

import { AllTemplatesComponent } from './templates/all-templates/all-templates.component';
import { DetailsTemplatesComponent } from './templates/details-templates/details-templates.component';
import { AddContractComponent } from './contracts/add-contract/add-contract.component';
import { AllContractComponent } from './contracts/all-contract/all-contract.component';
import { UpdateContractComponent } from './contracts/update-contract/update-contract.component';
import { AllBlogCategoryComponent } from './blog_category/all-blog-category/all-blog-category.component';
import { AllLicensetypesComponent } from './licensetypes/all-licensetypes/all-licensetypes.component';
import { DetailsLycensetypeComponent } from './licensetypes/details-lycensetype/details-lycensetype.component';
import { AddBlogPostComponent } from './blog-post/add-blog-post/add-blog-post.component';
import { UpdateBlogPostComponent } from './blog-post/update-blog-post/update-blog-post.component';
import { UserProfileComponent } from './profiles/user-profile/user-profile.component';
import { AddProfileComponent } from './profiles/add-profile/add-profile.component';
import { UpdateProfileComponent } from './profiles/update-profile/update-profile.component';
import { FindTemplatesComponent } from './templates/find-templates/find-templates.component';
import { AllLicensesComponent } from './licenses/all-licenses/all-licenses.component';
import { DetailsLicensesComponent } from './licenses/details-licenses/details-licenses.component';
import { AllSettingsComponent } from './settings/all-settings/all-settings.component';
import { AddSettingsComponent } from './settings/add-settings/add-settings.component';
import { DetailsSettingsComponent } from './settings/details-settings/details-settings.component';
import { FindSettingsComponent } from './settings/find-settings/find-settings.component';
import { UpdateSettingsComponent } from './settings/update-settings/update-settings.component';

import { AddCareerComponent } from './careers/add-career/add-career.component';
import { UpdateCareerComponent } from './careers/update-career/update-career.component';


import { DetailsAssignmentComponent } from './assignments/details-assignment/details-assignment.component';
import { AddSubmissionComponent } from './submissions/add-submission/add-submission.component';
import { UpdateSubmissionComponent } from './submissions/update-submission/update-submission.component';
import { AddSanctionComponent } from './sanctions/add-sanction/add-sanction.component';

import { AllAssignmenttypeComponent } from './assignmenttypes/all-assignmenttype/all-assignmenttype.component';
import { DetailsAssignmenttypeComponent } from './assignmenttypes/details-assignmenttype/details-assignmenttype.component';
import { AddVacationComponent } from './vacations/add-vacation/add-vacation.component';
import { UpdateVacationComponent } from './vacations/update-vacation/update-vacation.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'pro-situations/add', component: AddProSituationComponent },
  { path: 'pro-situations/update/:id', component: UpdateProSituationComponent },
  { path: 'pro-situations/all', component: AllProSituationComponent },
  { path: 'pro-situations/details/:id', component: DetailsProSituationComponent },
  { path: 'profiles/add', component: AddProfileComponent },
  { path: 'profiles/update/:id', component: UpdateProfileComponent },
  { path: 'profiles/all', component: AllProfileComponent },
  { path: 'profiles/details/:id', component: DetailsProfileComponent },
  { path: 'profiles/add', component: AddProfileComponent },
  { path: 'profiles/update/:id', component: UpdateProfileComponent },
  { path: 'licensetypes/add', component: AddLicensetypesComponent },
  { path: 'licensetypes/update/:id', component: UpdateLicensetypesComponent },
  { path: 'licensetypes/all', component: AllLicensetypesComponent },
  { path: 'licensetypes/details/:id', component: DetailsLycensetypeComponent },
  { path: 'disciplinaryBoards/all', component: AllDisciplinaryComponent },
  { path: 'disciplinaryBoards/details/:id', component: DetailsDisciplinaryComponent },
  { path: 'roles/add', component: AddRoleComponent },
  { path: 'roles/all', component: AllRolesComponent },
  { path: 'users/add', component: AddUserComponent },
  { path: 'users/update/:id', component: UpdateUserComponent },
  { path: 'users/all', component: AllUsersComponent },
  { path: 'roles/update/:id', component: UpdateRoleComponent },
  { path: 'vacation/demandes', component: AllDemandesVacationComponent },

  { path: 'vacation/demandes/:id', component: DecisionVacationComponent },
  { path: 'templates/create', component: TemplateCreateComponent },
  { path: 'templates/update/:id', component: TemplateUpdateComponent },
  { path: 'templates/all', component: AllTemplatesComponent },
  { path: 'templates/details/:id', component: DetailsTemplatesComponent },
  { path: 'roles/details/:id', component: DetailsRoleComponent },
  { path: 'vacations/all', component: AllVacationComponent },
  { path: 'vacations/details/:id', component: DetailVacationComponent },
  { path: 'notecriterias/all', component: AllNotecriteriasComponent },
  { path: 'notecriterias/delete/:id', component: DeleteNotecriteriasComponent },
  { path: 'notecriterias/details/:id', component: DetailsNotecriteriasComponent },
  { path: 'document-viewer', component: DocumentViewerComponent },
  { path: 'assignmenttype/details/:id', component: DetailsAssignmenttypeComponent },
  { path: 'assignmenttype/all', component: AllAssignmenttypeComponent },
  { path: 'assignments/all', component: AllAssignmentsComponent },
  { path: 'assignments/add', component: AddAssignmentComponent },
  { path: 'assignments/update/:id', component: UpdateAssignmentComponent },
  { path: 'assignments/details/:id', component: DetailsAssignmentComponent },
  { path: 'vacation-types/add', component: AddVacationTypeComponent },
  { path: 'vacation-types/update/:id', component: UpdateVacationTypeComponent },

  { path: 'licenses/add', component: AddLicenseComponent },
  { path: 'licenses/update/:id', component: UpdateLicenseComponent },
  { path: 'licenses/all', component: AllLicensesComponent },
  { path: 'licenses/details/:id', component: DetailsLicensesComponent },
// path to settings
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

  { path: 'note-criterias/add', component: AddNoteCriteriasComponent },
  { path: 'note-criterias/update/:id', component: UpdateNoteCriteriasComponent },

  //routes pour ajout et update des contacts
  { path: 'contacts/update/:id', component:UpdateContactComponent},
  { path: 'contacts/add',component:AddContactComponent},

  { path: 'trainings/add', component: AddTrainingComponent},
  { path: 'trainings/update/:id', component: UpdateTrainingComponent},
  { path: 'disciplinary-teams/all', component: AllDisciplinaryTeamsComponent},
  { path: 'disciplinary-teams/details/:id', component: DetailsDisciplinaryTeamComponent},
  { path: 'blog-category/add', component: AddBlogCategoryComponent },
  { path: 'blog-category/update/:id', component: UpdateBlogCategoryComponent },
  // routes pour l'affichage des formations
  { path: 'trainings/all',  component: AllTrainingsComponent},
  { path: 'trainings/details/:id', component: DetailsTrainingsComponent },
  // routes pour ajout et update des contacts
  { path: 'contacts/update/:id', component: UpdateContactComponent},
  { path: 'contacts/add', component: AddContactComponent},
  { path: 'contacts/all', component: AllContactComponent },
  { path: 'contacts/details/:id', component: DetailContactComponent},
  { path: 'contacts/update/:id', component: UpdateContactComponent },
  { path: 'contacts/add', component: AddContactComponent },

  { path: 'assignment-types/add', component: AddAssignmentTypeComponent },
  { path: 'assignment-types/update/:id', component: UpdateAssignmentTypeComponent },
  { path: 'update-password', component: UpdatePasswordComponent },

  { path: 'submissions/add', component: AddSubmissionComponent },
  { path: 'submissions/update/:id', component: UpdateSubmissionComponent },
  { path: 'sanctions/add', component: AddSanctionComponent },
  // { path: '404', component: NotfoundComponent },

  { path: 'blog-posts/all', component: AllBlogPostComponent },
  { path: 'blog-category/details/:id', component: DetailsComponent},
  { path: 'contracts/add', component: AddContractComponent },
  { path: 'contracts/all', component: AllContractComponent },
  { path: 'blog-category/all', component: AllBlogCategoryComponent },
  { path: 'contracts/update/:id', component: UpdateContractComponent },
  { path: 'contracts/details/:id', component: DetailsContractComponent },
  { path: 'contracts/details', component: DetailsContractComponent },
  { path: 'vacations/update/:id', component: UpdateVacationComponent },
  { path: 'vacations/add', component: AddVacationComponent },

  //{ path: '404', component: NotfoundComponent },

  { path: 'blog-posts/all', component: AllBlogPostComponent },
  { path: 'blog-posts/add', component: AddBlogPostComponent },
  { path: 'blog-posts/update/:id', component: UpdateBlogPostComponent },
  { path: 'blog-posts/details/:id', component: DetailBlogPostComponent},
  { path: 'profile', component: UserProfileComponent},
  { path: 'diciplinary-team/add', component: CreateDiciplinaryTeamComponent },
  { path: 'diciplinary-team/update/:id', component: UpdateDiciplinaryTeamComponent },

  { path: 'career/add', component: AddCareerComponent },
  { path: 'career/update/:id', component: UpdateCareerComponent},

  // { path: '404', component: NotfoundComponent },
  // { path: '404', component: NotfoundComponent },

  { path: '**', redirectTo: 'login' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
