# easyManage 学生管理系统

开发环境
<ul>
  <li>windows 11</li>
  <li>mysql 8.0.40</li>
  <li>node 22.11</li>
</ul>

## 启动项目
1. 执行./public/database.sql建表
2. 下载依赖
   ```npm install```
3. 在项目根目录配置.env文件
```bash
JWT_SECRET="随便输入的字符串"
DATABASE_URL="mysql://{userName}:{userPassword}@{mysql address}/easymanage"
```
4. 配置prisma
```bash
1. npx prisma init
-- 更改生成的.prisma文件中的database为mysql
2. npx prisma db pull
3. npx prisma generate
```
5. 本地调试
   ```npm run dev```
6. 打包
   ```npm run build```
7. 启动服务器
   ```npm run start```

## 项目依赖

```
  1. tailwind
  2. prisma
  3. axios
  4. moment
```

## 项目概览

待完成

## 项目进展

|     日期     |    进展     |
|:----------:|:---------:|
| 2024.11.2  |    建库     |
| 2024.11.4  |   引入数据库   |
| 2024.11.5  |  建表初步完成   |
| 2024.11.6  | 前端正确显示数据  |
| 2024.11.7  |  实现数据分页   |
| 2024.11.8  |  实现筛选个人   |
| 2024.11.10 | 实现筛选系部与班级 |
| 2024.11.12 | 完成全部的概览界面 |
| 2024.11.15 |  完成登录鉴权   |

