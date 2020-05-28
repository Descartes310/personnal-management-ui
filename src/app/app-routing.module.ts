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
import { AddDisciplinaryBoardsComponent } from './disciplinary_boards/add-disciplinary-boards/add-disciplinary-boards.component';
import { UpdateDisciplinaryBoardComponent } from './disciplinary_boards/update-disciplinary-boards/update-disciplinary-boards.component';
import { AddUserNoteCriteriasComponent } from './add-user-note-criterias/add-user-note-criterias.component';



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
import { AllDemandesLicenseComponent } from './licenses/all-demandes-license/all-demandes-license.component';
import { DecisionLicenseComponent } from './licenses/decision-license/decision-license.component';
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
import { ViewUserStatComponent } from './statistiques/view-user-stat/view-user-stat.component';
import { AllProSituationComponent } from './pro_situations/all-pro-situation/all-pro-situation.component';
import { DetailsProSituationComponent } from './pro_situations/details-pro-situation/details-pro-situation.component';
import { DetailsSubmissionComponent } from './submissions/details-submission/details-submission.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
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
import { AddCareerUserComponent } from './careers/add-career-user/add-career-user.component';
import { UpdateCareerComponent } from './careers/update-career/update-career.component';

import { DetailsAssignmentComponent } from './assignments/details-assignment/details-assignment.component';
import { AddSubmissionComponent } from './submissions/add-submission/add-submission.component';
import { UpdateSubmissionComponent } from './submissions/update-submission/update-submission.component';
import { AddSanctionComponent } from './sanctions/add-sanction/add-sanction.component';

import { AllAssignmenttypeComponent } from './assignmenttypes/all-assignmenttype/all-assignmenttype.component';
import { DetailsAssignmenttypeComponent } from './assignmenttypes/details-assignmenttype/details-assignmenttype.component';


import { AllSanctionsComponent } from './sanctions/all-sanctions/all-sanctions.component';
import { DetailsSanctionComponent } from './sanctions/details-sanction/details-sanction.component';

