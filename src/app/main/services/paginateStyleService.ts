import { Injectable } from '@angular/core';
import {
  ElementRef,
  QueryList,
  Renderer2,
  RendererFactory2,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class paginateStyleService {
  private renderer2: Renderer2;
  addClasses: string = 'bg-paletteD-one text-paletteD-three';
  removeClasses: string =
    'bg-paletteD-one text-paletteD-three text-paletteD-one';

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer2 = this.rendererFactory.createRenderer(null, null);
  }

  setData(num: number, list: QueryList<ElementRef>): void {
    const element = list.get(num - 1)?.nativeElement;
    this.setStyle(element, list);
  }

  setStyle(element: HTMLAnchorElement, links: QueryList<ElementRef>): void {
    links.map((item) => {
      this.removeClasses.split(' ').map((className: string) => {
        this.renderer2.removeClass(item.nativeElement, className);
      });
    });
    if (element) {
      this.addClasses.split(' ').map((className: string) => {
        setTimeout(() => {
          this.renderer2.addClass(element, className);
        }, 200);
      });
    }
  }
}
