-- 创建数据库
CREATE DATABASE IF NOT EXISTS animal_rescue;
USE animal_rescue;

-- 动物分类表
CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL COMMENT '分类名称',
  description VARCHAR(255) COMMENT '分类描述',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 动物信息表
CREATE TABLE IF NOT EXISTS animals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL COMMENT '动物名称',
  category_id INT NOT NULL COMMENT '分类ID',
  age TINYINT COMMENT '年龄',
  gender ENUM('公', '母', '未知') DEFAULT '未知' COMMENT '性别',
  weight DECIMAL(5,2) COMMENT '体重(kg)',
  description TEXT COMMENT '描述信息',
  status ENUM('待领养', '已领养', '救助中', '已安乐死') DEFAULT '待领养' COMMENT '状态',
  photo_url VARCHAR(255) COMMENT '照片URL',
  location VARCHAR(100) COMMENT '发现地点',
  found_at DATE COMMENT '发现日期',
  created_by INT COMMENT '创建人ID',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 用户表
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
  password_hash VARCHAR(100) NOT NULL COMMENT '加密密码',
  email VARCHAR(100) UNIQUE COMMENT '邮箱',
  phone VARCHAR(20) COMMENT '电话',
  address VARCHAR(255) COMMENT '地址',
  role ENUM('管理员', '志愿者', '普通用户') DEFAULT '普通用户' COMMENT '角色',
  avatar_url VARCHAR(255) COMMENT '头像URL',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 领养申请表
CREATE TABLE IF NOT EXISTS adoption_applications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  animal_id INT NOT NULL COMMENT '动物ID',
  applicant_id INT NOT NULL COMMENT '申请人ID',
  status ENUM('申请中', '已通过', '已拒绝', '已取消') DEFAULT '申请中' COMMENT '申请状态',
  reason TEXT NOT NULL COMMENT '申请理由',
  home_condition TEXT COMMENT '家庭条件',
  contact_info TEXT COMMENT '联系方式',
  review_comment TEXT COMMENT '审核意见',
  reviewed_by INT COMMENT '审核人ID',
  reviewed_at TIMESTAMP COMMENT '审核时间',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (animal_id) REFERENCES animals(id),
  FOREIGN KEY (applicant_id) REFERENCES users(id),
  FOREIGN KEY (reviewed_by) REFERENCES users(id)
);

-- 救助记录表
CREATE TABLE IF NOT EXISTS rescue_records (
  id INT PRIMARY KEY AUTO_INCREMENT,
  animal_id INT NOT NULL COMMENT '动物ID',
  rescuer_id INT NOT NULL COMMENT '救助人ID',
  rescue_location VARCHAR(100) COMMENT '救助地点',
  rescue_date DATE COMMENT '救助日期',
  initial_condition TEXT COMMENT '初始状况',
  medical_treatment TEXT COMMENT '医疗处理',
  current_status TEXT COMMENT '当前状态',
  notes TEXT COMMENT '备注',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (animal_id) REFERENCES animals(id),
  FOREIGN KEY (rescuer_id) REFERENCES users(id)
);

-- 示例数据：分类表
INSERT INTO categories (name, description) VALUES
('猫', '猫咪相关分类'),
('狗', '狗狗相关分类'),
('其他', '其他动物分类');

-- 示例数据：用户表（密码为加密后的 123456）
INSERT INTO users (username, password_hash, email, role) VALUES
('admin', '$2a$10$YhO2UQJqL2bKjRzQJqL2bO2UQJqL2bKjRzQJqL2bO2UQJqL2bO', 'admin@example.com', '管理员'),
('volunteer', '$2a$10$YhO2UQJqL2bKjRzQJqL2bO2UQJqL2bKjRzQJqL2bO2UQJqL2bO', 'volunteer@example.com', '志愿者'),
('user', '$2a$10$YhO2UQJqL2bKjRzQJqL2bO2UQJqL2bKjRzQJqL2bO2UQJqL2bO', 'user@example.com', '普通用户');

-- 示例数据：动物表
INSERT INTO animals (name, category_id, age, gender, weight, description, status, photo_url, location, found_at, created_by) VALUES
('小白', 1, 2, '公', 4.2, '白色的猫咪，性格温顺，已绝育', '待领养', 'https://picsum.photos/seed/cat1/400/300', '北京市朝阳区', '2025-01-15', 1),
('花花', 1, 1, '母', 3.5, '花色猫咪，活泼可爱，已接种疫苗', '待领养', 'https://picsum.photos/seed/cat2/400/300', '上海市浦东新区', '2025-02-20', 2),
('大黄', 2, 3, '公', 12.8, '黄色拉布拉多，友善聪明，训练有素', '已领养', 'https://picsum.photos/seed/dog1/400/300', '广州市天河区', '2024-11-10', 2),
('小黑', 2, 4, '公', 8.5, '黑色泰迪，乖巧安静，已驱虫', '待领养', 'https://picsum.photos/seed/dog2/400/300', '深圳市南山区', '2025-03-05', 1);

-- 示例数据：领养申请表
INSERT INTO adoption_applications (animal_id, applicant_id, status, reason, home_condition, contact_info, reviewed_by, reviewed_at) VALUES
(1, 3, '已通过', '家里有宽敞空间，喜欢猫咪', '独立住房，有猫砂盆和玩具', '电话：13800138000', 1, '2025-01-20 10:30:00'),
(4, 3, '申请中', '想给孩子找个伙伴', '两居室，有阳台', '邮箱：user@example.com', NULL, NULL);

-- 示例数据：救助记录表
INSERT INTO rescue_records (animal_id, rescuer_id, rescue_location, rescue_date, initial_condition, medical_treatment, current_status, notes) VALUES
(1, 2, '朝阳区某小区门口', '2025-01-10', '营养不良，有轻微外伤', '清创、驱虫、接种疫苗', '健康', '发现时躲在垃圾桶旁边'),
(3, 1, '天河区公园', '2024-11-05', '走失状态，项圈有联系方式但已失效', '体检、芯片植入', '已被领养', '通过社交媒体找到原主人但被拒绝认领');
