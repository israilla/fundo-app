import { Component } from '@angular/core';
import { Location } from '@angular/common'
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'fundo-app';
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
