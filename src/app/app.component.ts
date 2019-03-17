import { Category } from './category';
import { SlideshareService } from './slideshare.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Slide } from './slide';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('modal') modal: ElementRef;
  
  slide: Slide
  items: Category[] = SlideshareService.defaultCategories;

  constructor(private modalService: NgbModal, private slideshareService: SlideshareService) { }

  setValue(item: Category) {
    this.slideshareService.findRandomOneByCategory(item.category).subscribe((slide: Slide) => {
      this.slide = slide;
      this.slide.category = item;
      this.modalService.open(this.modal, {size: 'lg', centered: true});
    });
  }
}
