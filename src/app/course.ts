
//we define interface for describing course data
//we specify course properties we will store/display/process in our application.
//These properties are defined based on our application needs and business requirements)
export interface Course {
    id: number;
    name: string;
    code: string;
    credits: number;
    status: CourseStatus;
    type: 'core' | 'elective' //we can also use enum here
}


//we define enum for course status, that can be either active, disabled (temporary) or archived (for example legacy course thar are no more availale)
export enum CourseStatus {
    Active,
    Disabled,
    Archived
}



export type SortColumn = '' | 'name' | 'code' | 'credit';