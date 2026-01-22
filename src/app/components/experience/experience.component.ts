import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatChipsModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  @Input() experiences: any[] = [];

  getCompanyIcon(company: string): string {
    const icons: { [key: string]: string } = {
      'Tech Solutions Inc.': 'business',
      'StartupXYZ': 'rocket_launch',
      'Digital Agency Pro': 'web'
    };
    return icons[company] || 'business';
  }

  getUniqueCompanies(experiences: any[]): number {
    const companies = experiences.map(exp => exp.company);
    return new Set(companies).size;
  }

  getTotalTechnologies(experiences: any[]): number {
    const allTech = experiences.flatMap(exp => exp.technologies || []);
    return new Set(allTech).size;
  }
}