import { AddVacationComponent } from './vacations/add-vacation/add-vacation.component';
import { UpdateVacationComponent } from './vacations/update-vacation/update-vacation.component';
import { UserDetailsComponent } from './users/details-user/user-details.component';
import { UserNoteComponent } from './user-note/user-note.component';
import { AllVacationTypeComponent } from './vacation_types/all-vacationtypes/all-vacationtypes.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard], data: { permissions: ['read-chats'] }},
  { path: 'pro-situations/add', component: AddProSituationComponent, canActivate: [AuthGuard], data: { permissions: ['create-pro-situations'] } },
  { path: 'pro-situations/update/:id', component: UpdateProSituationComponent, canActivate: [AuthGuard], data: { permissions: ['update-pro-situations'] } },
  { path: 'pro-situations/all', component: AllProSituationComponent, canActivate: [AuthGuard], data: { permissions: ['read-pro-situations'] }},
  { path: 'pro-situations/details/:id', component: DetailsProSituationComponent, canActivate: [AuthGuard], data: { permissions: ['read-pro-situations'] }},
  { path: 'profiles/add', component: AddProfileComponent, canActivate: [AuthGuard], data: { permissions: ['create-profiles'] }},
  { path: 'profiles/update/:id', component: UpdateProfileComponent, canActivate: [AuthGuard], data: { permissions: ['update-profiles'] }},
  { path: 'profiles/all', component: AllProfileComponent, canActivate: [AuthGuard], data: { permissions: ['read-profiles'] }},
  { path: 'profiles/details/:id', component: DetailsProfileComponent, canActivate: [AuthGuard], data: { permissions: ['read-profiles'] }},
  { path: 'licensetypes/add', component: AddLicensetypesComponent, canActivate: [AuthGuard], data: { permissions: ['create-license-types'] }},
  { path: 'licensetypes/update/:id', component: UpdateLicensetypesComponent, canActivate: [AuthGuard], data: { permissions: ['update-license-types'] }},
  { path: 'licensetypes/all', component: AllLicensetypesComponent, canActivate: [AuthGuard], data: { permissions: ['read-license-types'] }},
  { path: 'licensetypes/details/:id', component: DetailsLycensetypeComponent, canActivate: [AuthGuard], data: { permissions: ['read-license-types'] }},
  { path: 'disciplinaryBoards/all', component: AllDisciplinaryComponent, canActivate: [AuthGuard], data: { permissions: ['read-disciplinary-boards'] }},
  { path: 'disciplinaryBoards/details/:id', component: DetailsDisciplinaryComponent, canActivate: [AuthGuard], data: { permissions: ['read-disciplinary-boards'] }},
  { path: 'roles/add', component: AddRoleComponent, canActivate: [AuthGuard], data: { permissions: ['create-roles'] }},
  { path: 'disciplinary_boards/add', component: AddDisciplinaryBoardsComponent, canActivate: [AuthGuard], data: { permissions: ['create-disciplinary-boards'] }},
  { path: 'disciplinary_boards/update/:id', component: UpdateDisciplinaryBoardComponent, canActivate: [AuthGuard], data: { permissions: ['update-disciplinary-boards'] }},
  { path: 'roles/all', component: AllRolesComponent, canActivate: [AuthGuard], data: { permissions: ['read-roles'] }},
  { path: 'users/add', component: AddUserComponent, canActivate: [AuthGuard], data: { permissions: ['create-users'] }},
  { path: 'users/update/:id', component: UpdateUserComponent, canActivate: [AuthGuard], data: { permissions: ['update-users'] }},
  { path: 'users/all', component: AllUsersComponent, canActivate: [AuthGuard], data: { permissions: ['read-users'] }},
  { path: 'roles/update/:id', component: UpdateRoleComponent, canActivate: [AuthGuard], data: { permissions: ['update-roles'] }},
  { path: 'vacation/demandes', component: AllDemandesVacationComponent, canActivate: [AuthGuard], data: { permissions: ['read-vacations'] }},
  { path: 'vacation/demandes/:id', component: DecisionVacationComponent, canActivate: [AuthGuard], data: { permissions: ['read-vacations'] }},
  { path: 'license/demandes', component: AllDemandesLicenseComponent, canActivate: [AuthGuard], data: { permissions: ['read-licenses'] }},
  { path: 'license/demandes/:id', component: DecisionLicenseComponent, canActivate: [AuthGuard], data: { permissions: ['read-licenses'] }},
  { path: 'templates/create', component: TemplateCreateComponent, canActivate: [AuthGuard], data: { permissions: ['create-templates'] }},
  { path: 'templates/update/:id', component: TemplateUpdateComponent, canActivate: [AuthGuard], data: { permissions: ['update-templates'] }},
  { path: 'templates/all', component: AllTemplatesComponent, canActivate: [AuthGuard], data: { permissions: ['read-templates'] }},
  { path: 'templates/details/:id', component: DetailsTemplatesComponent, canActivate: [AuthGuard], data: { permissions: ['read-templates'] }},
  { path: 'roles/details/:id', component: DetailsRoleComponent, canActivate: [AuthGuard], data: { permissions: ['read-roles'] }},
  { path: 'vacations/all', component: AllVacationComponent, canActivate: [AuthGuard], data: { permissions: ['read-vacations'] }},
  { path: 'vacations/details/:id', component: DetailVacationComponent, canActivate: [AuthGuard], data: { permissions: ['read-vacations'] }},
  { path: 'notecriterias/all', component: AllNotecriteriasComponent, canActivate: [AuthGuard], data: { permissions: ['read-note-criterias'] }},
  { path: 'notecriterias/delete/:id', component: DeleteNotecriteriasComponent, canActivate: [AuthGuard], data: { permissions: ['delete-note-criterias'] }},
  { path: 'notecriterias/details/:id', component: DetailsNotecriteriasComponent, canActivate: [AuthGuard], data: { permissions: ['read-note-criterias'] }},
  { path: 'document-viewer', component: DocumentViewerComponent },
  { path: 'assignmenttype/details/:id', component: DetailsAssignmenttypeComponent, canActivate: [AuthGuard], data: { permissions: ['read-assignment-types'] }},
  { path: 'assignmenttype/all', component: AllAssignmenttypeComponent, canActivate: [AuthGuard], data: { permissions: ['read-assignment-types'] }},
  { path: 'assignments/all', component: AllAssignmentsComponent, canActivate: [AuthGuard], data: { permissions: ['read-assignments'] }},
  { path: 'assignments/add', component: AddAssignmentComponent, canActivate: [AuthGuard], data: { permissions: ['create-assignments'] }},
  { path: 'assignments/update/:id', component: UpdateAssignmentComponent, canActivate: [AuthGuard], data: { permissions: ['update-assignments'] }},
  { path: 'assignments/details/:id', component: DetailsAssignmentComponent, canActivate: [AuthGuard], data: { permissions: ['read-assignments'] }},
  { path: 'vacation-types/add', component: AddVacationTypeComponent, canActivate: [AuthGuard], data: { permissions: ['create-vacation-types'] }},
  { path: 'vacation-types/update/:id', component: UpdateVacationTypeComponent, canActivate: [AuthGuard], data: { permissions: ['update-vacation-types'] }},

  { path: 'licenses/add', component: AddLicenseComponent, canActivate: [AuthGuard], data: { permissions: ['create-licenses'] }},
  { path: 'licenses/update/:id', component: UpdateLicenseComponent, canActivate: [AuthGuard], data: { permissions: ['update-licenses'] }},
  { path: 'licenses/all', component: AllLicensesComponent, canActivate: [AuthGuard], data: { permissions: ['read-licenses'] }},
  { path: 'licenses/details/:id', component: DetailsLicensesComponent, canActivate: [AuthGuard], data: { permissions: ['read-licenses'] }},
