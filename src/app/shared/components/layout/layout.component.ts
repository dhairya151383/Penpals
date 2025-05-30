import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent],
  templateUrl:'./layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {}