import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AddTokenInterceptor } from './_http-interceptors/add-token.interceptor'
import { ErrorInterceptor } from './_http-interceptors/error-interceptor.helper'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './_guards/auth.guard'
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavigationDrawerComponent } from './navigation-drawer/navigation-drawer.component';
import { ThemeSettingComponent } from './theme-setting/theme-setting.component';
import { AddProSituationComponent } from './pro_situations/add-pro-situation/add-pro-situation.component';
import { UpdateProSituationComponent } from './pro_situations/update-pro-situation/update-pro-situation.component';
import { AllProSituationComponent } from './pro_situations/all-pro-situation/all-pro-situation.component';
import { FindProSituationComponent } from './pro_situations/find-pro-situation/find-pro-situation.component';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AddRoleComponent } from './roles/add-role/add-role.component';
import { AllRolesComponent } from './roles/all-roles/all-roles.component';
import { BlockUIModule } from 'ng-block-ui';
import { UpdateRoleComponent } from './roles/update-role/update-role.component';
import { DetailsRoleComponent } from './roles/details-role/details-role.component';
import { AddTrainingComponent } from './trainings/add-training/add-training.component';
import { UpdateTrainingComponent } from './trainings/update-training/update-training.component';
import { AddBlogCategoryComponent } from './blog_category/add-blog-category/add-blog-category.component';
import { UpdateBlogCategoryComponent } from './blog_category/update-blog-category/update-blog-category.component';
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
import { UpdateLicensetypesComponent } from './licensetypes/update-licensetypes/update-licensetypes.component';
import { AllLicensetypesComponent } from './licensetypes/all-licensetypes/all-licensetypes.component';
import { DetailsLycensetypeComponent } from './licensetypes/details-lycensetype/details-lycensetype.component';
import { AddDivisionComponent } from './divisions/add-division/add-division.component';
import { UpdateDivisionComponent } from './divisions/update-division/update-division.component';
import { TemplateCreateComponent } from './templates/template-create/template-create.component';
import { TemplateUpdateComponent } from './templates/template-update/template-update.component';


import { AngularEditorModule } from '@kolkov/angular-editor';
import {MatStepperModule, MatInputModule,MatFormFieldModule} from '@angular/material';
import { AllDivisionComponent } from './divisions/all-division/all-division.component';
import { DetailsDivisionComponent } from './divisions/details-division/details-division.component';
import { DetailsProSituationComponent } from './pro_situations/details-pro-situation/details-pro-situation.component';
import { AddBlogPostComponent } from './blogPosts/add-blog-post/add-blog-post.component';
import { UpdateBlogPostComponent } from './blogPosts/update-blog-post/update-blog-post.component';
import { AllSubmissionsComponent } from './submissions/all-submissions/all-submissions.component';
import { AllBlogPostComponent } from './blog-post/all-blog-post/all-blog-post.component';
import { DetailBlogPostComponent } from './blog-post/detail-blog-post/detail-blog-post.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import { AllContactComponent } from './contacts/all-contact/all-contact.component';
import { DetailContactComponent } from './contacts/detail-contact/detail-contact.component';
import { AllVacationComponent } from './vacations/all-vacation/all-vacation.component';
import { DetailVacationComponent } from './vacations/detail-vacation/detail-vacation.component';
import { AddVacationComponent } from './vacations/add-vacation/add-vacation.component';
import { UpdateVacationComponent } from './vacations/update-vacation/update-vacation.component';
import { DetailsSubmissionComponent } from './submissions/details-submission/details-submission.component';
import { AllProfileComponent } from './profiles/all-profile/all-profile.component';
import { DetailsProfileComponent } from './profiles/details-profile/details-profile.component';
import { AllTrainingsComponent } from './trainings/all-trainings/all-trainings.component';
import { FindTrainingsComponent } from './trainings/find-trainings/find-trainings.component';
import { DetailsTrainingsComponent } from './trainings/details-trainings/details-trainings.component';
import { AllTemplatesComponent } from './templates/all-templates/all-templates.component';
import { DetailsTemplatesComponent } from './templates/details-templates/details-templates.component';
import { FindTemplatesComponent } from './templates/find-templates/find-templates.component';
import { AddContractComponent } from './contracts/add-contract/add-contract.component';
import { AllContractComponent } from './contracts/all-contract/all-contract.component';
import { UpdateContractComponent } from './contracts/update-contract/update-contract.component';
import { FindContractComponent } from './contracts/find-contract/find-contract.component';
import { DetailsContractComponent } from './contracts/details-contract/details-contract.component';
import { AllBlogCategoryComponent } from './BlogCategory/all-blog-category/all-blog-category.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
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

import { CreateDiciplinaryTeamComponent } from './diciplinary-teams/create-diciplinary-team/create-diciplinary-team.component';
import { UpdateDiciplinaryTeamComponent } from './diciplinary-teams/update-diciplinary-team/update-diciplinary-team.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { AddCareerComponent } from './careers/add-career/add-career.component';
import { UpdateCareerComponent } from './careers/update-career/update-career.component';
//import { AddProfileComponent } from './profiles/add-profile/add-profile.component';
//import { UpdateProfileComponent } from './profiles/update-profile/update-profile.component';
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
    AddTrainingComponent,
    UpdateTrainingComponent,
    AddBlogCategoryComponent,
    UpdateBlogCategoryComponent,
    AllTrainingsComponent,
    FindTrainingsComponent,
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
    AllLicensetypesComponent,
    DetailsLycensetypeComponent,
    AllDivisionComponent,
    DetailsDivisionComponent,
    AddDivisionComponent,
    UpdateDivisionComponent,
    TemplateCreateComponent,
    TemplateUpdateComponent,
    DetailsProSituationComponent,
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
    AddVacationComponent,
    UpdateVacationComponent,
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
  ],

  imports: [
    MatTabsModule,
    MatExpansionModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    CKEditorModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    ReactiveFormsModule,
    PdfViewerModule,
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
