import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DataService } from './services/data.service';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s ease-in')
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'hostfolio-template-5';
  portfolioData: any = { personal: { name: '' } };
  activeSection = 'home';
  isMenuOpen = false;
  scrollY = 0;
  scrollProgress = 0;

  navItems: NavItem[] = [];
  particles: any[] = Array(50).fill(0).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    speed: Math.random() * 0.5 + 0.1
  }));

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.portfolioData = data;
      this.updateNavItems();
      this.cdr.detectChanges();
    });

    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }

  private updateNavItems() {
    this.navItems = [];
    if (this.portfolioData.hero) this.navItems.push({ id: 'home', label: 'Home', icon: 'home' });
    if (this.portfolioData.about) this.navItems.push({ id: 'about', label: 'About', icon: 'person' });
    if (this.portfolioData.experience?.length > 0) this.navItems.push({ id: 'experience', label: 'Experience', icon: 'work' });
    if (this.portfolioData.projects?.length > 0) this.navItems.push({ id: 'projects', label: 'Projects', icon: 'code' });
    if (this.portfolioData.contact) this.navItems.push({ id: 'contact', label: 'Contact', icon: 'mail' });
  }

  onScroll() {
    this.scrollY = window.scrollY;

    // Calculate scroll progress
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = (this.scrollY / documentHeight) * 100;

    const sections = document.querySelectorAll('section[id]');
    let current = 'home';
    let minDistance = Infinity;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distance = Math.abs(sectionCenter - viewportCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        current = section.getAttribute('id') || 'home';
      }
    });

    if (this.activeSection !== current) {
      this.activeSection = current;
      this.cdr.detectChanges();
    }
  }

  getSocialIcon(platform: string): string {
    const icons: { [key: string]: string } = {
      'LinkedIn': 'business',
      'GitHub': 'code',
      'Twitter': 'chat',
      'Email': 'email'
    };
    return icons[platform] || 'link';
  }

  scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update active section immediately for better UX
      setTimeout(() => {
        this.activeSection = id;
        this.cdr.detectChanges();
      }, 100);
    }
    this.isMenuOpen = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}