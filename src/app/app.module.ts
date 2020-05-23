import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AddTokenInterceptor } from './_http-interceptors/add-token.interceptor';
import { ErrorInterceptor } from './_http-interceptors/error-interceptor.helper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './_guards/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BlockUIModule } from 'ng-block-ui';

import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavigationDrawerComponent } from './navigation-drawer/navigation-drawer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { ThemeSettingComponent } from './theme-setting/theme-setting.component';


import { AddProSituationComponent } from './pro_situations/add-pro-situation/add-pro-situation.component';
import { UpdateProSituationComponent } from './pro_situations/update-pro-situation/update-pro-situation.component';
import { AllProSituationComponent } from './pro_situations/all-pro-situation/all-pro-situation.component';
import { FindProSituationComponent } from './pro_situations/find-pro-situation/find-pro-situation.component';

import { DocumentViewerComponent } from './document-viewer/document-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AddRoleComponent } from './roles/add-role/add-role.component';
import { AllRolesComponent } from './roles/all-roles/all-roles.component';
import { UpdateRoleComponent } from './roles/update-role/update-role.component';
import { DetailsRoleComponent } from './roles/details-role/details-role.component';
import { AddDisciplinaryBoardsComponent } from './disciplinary_boards/add-disciplinary-boards/add-disciplinary-boards.component';
import { UpdateDisciplinaryBoardComponent } from './disciplinary_boards/update-disciplinary-boards/update-disciplinary-boards.component';
import { AddUserNoteCriteriasComponent } from './add-user-note-criterias/add-user-note-criterias.component';


//import { AddLicensetypesComponent } from './licensetypes/add-licensetypes/add-licensetypes.component';
import { AddTrainingComponent } from './trainings/add-training/add-training.component';
import { UpdateTrainingComponent } from './trainings/update-training/update-training.component';
import { AddBlogCategoryComponent } from './blog_category/add-blog-category/add-blog-category.component';
import { AllBlogCategoryComponent } from './blog_category/all-blog-category/all-blog-category.component';
import { UpdateBlogCategoryComponent } from './blog_category/update-blog-category/update-blog-category.component';
import { DetailsComponent } from './blog_category/details/details.component';
// import { AddLicensetypesComponent } from './licensetypes/add-licensetypes/add-licensetypes.component';
import { UpdateLicensetypesComponent } from './licensetypes/update-licensetypes/update-licensetypes.component';
import { AllNotecriteriasComponent } from './notecriterias/all-notecriterias/all-notecriterias.component';
import { DetailsNotecriteriasComponent } from './notecriterias/details-notecriterias/details-notecriterias.component';
import { DeleteNotecriteriasComponent } from './notecriterias/delete-notecriterias/delete-notecriterias.component';
import { AllAssignmenttypeComponent } from './assignmenttypes/all-assignmenttype/all-assignmenttype.component';
import { DetailsAssignmenttypeComponent } from './assignmenttypes/details-assignmenttype/details-assignmenttype.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AllAssignmentsComponent } from './assignments/all-assignments/all-assignments.component';

