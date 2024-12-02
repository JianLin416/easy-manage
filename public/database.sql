use easymanage;

DROP TABLE IF EXISTS Class_Courses;
DROP TABLE IF EXISTS Student;
DROP TABLE IF EXISTS Class;
DROP TABLE IF EXISTS Course;
DROP TABLE IF EXISTS Teacher;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Department;

-- 创建 Department 表
CREATE TABLE Department (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(20) UNIQUE NOT NULL,
    department_students INT DEFAULT 0 NOT NULL,
    department_classes INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 创建 User 表
CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_role ENUM('admin', 'teacher', 'guider') NOT NULL,
    department_name VARCHAR(20),
    FOREIGN KEY (department_name) REFERENCES Department(department_name) ON DELETE SET NULL,
    user_name VARCHAR(50) NOT NULL,
    user_account VARCHAR(50) UNIQUE NOT NULL,
    user_password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 创建 Class 表并添加系部外键
CREATE TABLE Class (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(20) UNIQUE NOT NULL,
    class_students INT DEFAULT 0 NOT NULL,
    class_master VARCHAR(20) NOT NULL,
    class_guider VARCHAR(20) NOT NULL,
    end_date VARCHAR(10),
    department_name VARCHAR(20),
    FOREIGN KEY (department_name) REFERENCES Department(department_name) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 创建 Student 表并添加系部外键
CREATE TABLE Student (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    student_card VARCHAR(50) UNIQUE NOT NULL,
    student_name VARCHAR(50) NOT NULL,
    student_gender ENUM('man', 'woman') NOT NULL,
    student_phone VARCHAR(20),
    student_birth VARCHAR(10),
    student_home VARCHAR(100),
    student_number VARCHAR(20) NOT NULL,
    department_name VARCHAR(20),
    FOREIGN KEY (department_name) REFERENCES Department(department_name) ON DELETE SET NULL,
    student_major VARCHAR(20) NOT NULL,
    class_name VARCHAR(20),
    FOREIGN KEY (class_name) REFERENCES Class(class_name) ON DELETE SET NULL,
    UNIQUE (class_name, student_number),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 创建 TeacherList 表并添加系部外键
CREATE TABLE Teacher (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_name VARCHAR(50) NOT NULL,
    teacher_gender ENUM('man', 'woman') NOT NULL,
    teacher_phone VARCHAR(20),
    teacher_birth VARCHAR(10),
    teacher_home VARCHAR(100),
    teacher_card VARCHAR(50) UNIQUE NOT NULL,
    hire_date VARCHAR(10) NOT NULL,
    department_name VARCHAR(20),
    FOREIGN KEY (department_name) REFERENCES Department(department_name) ON DELETE SET NULL,
    teacher_job VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 添加索引
CREATE INDEX idx_class_department ON Class(department_name);
CREATE INDEX idx_student_major ON Student(student_major);
CREATE INDEX idx_teacher_department ON Teacher(department_name);
CREATE INDEX idx_user_department ON User(department_name);
CREATE INDEX idx_user_role ON User(user_role);

DELIMITER $$

-- 插入学生后更新班级人数和系部学生人数
CREATE TRIGGER after_student_insert
    AFTER INSERT ON Student
    FOR EACH ROW
BEGIN
    UPDATE Class
    SET class_students = class_students + 1
    WHERE class_name = NEW.class_name;

    UPDATE Department
    SET department_students = department_students + 1
    WHERE department_name = NEW.department_name;
END$$

-- 删除学生后更新班级人数和系部学生人数
CREATE TRIGGER after_student_delete
    AFTER DELETE ON Student
    FOR EACH ROW
BEGIN
    UPDATE Class
    SET class_students = class_students - 1
    WHERE class_name = OLD.class_name;

    UPDATE Department
    SET department_students = department_students - 1
    WHERE department_name = OLD.department_name;
END$$

-- 插入班级后更新系部班级数量
CREATE TRIGGER after_class_insert
    AFTER INSERT ON Class
    FOR EACH ROW
BEGIN
    UPDATE Department
    SET department_classes = department_classes + 1
    WHERE department_name = NEW.department_name;
END$$

-- 删除班级后更新系部班级数量
CREATE TRIGGER after_class_delete
    AFTER DELETE ON Class
    FOR EACH ROW
BEGIN
    UPDATE Department
    SET department_classes = department_classes - 1
    WHERE department_name = OLD.department_name;
END$$

DELIMITER ;

