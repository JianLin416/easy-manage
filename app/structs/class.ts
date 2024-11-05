export default interface Class {
	class_id: number
  class_name: string // 班级编号
  class_students: number // 班级人数
  class_master: string // 班主任
  class_guider: string // 导员
  start_time: string // 入学时间
  end_time: string // 毕业时间
  class_department: string // 课程系部
  class_courses: string[] // 所学课程
}
