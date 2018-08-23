import { 
  Input, 
  Output, 
  OnInit, 
  Component, 
  EventEmitter, 
} from '@angular/core';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
  @Input() articles: any;
  @Output() viewArticle = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onArticleTapped(idx, _article) {
    console.log(`[ArticlesListComponent] Article Selected - ${idx} - `, _article);
    this.viewArticle.emit(_article);
  }

}