import { ChatComponent } from './chat/chat.component';
import { AddContactComponent } from './contacts/add-contact/add-contact.component';
import { UpdateContactComponent } from './contacts/update-contact/update-contact.component';
import { AddAssignmentTypeComponent } from './assignment-types/add-assignment-type/add-assignment-type.component';
import { UpdateAssignmentTypeComponent } from './assignment-types/update-assignment-type/update-assignment-type.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { AllUsersComponent } from './users/all-users/all-users.component';
import { AddVacationTypeComponent } from './vacation_types/add-vacation-type/add-vacation-type.component';
import { UpdateVacationTypeComponent } from './vacation_types/update-vacation-type/update-vacation-type.component';
import { AddLicenseComponent } from './licenses/add-license/add-license.component';
import { UpdateLicenseComponent } from './licenses/update-license/update-license.component';
import { AddLicensetypesComponent } from './licensetypes/add-licensetypes/add-licensetypes.component';
import { AllLicensetypesComponent } from './licensetypes/all-licensetypes/all-licensetypes.component';
import { DetailsLycensetypeComponent } from './licensetypes/details-lycensetype/details-lycensetype.component';
import { AddDivisionComponent } from './divisions/add-division/add-division.component';
import { UpdateDivisionComponent } from './divisions/update-division/update-division.component';
import { TemplateCreateComponent } from './templates/template-create/template-create.component';
import { TemplateUpdateComponent } from './templates/template-update/template-update.component';
import { AddContractComponent } from './contracts/add-contract/add-contract.component';
import { AllContractComponent } from './contracts/all-contract/all-contract.component';
import { UpdateContractComponent } from './contracts/update-contract/update-contract.component';
import { FindContractComponent } from './contracts/find-contract/find-contract.component';
import { DetailsContractComponent } from './contracts/details-contract/details-contract.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AngularEditorModule } from '@kolkov/angular-editor';
import {MatStepperModule, MatInputModule, MatFormFieldModule} from '@angular/material';
import { AllDivisionComponent } from './divisions/all-division/all-division.component';
import { DetailsDivisionComponent } from './divisions/details-division/details-division.component';
import { DetailsProSituationComponent } from './pro_situations/details-pro-situation/details-pro-situation.component';
import { UpdateAssignmentComponent } from './assignments/update-assignment/update-assignment.component';
import { AddBlogPostComponent } from './blog-post/add-blog-post/add-blog-post.component';
import { UpdateBlogPostComponent } from './blog-post/update-blog-post/update-blog-post.component';
import { AllDisciplinaryTeamsComponent } from './disciplinary-teams/all-disciplinary-teams/all-disciplinary-teams.component';
import { DetailsDisciplinaryTeamComponent } from './disciplinary-teams/details-disciplinary-team/details-disciplinary-team.component';
import { AllSubmissionsComponent } from './submissions/all-submissions/all-submissions.component';
import { AllBlogPostComponent } from './blog-post/all-blog-post/all-blog-post.component';
import { DetailBlogPostComponent } from './blog-post/detail-blog-post/detail-blog-post.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import { AllContactComponent } from './contacts/all-contact/all-contact.component';
import { DetailContactComponent } from './contacts/detail-contact/detail-contact.component';
import { AllVacationComponent } from './vacations/all-vacation/all-vacation.component';
import { UpdateVacationComponent } from './vacations/update-vacation/update-vacation.component';
import { DetailVacationComponent } from './vacations/detail-vacation/detail-vacation.component';
import { DecisionVacationComponent } from './vacations/decision-vacation/decision-vacation.component';
import { DetailsSubmissionComponent } from './submissions/details-submission/details-submission.component';
import { AllProfileComponent } from './profiles/all-profile/all-profile.component';
import { DetailsProfileComponent } from './profiles/details-profile/details-profile.component';
import { AllTrainingsComponent } from './trainings/all-trainings/all-trainings.component';
import { FindTrainingsComponent } from './trainings/find-trainings/find-trainings.component';
import { DetailsTrainingsComponent } from './trainings/details-trainings/details-trainings.component';
import { AllTemplatesComponent } from './templates/all-templates/all-templates.component';
import { DetailsTemplatesComponent } from './templates/details-templates/details-templates.component';
import { FindTemplatesComponent } from './templates/find-templates/find-templates.component';
<<<<<<< HEAD
import { AddContractComponent } from './contracts/add-contract/add-contract.component';
import { AllContractComponent } from './contracts/all-contract/all-contract.component';
import { UpdateContractComponent } from './contracts/update-contract/update-contract.component';
import { FindContractComponent } from './contracts/find-contract/find-contract.component';
import { DetailsContractComponent } from './contracts/details-contract/details-contract.component';
import { AllBlogCategoryComponent } from './BlogCategory/all-blog-category/all-blog-category.component';
=======
import { AllDemandesVacationComponent } from './vacations/all-demandes-vacation/all-demandes-vacation.component';

//import { AllBlogCategoryComponent } from './BlogCategory/all-blog-category/all-blog-category.component';
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
import { UserProfileComponent } from './profiles/user-profile/user-profile.component';
import { AddProfileComponent } from './profiles/add-profile/add-profile.component';
import { UpdateProfileComponent } from './profiles/update-profile/update-profile.component';
import { ValeursClefsComponent } from './statistics/valeurs-clefs/valeurs-clefs.component';
import { AllLicensesComponent } from './licenses/all-licenses/all-licenses.component';
import { DetailsLicensesComponent } from './licenses/details-licenses/details-licenses.component';
import { AllSettingsComponent } from './settings/all-settings/all-settings.component';
import { AddSettingsComponent } from './settings/add-settings/add-settings.component';
import { DetailsSettingsComponent } from './settings/details-settings/details-settings.component';
import { FindSettingsComponent } from './settings/find-settings/find-settings.component';
import { UpdateSettingsComponent } from './settings/update-settings/update-settings.component';

import { CreateDiciplinaryTeamComponent } from './disciplinary-teams/create-diciplinary-team/create-diciplinary-team.component';
import { UpdateDiciplinaryTeamComponent } from './disciplinary-teams/update-diciplinary-team/update-diciplinary-team.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { AddCareerComponent } from './careers/add-career/add-career.component';
import { UpdateCareerComponent } from './careers/update-career/update-career.component';
//import { AddProfileComponent } from './profiles/add-profile/add-profile.component';
//import { UpdateProfileComponent } from './profiles/update-profile/update-profile.component';
//import { DecisionVacationComponent } from './vacation/decision-vacation/decision-vacation.component';
import { DetailsAssignmentComponent } from './assignments/details-assignment/details-assignment.component';
import { AddSubmissionComponent } from './submissions/add-submission/add-submission.component';
import { UpdateSubmissionComponent } from './submissions/update-submission/update-submission.component';

import { AddSanctionComponent } from './sanctions/add-sanction/add-sanction.component';
import { AddVacationComponent } from './vacations/add-vacation/add-vacation.component';
import { AddNoteCriteriasComponent } from './note_criterias/add-note-criterias/add-note-criterias.component';
import { UpdateNoteCriteriasComponent } from './note_criterias/update-note-criterias/update-note-criterias.component';

