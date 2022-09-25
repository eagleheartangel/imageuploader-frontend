import { Injectable } from '@angular/core';
import {
  ElementRef,
  QueryList,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoutestyleService {
  private renderer2: Renderer2;
  addClasses: string =
    'bg-paletteD-three border-paletteD-two text-paletteD-two shadow-lg';
  removeClasses: string =
    'bg-paletteD-three border-paletteD-two text-paletteD-two border-palette-three shadow-lg';

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer2 = this.rendererFactory.createRenderer(null, null);
  }

  setRoute(event: NavigationEnd, links: QueryList<ElementRef>): void {
    const selectedRouter: any = {
      '/images': links.get(0)!.nativeElement,
      '/upload': links.get(1)!.nativeElement,
    };
    let url = event.urlAfterRedirects || event.url;
    if (url.split('/')[1] == 'images') {
      url = '/images';
    }
    const element = selectedRouter[url] || null;
    this.setStyle(element, links);
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
