import {
  ElementRef, Output, Directive, AfterViewInit, OnDestroy, EventEmitter, PLATFORM_ID, Inject
} from '@angular/core';
import { Subscription , fromEvent } from 'rxjs';
import { startWith } from 'rxjs/operators';
import {isPlatformBrowser} from "@angular/common";



@Directive({
  standalone: true,
  selector: '[appear]'
})
export class AppearDirective implements AfterViewInit, OnDestroy {
  @Output() appear: EventEmitter<void>;

  elementPos: number | undefined;
  elementHeight: number | undefined;
  scrollPos: number | undefined;
  windowHeight: number | undefined;
  subscriptionScroll: Subscription | undefined;
  subscriptionResize: Subscription | undefined;
  constructor(private element: ElementRef,
              @Inject(PLATFORM_ID) private platformId: Object ) {
    this.appear = new EventEmitter<void>();
  }

  saveDimensions() {
    if(this.element.nativeElement){
      this.elementPos = this.getOffsetTop(this.element.nativeElement);
      this.elementHeight = this.element.nativeElement.offsetHeight;
      this.windowHeight = window.innerHeight;
    }
  }
  saveScrollPos() {
    this.scrollPos = window.scrollY;
  }
  getOffsetTop(element: any) {
    let offsetTop = element.offsetTop || 0;
    if (element.offsetParent) {
      offsetTop += this.getOffsetTop(element.offsetParent);
    }
    return offsetTop;
  }
  checkVisibility() {
    if (this.isVisible()) {
      // double check dimensions (due to async loaded contents, e.g. images)
      this.saveDimensions();
      if (this.isVisible() ) {
        this.unsubscribe();
        this.appear.emit();
      }
    }
  }
  isVisible() {// @ts-ignore
    return this.scrollPos >= this.elementPos || (this.scrollPos + this.windowHeight) >= (this.elementPos + (this.elementHeight /2 ));
  }

  subscribe() {
    this.subscriptionScroll = fromEvent(window, 'scroll').pipe(startWith(null))
      .subscribe(() => {
        this.saveScrollPos();
        this.checkVisibility();
      });
    this.subscriptionResize = fromEvent(
      window, 'resize').pipe(startWith(null))
      .subscribe(() => {
        this.saveDimensions();
        this.checkVisibility();
      });
  }
  unsubscribe() {
    if (this.subscriptionScroll) {
      this.subscriptionScroll.unsubscribe();
    }
    if (this.subscriptionResize) {
      this.subscriptionResize.unsubscribe();
    }
  }

  ngAfterViewInit() {
    if(isPlatformBrowser(this.platformId)){
      this.subscribe();
    }else{
      this.appear.emit();
    }
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
