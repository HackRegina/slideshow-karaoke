import { Category } from './category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Slide } from './slide';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlideshareService {

  static defaultCategories: Category[] = [
    {category: 'popular', icon:'star-o', title: 'Most Popular', image: 'https://www.slideshare.ner/images/categories/banner/popular.png'},
    {category: 'featured', icon:'trophy', title: 'Editor’s Picks', image: 'https://www.slideshare.net/images/categories/banner/featured.png'},
    {category: 'design', icon:'pencil', title: 'Design', image: 'https://slideshare-wordpress-blog-pictures.s3.amazonaws.com/cat_design.jpeg'},
    {category: 'small-business-entrepreneurship', icon:'line-chart', title: 'Entrepreneurship', image: 'https://slideshare-wordpress-blog-pictures.s3.amazonaws.com/cat_small-business-entrepreneurship.jpeg'},
    {category: 'software', icon:'code', title: 'Software', image: 'https://slideshare-wordpress-blog-pictures.s3.amazonaws.com/cat_software.jpeg'},
    {category: 'technology', icon:'microchip', title: 'Technology', image: 'https://slideshare-wordpress-blog-pictures.s3.amazonaws.com/cat_technology.jpeg'},
  ];

  constructor(private http: HttpClient) { }

  findRandomOneByCategory(category: string) {
    let $slides: Observable<Slide[]>;
    switch (category) {
      case 'popular':
        $slides = this.findAllPopular();
        break;
      case 'featured':
        $slides = this.findAllFeatured();
        break;
      case 'design':
        $slides = this.findAllDesign();
        break;
      case 'small-business-entrepreneurship':
        $slides = this.findAllSmallBusinessEntrepreneurship();
        break;
      case 'software':
        $slides = this.findAllSoftware();
        break;
      case 'technology':
        $slides = this.findAllTechnology();
        break;
      default:
        $slides = new Observable<Slide[]>();
        break;
    }
    return $slides.pipe(map(this.pickRandomSlide));
  }

  private pickRandomSlide(slides){
    const randomIndex = Math.floor(Math.random() * slides.length);
    return slides ? slides[randomIndex] : null;
  }

  findAllPopular(): Observable<Slide[]> {
    return this.http.get<Slide[]>('./assets/popular.json');
  }

  findAllFeatured(): Observable<Slide[]> {
    return this.http.get<Slide[]>('./assets/featured.json');
  }

  findAllDesign(): Observable<Slide[]> {
    return this.http.get<Slide[]>('./assets/design.json');
  }

  findAllSmallBusinessEntrepreneurship(): Observable<Slide[]> {
    return this.http.get<Slide[]>('./assets/small-business-entrepreneurship.json');
  }

  findAllSoftware(): Observable<Slide[]> {
    return this.http.get<Slide[]>('./assets/software.json');
  }

  findAllTechnology(): Observable<Slide[]> {
    return this.http.get<Slide[]>('./assets/technology.json');
  }
}
