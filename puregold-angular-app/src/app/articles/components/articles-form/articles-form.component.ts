import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticlesI } from '../../articles.interface';

@Component({
  selector: 'app-articles-form',
  templateUrl: './articles-form.component.html',
  styleUrls: ['./articles-form.component.scss']
})
export class ArticlesFormComponent implements OnInit {
  
  @Input() formMode: string;
  @Input() article: ArticlesI;
  @Output() saveArticle = new EventEmitter<ArticlesI>();
  @Output() deleteArticle = new EventEmitter<ArticlesI>();
  @Output() cancelArticle = new EventEmitter<void>();

  articleForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.articleForm = this.fb.group({
      id: this.article.id,
      title: [this.article.title, [Validators.required]],
      body: [this.article.body, [Validators.required]]
    });
  }

  /**
   * Save form data
   */
  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    
    console.log('[Articles_Form_Component] Submit Event Value ', value);
    console.log('[Articles_Form_Component] Submit Event Valid ', valid);

    if (valid) {
      this.saveArticle.emit(value);
    }
  }

  /**
   * Delete article
   */
  onDeleteArticle({ value, valid }: { value: ArticlesI, valid: boolean }) {
    console.log('[Articles_Form_Component] DELETE Event Value ', value);
    console.log('[Articles_Form_Component] DELETE Event Valid ', valid);

      this.deleteArticle.emit(value);
  }

  /**
   * Cancel form
   */
  onCancel() {
    this.cancelArticle.emit();
  }
}
