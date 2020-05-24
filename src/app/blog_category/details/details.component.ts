import { Component, OnInit } from '@angular/core';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { BlogCategory } from 'src/app/_models/blog.category.model';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogCategoryService } from 'src/app/_services/blog-category.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  blogcat: BlogCategory = new BlogCategory();

  constructor(
    private blogCategoryService: BlogCategoryService,
    private notifService: NotifService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    const blogcat_id = +this.route.snapshot.paramMap.get("id");
    this.blogCategoryService.find(blogcat_id).then(
      data => {
        this.blogcat = new BlogCategory(data);
      }
    ).catch(
      error => {
        this.translate.get('BlogCategory.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/BlogCategory/all'])
      }
    )

  }

}