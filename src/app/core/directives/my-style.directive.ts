import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[myStyle]',
})
export class MyStleDirective {

  constructor(private element : ElementRef , private render2 : Renderer2) {
    render2.addClass(element.nativeElement,'bg-red-500');
   }

}
