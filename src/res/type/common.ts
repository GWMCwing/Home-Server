import { AvailableSchool } from '../../server/util/common';
export type SchoolName = typeof AvailableSchool[keyof typeof AvailableSchool];
