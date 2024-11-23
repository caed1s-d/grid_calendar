import { Component } from '@angular/core';
import { CalendarViewComponent } from "./common-ui/calendar-view/calendar-view.component";

@Component({
  selector: 'app-root',
  imports: [CalendarViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
