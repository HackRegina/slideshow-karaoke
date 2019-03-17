import { Category } from './../category';
import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';

class CategorySection extends Category {
  max?: number
  min?: number
}

@Component({
  selector: 'app-spin-wheel',
  templateUrl: './spin-wheel.component.html',
  styleUrls: ['./spin-wheel.component.scss']
})
export class SpinWheelComponent implements OnInit {

  @Input() items: CategorySection[] = [];
  @Output() value = new EventEmitter()

  clicks = 0;
  finishedCounters = 0
  topItem
  flickSpinner = false
  degrees = 360 * 5;
  startDegree = 30
  totalDegree: number

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    let a = 360 / this.items.length
    this.items = this.items.map((item, j) => ({...item, max: this.getSimplifiedDegree(a + a*j - 1), min: this.getSimplifiedDegree(a*j)}))
  }

  spin() {
    this.finishedCounters = 0
    this.clicks++;
    let a = 360 / this.items.length

    /* multiply the degree by number of clicks
	  generate random number between 1 - 360, 
    then add to the new degree */
    const newDegree = this.degrees * this.clicks;
    const extraDegree = Math.floor(Math.random() * (360 - 1 + 1)) + 1;
    this.totalDegree = newDegree + extraDegree + this.startDegree;
    this.startDegree = this.totalDegree
    this.topItem = this.items.find(j => j.max > this.getSimplifiedDegree(this.totalDegree) && j.min <= this.getSimplifiedDegree(this.totalDegree))

    /*let's make the spin btn to tilt every
		time the edge of the section hits 
		the indicator*/
    const hElement: HTMLElement = this.elRef.nativeElement;

    //now you can simply get your elements with their class name
    const sections = Array.from(hElement.getElementsByClassName('sec'));

    sections.forEach((section, i) => {
      const t = new ElementRef(section);
      let noY = 0;

      let c = 0;
      let n = 700;
      let interval = setInterval(() => {
        c++;
        let value = section.getBoundingClientRect().top;
        if (c === n) {
          clearInterval(interval);
          this.setValue(i, value)
        }

        /*23.7 is the minumum offset number that 
        each section can get, in a 30 angle degree.
        So, if the offset reaches 23.7, then we know
        that it has a 30 degree angle and therefore, 
        exactly aligned with the spin btn*/
        if (value < 23.89) {
          this.flickSpinner = true;
          setTimeout(() => {
            this.flickSpinner = false;
          }, 100);
        }
      }, 10);

      noY = t.nativeElement.getBoundingClientRect().top;
    })
  }

  setValue(index, value) {
    this.finishedCounters++
    if(this.finishedCounters !== this.items.length) { return }
    this.value.emit(this.topItem)
  }

  getSimplifiedDegree(degree: number): number {
    if(degree) {
      degree += 360
    }
    let b = Math.floor((degree / 360))
    return degree - b*360
  }

}
