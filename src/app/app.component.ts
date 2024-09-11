import { Component } from '@angular/core';
import { CourseListComponent } from './course-list/course-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CourseListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lecture2-examples';
}