import { AllDisciplinaryComponent } from './disciplinaryBoard/all-disciplinary/all-disciplinary.component';
import { DetailsDisciplinaryComponent } from './disciplinaryBoard/details-disciplinary/details-disciplinary.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    NotfoundComponent,
    SideBarComponent,
    NavigationDrawerComponent,
    ThemeSettingComponent,
    AddProSituationComponent,
    UpdateProSituationComponent,
    AllProSituationComponent,
    FindProSituationComponent,
    DocumentViewerComponent,
    AddRoleComponent,
    AllRolesComponent,
    UpdateRoleComponent,
    DetailsRoleComponent,
<<<<<<< HEAD
    AddDisciplinaryBoardsComponent,
    UpdateDisciplinaryBoardComponent,
    AddUserNoteCriteriasComponent,
=======

>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
    AddTrainingComponent,
    UpdateTrainingComponent,
    AddBlogCategoryComponent,
    UpdateBlogCategoryComponent,
    AllBlogCategoryComponent,
    DetailsComponent ,
    AllTrainingsComponent,
    FindTrainingsComponent,
    AddAssignmentComponent,
    AllAssignmentsComponent,
    UpdateAssignmentComponent,

    AddNoteCriteriasComponent,
    UpdateNoteCriteriasComponent,

    ChatComponent,
    AddContactComponent,
    UpdateContactComponent,
    AddAssignmentTypeComponent,
    UpdateAssignmentTypeComponent,
    AddUserComponent,
    UpdateUserComponent,
    AddVacationTypeComponent,
    UpdateVacationTypeComponent,
    AddLicenseComponent,
    UpdateLicenseComponent,
    AddLicensetypesComponent,
    UpdateLicensetypesComponent,
    AllDivisionComponent,
    DetailsDivisionComponent,
    AllLicensetypesComponent,
    DetailsLycensetypeComponent,
    AllLicensetypesComponent,
    DetailsLycensetypeComponent,
    AllDivisionComponent,
    DetailsDivisionComponent,
    AllNotecriteriasComponent,
    DetailsNotecriteriasComponent,
    DeleteNotecriteriasComponent,
    AllAssignmenttypeComponent,
    DetailsAssignmenttypeComponent,
    AddDivisionComponent,
    UpdateDivisionComponent,
    TemplateCreateComponent,
    TemplateUpdateComponent,
    DetailsProSituationComponent,
    AllDisciplinaryTeamsComponent,
    DetailsDisciplinaryTeamComponent,
    AllSubmissionsComponent,
    DetailsSubmissionComponent,
    AllProfileComponent,
    DetailsProfileComponent,
    UpdatePasswordComponent,
    AllContractComponent,
    UpdateContractComponent,
    FindContractComponent,
    DetailsContractComponent,
    AllBlogCategoryComponent,
    UpdateBlogCategoryComponent,
    AddBlogPostComponent,
    UpdateBlogPostComponent,
    AllSubmissionsComponent,
    UpdateVacationComponent,
    AllUsersComponent,
    AllBlogPostComponent,
    DetailBlogPostComponent,
    AllContactComponent,
    DetailContactComponent,
    AllVacationComponent,
    DetailVacationComponent,
    UpdateVacationComponent,
    UpdateVacationComponent,
    AllVacationComponent,
    DetailVacationComponent,
    DetailsSubmissionComponent,
    AllProfileComponent,
    DetailsProfileComponent,
    DetailsTrainingsComponent,
    AllTemplatesComponent,
    DetailsTemplatesComponent,
    FindTemplatesComponent,
    UserProfileComponent,
    AddProfileComponent,
    UpdateProfileComponent,
    ValeursClefsComponent,
    AllLicensesComponent,
    DetailsLicensesComponent,
    AllSettingsComponent,
    AddSettingsComponent,
    DetailsSettingsComponent,
    FindSettingsComponent,
    UpdateSettingsComponent,
    CreateDiciplinaryTeamComponent,
    UpdateDiciplinaryTeamComponent,
    AddCareerComponent,
    UpdateCareerComponent,
  //  AddProfileComponent,
    //UpdateProfileComponent,
    DecisionVacationComponent,
    AllVacationComponent,
    AddVacationComponent,
    AddContractComponent,
    AllContractComponent,
    UpdateContractComponent,
    FindContractComponent,
    DetailsContractComponent,
    AllBlogCategoryComponent,
    AllDemandesVacationComponent,

    DetailsAssignmentComponent,
    AddSubmissionComponent,
    UpdateSubmissionComponent,
    AddSanctionComponent,
    AllDisciplinaryComponent,
    DetailsDisciplinaryComponent,
  ],

  imports: [
    MatTabsModule,
    MatExpansionModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    ReactiveFormsModule,
    PdfViewerModule,
    CKEditorModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(),
    BlockUIModule.forRoot(),
    BrowserAnimationsModule
  ], 
  providers: [
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
