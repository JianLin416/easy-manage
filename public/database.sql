DROP TABLE IF EXISTS Class_Courses;
DROP TABLE IF EXISTS Student;
DROP TABLE IF EXISTS Class;
DROP TABLE IF EXISTS Course;
DROP TABLE IF EXISTS Teacher;

-- 创建 Course 表
CREATE TABLE Course (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(20) UNIQUE NOT NULL,      -- 课程名称，唯一约束
    course_teacher VARCHAR(20) NOT NULL,          -- 课程教师
    course_major VARCHAR(20) NOT NULL,            -- 课程所属专业
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 创建 Class 表
CREATE TABLE Class (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(20) UNIQUE NOT NULL,       -- 班级名称，唯一约束
    class_students INT DEFAULT 0 NOT NULL,        -- 班级人数
    class_master VARCHAR(20) NOT NULL,            -- 班主任
    class_guider VARCHAR(20) NOT NULL,            -- 导员
    start_date DATE NOT NULL,                     -- 入学时间
    end_date DATE,                                -- 毕业时间
    class_department VARCHAR(20) NOT NULL,        -- 课程系部
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 课程和班级的多对多关系
CREATE TABLE Class_Courses (
    class_id INT,
    course_id INT,
    PRIMARY KEY (class_id, course_id),
    FOREIGN KEY (class_id) REFERENCES Class(class_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 创建 Student 表
CREATE TABLE Student (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
	student_card VARCHAR(50) UNIQUE NOT NULL,           -- 学生身份证
    student_name VARCHAR(50) NOT NULL,                  -- 学生名称
    student_gender ENUM('man', 'woman') NOT NULL,       -- 性别
    student_phone VARCHAR(20),                          -- 学生电话号
    student_birth DATE,                                 -- 学生生日
    student_home VARCHAR(100),                          -- 学生住址
    student_comes VARCHAR(50),                          -- 学生生源
    student_number varchar(20) NOT NULL,                -- 学生学号
    student_department VARCHAR(20) NOT NULL,            -- 学生系部
    student_major VARCHAR(20) NOT NULL,                 -- 学生专业
    class_id INT,
    FOREIGN KEY (class_id) REFERENCES Class(class_id) ON DELETE SET NULL,
    UNIQUE (class_id, student_number),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 创建 Teacher 表
CREATE TABLE Teacher (
	teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_name VARCHAR(50) NOT NULL,                                      -- 教师名称
    teacher_gender ENUM('man', 'woman') NOT NULL,                           -- 教师性别
    teacher_phone VARCHAR(20),                                              -- 教师手机号
    teacher_birth DATE,                                                     -- 教师生日
    teacher_home VARCHAR(100),                                              -- 教师住址
    teacher_card VARCHAR(50) UNIQUE NOT NULL,                               -- 教师身份证
    hire_date DATE NOT NULL,                                                -- 入职时间
    teacher_department VARCHAR(20) NOT NULL,                                -- 系部
    teacher_title VARCHAR(20),                                              -- 职称
    teacher_job VARCHAR(20),                                                -- 职位
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 添加索引
CREATE INDEX idx_class_department ON Class(class_department);
CREATE INDEX idx_student_major ON Student(student_major);
CREATE INDEX idx_teacher_department ON Teacher(teacher_department);

-- 插入学生后更新班级人数
CREATE TRIGGER after_student_insert
AFTER INSERT ON Student
FOR EACH ROW
BEGIN
    UPDATE Class
    SET class_students = class_students + 1
    WHERE class_id = NEW.class_id;
END;

-- 删除学生后更新班级人数
CREATE TRIGGER after_student_delete
AFTER DELETE ON Student
FOR EACH ROW
BEGIN
    UPDATE Class
    SET class_students = class_students - 1
    WHERE class_id = OLD.class_id;
END;