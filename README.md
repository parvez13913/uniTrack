# UniTrack: University Management Auth Service

# Application Routes

## Login
* api/v1/auth/login (POST)
* api/v1/auth/change-password (POST) [Change Password]
* api/v1/auth/refresh-token (POST) [Get Refresh Token]

## Admin
* api/v1/users/create-admin (POST)
* api/v1/admins (GET)
* api/v1/admins/A-00001 (Single GET)
* api/v1/admins/A-00001 (PATCH)
* api/v1/admins/A-00001 (DELETE)

## Student 
* api/v1/users/create-student (POST)
* api/v1/students (GET)
* api/v1/students/220100004 (Single GET)
* api/v1/students/220100004 (PATCH)
* api/v1/students/220100004 (DELETE)

## Faculty
* api/v1/users/create-faculty (POST)
* api/v1/faculties (GET)
* api/v1/faculties/F-00002 (Single GET)
* api/v1/faculties/F-00002 (PATCH)
* api/v1/faculties/F-00002 (DELETE)

## Academic Faculty 
* api/v1/academic-faculties/create-faculty (POST)
* api/v1/academic-faculties (GET)
* api/v1/academic-faculties/6487d5be94ac190809515826 (Single GET)
* api/v1/academic-faculties/6487d5be94ac190809515826 (PATCH)
* api/v1/academic-faculties/6487d5be94ac190809515826 (DELETE)

## Academic Semester
* api/v1/academicSemesters (POST)
* api/v1/academicSemesters (GET)
* api/v1/academicSemesters/6505d075ee3b2fd9a28c92af (Single GET)
* api/v1/academicSemesters/6505d075ee3b2fd9a28c92af (PATCH)
* api/v1/academicSemesters/6505d075ee3b2fd9a28c92af (DELETE)

## Academic Department
* api/v1/academic-department/create-department (POST)
* api/v1/academic-department (GET)
* api/v1/academic-department/64893fda2e7f77a91229b094 (Single GET)
* api/v1/academic-department/64893fda2e7f77a91229b094 (PATCH)
* api/v1/academic-department/64893fda2e7f77a91229b094 (DELETE)
