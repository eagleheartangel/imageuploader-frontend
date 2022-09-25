import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { RoutestyleService } from '../../services/routestyle.service';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faCloudArrowUp: IconDefinition = faCloudArrowUp;
  @ViewChildren('route', { read: ElementRef }) routes!: QueryList<ElementRef>;

  constructor(private router: Router, private routerStyle: RoutestyleService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routerStyle.setRoute(event, this.routes);
      }
    });
  }
}
