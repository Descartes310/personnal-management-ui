import { Component, OnInit } from '@angular/core';
import { BlogCategory } from 'src/app/_models/blog.category.model';
import { BlogCategoryService } from 'src/app/_services/blog-category.service';
import { NotifService } from 'src/app/_services/notif.service';
import Swal from 'sweetalert2'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-blog-category',
  templateUrl: './all-blog-category.component.html',
  styleUrls: ['./all-blog-category.component.scss']
})
export class AllBlogCategoryComponent implements OnInit {

  blogcats: BlogCategory[] = [];
  loading: boolean = true;
  @BlockUI() blockUI: NgBlockUI;


  //SweetAlert Text
  areYouSure = '';
  warning = ''
  yes = '';
  no = '';
  deleted = '';
  deletedMessage = '';
  cancelled = '';
  cancelledMessage = '';

  constructor(
    private blogCategoryService: BlogCategoryService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router) {

      this.translate.get(
        ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'], 
        { data: 'role' })
        .subscribe(val => {
          this.areYouSure = val['SweetAlert.AreYouSure'];
          this.warning = val['SweetAlert.Warning'];
          this.yes = val['SweetAlert.Yes'];
          this.no = val['SweetAlert.No'];
          this.deleted = val['SweetAlert.Deleted'];
          this.deletedMessage = val['SweetAlert.DeletedMessage'];
          this.cancelled = val['SweetAlert.Cancelled'];
          this.cancelledMessage = val['SweetAlert.CancelledMessage'];
        });
   }

   ngOnInit() {
    this.getBlogCategories();
  }

  getBlogCategories() {
    this.loading = true;
    this.blogCategoryService.all().then(
      response => {
        this.blogcats = [];
        response.data.map( blogcat => {
          this.blogcats.push(new BlogCategory(blogcat));
        });
      }
    ).catch(
      error => {
        this.notifService.danger(error.error.message)
      }
    ).finally(
      () => {
        this.loading = false;
      }
    )
  }

  
  detailsblogcat(blogcat: BlogCategory) {
    this.router.navigate(['BlogCategory/details/'+blogcat.id])
  }

  deleteblogcat(blogcat: BlogCategory) {
    Swal.fire({
      title: this.areYouSure,
      text: this.warning,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.yes,
      cancelButtonText: this.no
    }).then((result) => {
      if (result.value) {
        this.blockUI.start('Loading...');
        this.blogCategoryService.delete(blogcat.id).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            )
            this.getBlogCategories();
          }
        ).catch(
          error => {
            console.log(error)
            this.blockUI.stop();
            this.translate.get('BlogCategory.'+error.error.code)
            .subscribe(val => this.notifService.danger(val));
          }
        )
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          this.cancelled,
          this.cancelledMessage,
          'error'
        )
      }
    })
  }

}


