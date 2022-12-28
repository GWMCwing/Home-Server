import { CourseBase } from '../../../../res/type/CourseType';
export type DeptIdTuple = [string, string]; // [dept, id]
export type CourseMap = Map<string, CourseBase>;
export type DeptMap = Map<string, CourseMap>;
export type CourseMap_String = Map<string, DeptIdTuple>;
