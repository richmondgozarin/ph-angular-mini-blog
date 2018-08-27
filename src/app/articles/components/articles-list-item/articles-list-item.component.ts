import { 
  Component, 
  OnInit, 
  Input, 
  Output, 
  EventEmitter 
} from '@angular/core';

@Component({
  selector: 'app-articles-list-item',
  templateUrl: './articles-list-item.component.html',
  styleUrls: ['./articles-list-item.component.scss']
})
export class ArticlesListItemComponent implements OnInit {
  @Input() article: any;
  @Output() articleTapped = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onItemTapped() {
    this.articleTapped.emit(this.article);
  }
}