// path to settings
  { path: 'settings/add', component: AddSettingsComponent, canActivate: [AuthGuard], data: { permissions: ['create-settings'] }},
  { path: 'settings/update/:id', component: UpdateSettingsComponent, canActivate: [AuthGuard], data: { permissions: ['update-settings'] }},
  { path: 'settings/all', component: AllSettingsComponent, canActivate: [AuthGuard], data: { permissions: ['read-settings'] }},
  { path: 'settings/details/:id', component: DetailsSettingsComponent, canActivate: [AuthGuard], data: { permissions: ['read-settings'] }},


  { path: 'divisions/add', component: AddDivisionComponent, canActivate: [AuthGuard], data: { permissions: ['create-divisions'] }},
  { path: 'divisions/update/:id', component: UpdateDivisionComponent, canActivate: [AuthGuard], data: { permissions: ['update-divisions'] }},
  { path: 'divisions/all', component: AllDivisionComponent, canActivate: [AuthGuard], data: { permissions: ['read-divisions'] }},
  { path: 'divisions/details/:id', component: DetailsDivisionComponent, canActivate: [AuthGuard], data: { permissions: ['read-divisions'] }},
  { path: 'submissions/details/:id', component: DetailsSubmissionComponent, canActivate: [AuthGuard], data: { permissions: ['read-submissions'] }},
  { path: 'professional-score', component: AddUserNoteCriteriasComponent, canActivate: [AuthGuard], data: { permissions: ['update-users'] }},
  { path: 'professional-score/all', component: UserNoteComponent, canActivate: [AuthGuard], data: { permissions: ['update-users'] }},
  { path: 'statistiques/view/:id', component: ViewUserStatComponent, canActivate: [AuthGuard], data: { permissions: ['update-statistics'] }},
  { path: 'vacationtypes/all', component: AllVacationTypeComponent, canActivate: [AuthGuard], data: { permissions: ['read-vacation-types'] }},

  { path: 'users/details/:id', component: UserDetailsComponent, canActivate: [AuthGuard], data: { permissions: ['read-users'] }},
  // routes pour ajout et update des contacts
  { path: 'contacts/update/:id', component: UpdateContactComponent, canActivate: [AuthGuard], data: { permissions: ['update-contacts'] }},
  { path: 'contacts/add', component: AddContactComponent, canActivate: [AuthGuard], data: { permissions: ['create-contacts'] }},

  { path: 'note-criterias/add', component: AddNoteCriteriasComponent, canActivate: [AuthGuard], data: { permissions: ['create-note-criterias'] }},
  { path: 'note-criterias/update/:id', component: UpdateNoteCriteriasComponent, canActivate: [AuthGuard], data: { permissions: ['update-note-criterias'] }},

  { path: 'trainings/add', component: AddTrainingComponent, canActivate: [AuthGuard], data: { permissions: ['create-trainings'] }},
  { path: 'trainings/update/:id', component: UpdateTrainingComponent, canActivate: [AuthGuard], data: { permissions: ['update-trainings'] }},
  { path: 'disciplinary-teams/all', component: AllDisciplinaryTeamsComponent, canActivate: [AuthGuard], data: { permissions: ['read-disciplinary-teams'] }},
  { path: 'disciplinary-teams/details/:id', component: DetailsDisciplinaryTeamComponent, canActivate: [AuthGuard], data: { permissions: ['read-disciplinary-teams'] }},
  { path: 'blog-category/add', component: AddBlogCategoryComponent, canActivate: [AuthGuard], data: { permissions: ['read-blog-categories'] }},
  { path: 'blog-category/update/:id', component: UpdateBlogCategoryComponent, canActivate: [AuthGuard], data: { permissions: ['read-blog-categories'] }},
  // routes pour l'affichage des formations
  { path: 'trainings/all', component: AllTrainingsComponent, canActivate: [AuthGuard], data: { permissions: ['read-trainings'] }},
  { path: 'trainings/details/:id', component: DetailsTrainingsComponent, canActivate: [AuthGuard], data: { permissions: ['read-trainings'] }},
  // routes pour ajout et update des contacts
  { path: 'contacts/update/:id', component: UpdateContactComponent, canActivate: [AuthGuard], data: { permissions: ['update-contacts'] }},
  { path: 'contacts/add', component: AddContactComponent, canActivate: [AuthGuard], data: { permissions: ['create-contacts'] }},
  { path: 'contacts/all', component: AllContactComponent, canActivate: [AuthGuard], data: { permissions: ['read-contacts'] }},
  { path: 'contacts/details/:id', component: DetailContactComponent, canActivate: [AuthGuard], data: { permissions: ['read-contacts'] }},

  { path: 'assignment-types/add', component: AddAssignmentTypeComponent, canActivate: [AuthGuard], data: { permissions: ['create-assignment-types'] }},
  { path: 'assignment-types/update/:id', component: UpdateAssignmentTypeComponent, canActivate: [AuthGuard], data: { permissions: ['update-assignment-types'] }},
  { path: 'update-password', component: UpdatePasswordComponent },

  { path: 'submissions/add', component: AddSubmissionComponent, canActivate: [AuthGuard], data: { permissions: ['create-submissions'] }},
  { path: 'submissions/all', component: AllSubmissionsComponent, canActivate: [AuthGuard], data: { permissions: ['read-submissions'] }},
  { path: 'submissions/update/:id', component: UpdateSubmissionComponent, canActivate: [AuthGuard], data: { permissions: ['update-submissions'] }},
  { path: 'sanctions/add', component: AddSanctionComponent, canActivate: [AuthGuard], data: { permissions: ['create-sanctions'] }},
  // { path: '404', component: NotfoundComponent, canActivate: [AuthGuard], data: { permissions: ['read-chats'] }},

  { path: 'blog-posts/all', component: AllBlogPostComponent, canActivate: [AuthGuard], data: { permissions: ['read-blog-posts'] }},
  { path: 'blog-category/details/:id', component: DetailsComponent, canActivate: [AuthGuard], data: { permissions: ['read-blog-categories'] }},
  { path: 'contracts/add', component: AddContractComponent, canActivate: [AuthGuard], data: { permissions: ['create-contracts'] }},
  { path: 'contracts/all', component: AllContractComponent, canActivate: [AuthGuard], data: { permissions: ['read-contracts'] }},
  { path: 'blog-category/all', component: AllBlogCategoryComponent, canActivate: [AuthGuard], data: { permissions: ['read-blog-categories'] }},
  { path: 'contracts/update/:id', component: UpdateContractComponent, canActivate: [AuthGuard], data: { permissions: ['update-contracts'] }},
  { path: 'contracts/details/:id', component: DetailsContractComponent, canActivate: [AuthGuard], data: { permissions: ['read-contracts'] }},
  { path: 'contracts/details', component: DetailsContractComponent, canActivate: [AuthGuard], data: { permissions: ['read-contracts'] }},
  { path: 'vacations/update/:id', component: UpdateVacationComponent, canActivate: [AuthGuard], data: { permissions: ['update-vacations'] }},
  { path: 'vacations/add', component: AddVacationComponent, canActivate: [AuthGuard], data: { permissions: ['create-vacations'] }},
  { path: 'blog-posts/all', component: AllBlogPostComponent, canActivate: [AuthGuard], data: { permissions: ['read-blog-posts'] }},
  { path: 'blog-posts/add', component: AddBlogPostComponent, canActivate: [AuthGuard], data: { permissions: ['create-blog-posts'] }},
  { path: 'blog-posts/update/:id', component: UpdateBlogPostComponent, canActivate: [AuthGuard], data: { permissions: ['update-blog-posts'] }},
  { path: 'blog-posts/details/:id', component: DetailBlogPostComponent, canActivate: [AuthGuard], data: { permissions: ['read-blog-posts'] }},
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard], data: { permissions: ['read-profile'] }},
  { path: 'diciplinary-team/add', component: CreateDiciplinaryTeamComponent, canActivate: [AuthGuard], data: { permissions: ['create-diciplinary-teams'] }},
  { path: 'diciplinary-team/update/:id', component: UpdateDiciplinaryTeamComponent, canActivate: [AuthGuard], data: { permissions: ['update-diciplinary-teams'] }},

  { path: 'sanctions/all', component: AllSanctionsComponent, canActivate: [AuthGuard], data: { permissions: ['read-sanctions'] }},
  { path: 'sanctions/details/:id', component: DetailsSanctionComponent, canActivate: [AuthGuard], data: { permissions: ['read-sanctions'] }},

  { path: 'career/add', component: AddCareerComponent, canActivate: [AuthGuard], data: { permissions: ['read-careers'] }},
  { path: 'career/update/:id', component: UpdateCareerComponent, canActivate: [AuthGuard], data: { permissions: ['read-careers'] }},
  { path: 'promotions', component: AddCareerComponent, canActivate: [AuthGuard], data: { permissions: ['create-careers'] }},
  { path: 'promotions/user/:id', component: AddCareerUserComponent, canActivate: [AuthGuard], data: { permissions: ['update-users'] }},

  // { path: '404', component: NotfoundComponent },
  // { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: 'login' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
