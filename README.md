# HostFolio Template 5 - Angular Material

An enterprise-grade portfolio built with Angular 19 and Material Design principles.

## 🎨 Design Features

- **Material Design**: Following Google's design guidelines
- **Reactive Architecture**: RxJS for state management
- **Smooth Animations**: Angular Animations API
- **Modular Structure**: Component-based architecture
- **Form Validation**: Reactive forms with validators
- **Theming System**: Customizable Material themes

## 🚀 Tech Stack

- **Framework**: Angular 19
- **Language**: TypeScript
- **UI Library**: Angular Material
- **State Management**: RxJS
- **Animations**: Angular Animations
- **Icons**: Material Icons
- **Forms**: Reactive Forms

## 📦 Installation

```bash
# Install Angular CLI
npm install -g @angular/cli

# Create new Angular project
ng new hostfolio_template_5

# Navigate to directory
cd hostfolio_template_5

# Add Angular Material
ng add @angular/material

# Generate components
ng g c components/hero
ng g c components/about
ng g c components/experience
ng g c components/projects
ng g c components/contact
ng g c components/navbar

# Run development server
ng serve
```

## 📁 Project Structure

```
hostfolio_template_5/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── hero/
│   │   │   ├── about/
│   │   │   ├── experience/
│   │   │   ├── projects/
│   │   │   ├── contact/
│   │   │   └── navbar/
│   │   ├── services/
│   │   │   └── data.service.ts
│   │   ├── models/
│   │   │   └── portfolio.model.ts
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── assets/
│   │   └── data.json
│   ├── styles.scss
│   └── theme.scss
├── angular.json
└── package.json
```

## 🎨 Material Modules Used

### Layout
```typescript
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
```

### Forms
```typescript
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
```

### Data Display
```typescript
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
```

### Navigation
```typescript
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
```

## 📋 Data Service

Create a service to load data:

```typescript
// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PortfolioData } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getPortfolioData(): Observable<PortfolioData> {
    return this.http.get<PortfolioData>('assets/data.json');
  }
}
```

## 🎨 Custom Theme

Create `src/theme.scss`:

```scss
@use '@angular/material' as mat;

$custom-primary: mat.define-palette(mat.$indigo-palette);
$custom-accent: mat.define-palette(mat.$pink-palette, A200, A100, A400);
$custom-warn: mat.define-palette(mat.$red-palette);

$custom-theme: mat.define-light-theme((
  color: (
    primary: $custom-primary,
    accent: $custom-accent,
    warn: $custom-warn,
  ),
  typography: mat.define-typography-config(),
  density: 0,
));

@include mat.all-component-themes($custom-theme);

// Dark theme
.dark-theme {
  $dark-theme: mat.define-dark-theme((
    color: (
      primary: $custom-primary,
      accent: $custom-accent,
      warn: $custom-warn,
    )
  ));
  
  @include mat.all-component-colors($dark-theme);
}
```

## 🔄 Reactive Forms

Example contact form:

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
    }
  }
}
```

## 🎭 Animations

```typescript
import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

// Use in component
@Component({
  animations: [fadeInAnimation]
})
```

## 🚀 Build & Deploy

```bash
# Development build
ng build

# Production build
ng build --configuration production

# Serve production build locally
npm install -g http-server
http-server dist/hostfolio-template-5
```

## 📱 Responsive Design

Angular Material provides responsive directives:

```html
<div fxLayout="row" fxLayout.xs="column" fxLayoutGap="16px">
  <div fxFlex="50" fxFlex.xs="100">Content 1</div>
  <div fxFlex="50" fxFlex.xs="100">Content 2</div>
</div>
```

## 🧪 Testing

```bash
# Unit tests
ng test

# E2E tests
ng e2e

# Code coverage
ng test --code-coverage
```

## 🔧 Environment Configuration

```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:4200'
};

// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://yoursite.com'
};
```

## 📚 Resources

- [Angular Docs](https://angular.io/docs)
- [Material Design](https://material.angular.io/)
- [RxJS](https://rxjs.dev/)

---

Built with ❤️ for HostFolio
