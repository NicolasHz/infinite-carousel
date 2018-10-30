import { Component, ViewChild, AfterViewInit, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  @ViewChild('carousel') carousel: ElementRef;
  @Input() threshold = 150;
  @Input() slideWidth = 500;
  @Input() animationDuration = 700;
  @Input() slides = [
    { text: 'Slide 06', id: 6 },
    { text: 'Slide 07', id: 7 },
    { text: 'Slide 01', id: 1 },
    { text: 'Slide 02', id: 2 },
    { text: 'Slide 03', id: 3 },
    { text: 'Slide 04', id: 4 },
    { text: 'Slide 05', id: 5 },
  ];
  public dragStart;
  public dragEnd;
  public animating = false;
  public slideSelected = false;
  public animateDirection: -1 | 0 | 1 = 0;

  carouselStyle() {
    return {
      left: `${this.slides.length > 3 ? -950 : -450}px`,
      transform: this.slideSelected ?
        `translateX(${this.dragPos()}px)` :
        `translateX(${(this.animating ? this.animateDirection * this.slideWidth : 0)}px)`,
      transition: this.animating ? `${this.animationDuration}ms` : 'none'
    };
  }

  trackByFn(i, v) {
    return i;
  }

  nextSlide() {
    this.shiftSlide(1);
  }

  prevSlide() {
    this.shiftSlide(-1);
  }

  shiftOne(arr, direction) {
    direction > 0 ? arr.unshift(arr.pop()) : arr.push(arr.shift());
  }

  selectSlide(e, selected) {
    e.stopPropagation();
    if (this.animating) { return; }
    this.slideSelected = selected;
    if (selected) {
      this.dragStart = e.pageX;
      return;
    }
    if (this.dragPos() > 0) { return this.shiftSlide(1); }
    if (this.dragPos() < 0) { return this.shiftSlide(-1); }
    this.shiftSlide(-1);
  }

  dragSlide(e) {
    e.stopPropagation();
    this.dragEnd = e.pageX;
  }

  dragPos() {
    return this.dragEnd - this.dragStart;
  }

  shiftSlide(direction) {
    if (this.animating) return;
    this.animateDirection = direction;
    this.dragEnd = this.dragStart;
    this.animating = true;
    setTimeout(() => {
      this.shiftOne(this.slides, direction)
      this.animating = false;
    }, this.animationDuration);
  }
}
