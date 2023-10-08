import { Component } from '@angular/core';
import { Course, CourseStatus, SortColumn } from '../course';//we import our course interface that we defined in other file to be able ti use it


//we will display course list using this component we added to project
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {
  //we will use variable pf array type (array of courses) to store our course list.

  courses: Course[] = [];//course variable is array if Course object.

  //this variable will hold information abour current sort state: column name and sort order (1 for ascending, -1 for descending)
  sortInfo: { column: SortColumn, order: 1 | -1 | null };

  getStatusName(course: Course) {
    const status = course.status;
    if (status == CourseStatus.Active) {
      return "Available";
    }
    else if (status == CourseStatus.Disabled) {
      return "Currently not available"
    }
    else if (status == CourseStatus.Archived) {
      return "Archived";
    }
    else {
      return "Unknown";
    }
  }

  getColumnSortInfoText(column: SortColumn) {
    let result = '';

    if (this.sortInfo.column == column) {
      result = this.sortInfo.order == 1 ? '+' : '-';
    }

    return result;
  }

  onSort(column: SortColumn) {

    //we update sort state
    this.sortInfo.column = column;

    if(this.sortInfo.order == null)
      this.sortInfo.order = 1;//if list is not sorted yet, we sort it in ascending order by default
    else
      this.sortInfo.order = this.sortInfo.order == 1 ? -1 : 1;//reversing order

    //we use inplace sorting (the array is updated inplace)
    //angular will detect change to this variable and view (html) will be updated automatically
    this.courses.sort((a, b) => {
      let result = 0;

      //please think about ways of improving this code, (by making it shorter for cases with many columns)
      switch (column) {
        case 'name':
          {
            if (a.name > b.name)
              result = 1;
            else if (a.name < b.name)
              result = -1;

            break;
          }
        case 'code':
          {
            if (a.code > b.code)
              result = 1;
            else if (a.code < b.code)
              result = -1;

            break;
          }
        case 'credit':
          {
            result = a.credits - b.credits;
            break;
          }
      }

      return result * this.sortInfo.order!;//we multiply result by sort order (if we want descending order the result is multiplied by -1 and order is reversed)
    });
  }

  constructor() {
    //we initialize variable holding courses with some hardcoded dummy data
    //in real world application this data would be retrieved from server via sending ajax request to api endpoint

    this.courses = [
      {
        id: 1,
        code: 'CS234',
        name: 'Angular',
        credits: 5,
        status: CourseStatus.Active,
        type: "elective"
      },
      {
        id: 2,
        code: 'CS235',
        name: 'React',
        credits: 3,
        status: CourseStatus.Active,
        type: "elective"
      },
      {
        id: 3,
        code: 'CS236',
        name: 'Introduction to Vue',
        credits: 7,
        status: CourseStatus.Disabled,
        type: "elective"
      },
      {
        id: 4,
        code: 'CS237',
        name: 'AngularJS',
        credits: 7,
        status: CourseStatus.Archived,
        type: "elective"
      },
      {
        id: 5,
        code: 'CS238',
        name: 'AngularJS demo',
        credits: 7,
        status: <any>-1,//this is intentional to avoid type checks for showing example of invalid data
        type: "core"
      },
    ];

    //we initialize sort state. key is empty string as initially list is not sorted, order is ascending by default so we assign 1
    this.sortInfo = {
      column: '',
      order: 1
    };
  }
}
