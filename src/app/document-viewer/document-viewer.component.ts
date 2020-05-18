import { Component, OnInit } from '@angular/core';

import { DocumentViewerService } from '../_services/document-viewer.service';
import { NotifService } from '../_services/notif.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})

/**
 * @author Arléon Zemtsop
 * @email arleonzemtsop@gmail.com
*/
export class DocumentViewerComponent implements OnInit {

  public file: File;
  public MAX_FILE_SIZE: number = 5000000; //Set the max file size to 2MO 2096155
  public LIMIT: number = 1048576;
  public unknowError: boolean = false;
  public message: string = '';
  public isLoading: boolean = false;
  public isLoadingDocument: boolean = false;
  public response: any;
  public documents: any[] = [];
  public pdfUrl: string = '';

  constructor(
    private documentViewerService: DocumentViewerService,
    private notifService: NotifService,
    private translate: TranslateService
  ) 
  {
    this.file = null;
  }

  ngOnInit() {
  }

  public chooseFile() {
    document.getElementById('my_file').click();
  }

  public fileProgress(document: File) {

    this.file = document;

    let validationStatus: boolean = this.validate();

    if(validationStatus) {
      this.previsualize();
      console.log('The document with name ' + this.file.name + ' is ready for upload');
      //this.uploadDocument();
      return;
    } 

  }

  public previsualize() {

    const reader = new FileReader();
    this.isLoadingDocument = true;
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.pdfUrl = reader.result as string;
      this.isLoadingDocument = false;
    }
    console.log(reader.error);

  }

  public validate() {

    if(this.file.type != 'application/pdf') {

      this.translate.get('DocumentViewer.FILE_TYPE_ERR')
                    .subscribe(val => {
                      this.notifService.danger(val);
                      this.message = val;
                    });
      this.unknowError = true;
      return false;

    }

    if(this.file.size > this.MAX_FILE_SIZE) {

      const FILE_SIZE_IN_MO = (this.MAX_FILE_SIZE/this.LIMIT).toFixed(2) + 'MO';
      this.translate.get('DocumentViewer.MAX_FILE_SIZE_ERR')
                    .subscribe(val => {
                      this.notifService.danger(val + FILE_SIZE_IN_MO);
                      this.message = val;
                    });
      this.unknowError = true;
      return false;
      
    }

    return true;
  }

  public uploadDocument() {

    this.isLoading = true;
    this.documentViewerService.uploadDocument(this.file)
      .then(response => {
        console.log(response);
        this.notifService.success('Le document a été uploadé avec succès')
      })
      .catch(error => {
        console.log(error);
        this.notifService.danger('Echec une érreur inconnue c\'est produite');
      })
      .finally(() => this.isLoading = false);

  }

  public deleteDocument(document_id: number) {

    this.isLoading = true;
    this.documentViewerService.deleteDocument(document_id)
      .then(response => {
        console.log(response);
        this.notifService.success('Le document a été supprimé avec succès')
      })
      .catch(error => {
        console.log(error);
        this.notifService.danger('Echec une érreur inconnue c\'est produite');
      })
      .finally(() => this.isLoading = false);

  }

  public getAllDocument() {

    this.isLoading = true;
    this.documentViewerService.getAllDocument()
      .then(response => {
        console.log(response);
        this.documents = response;
        this.notifService.success('Chargement des documents éffectué')
      })
      .catch(error => {
        console.log(error);
        this.notifService.danger('Echec une érreur inconnue c\'est produite');
      })
      .finally(() => this.isLoading = false);

  }
  
}
