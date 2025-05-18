export type IAcquiredCourse = {
  courseId: number
  dateJoined: string
}

export interface IUser {
  id: number
  name: string
  courses: IAcquiredCourse[]
}
