import { Component, OnInit, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ContentComponent } from '../content/content.component';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, ContentComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private titleService = inject(Title);
  private sidebarService = inject(SidebarService);
  
  // Compute whether the mobile menu is open
  isMobileMenuOpen = computed(() => this.sidebarService.isMobileMenuOpen());

  ngOnInit() {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
      distinctUntilChanged((prev, curr) => prev.urlAfterRedirects === curr.urlAfterRedirects),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }
        return child?.snapshot.data['title'];
      }),
      distinctUntilChanged()
    ).subscribe(title => {
      if (title) {
        this.titleService.setTitle(`Suite Epargne - ${title}`);
      }
      
      // Close mobile menu on navigation
      if (this.isMobileMenuOpen()) {
        this.closeMobileMenu();
      }
    });
  }

  closeMobileMenu() {
    this.sidebarService.setMobileMenuOpen(false);
  }
}