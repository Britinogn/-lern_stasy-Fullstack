import { createRouter, createWebHistory } from "vue-router";

//importing all pages/views

import Courses from '../views/Courses.vue'
// import CourseCreate from '../views/CourseCreate.vue'
import CourseDetails from '../views/CourseDetails.vue'
import CourseEdit from '../views/CourseEdit.vue'
import CourseManage from '../views/CourseManage.vue'
import StudentManage from '../views/StudentManage.vue'

import Enrollment from '../views/Enrollment.vue'

import Home from '../views/Home.vue'

import Lesson from '../views/Lessons.vue'
import LessonCreate from '../views/LessonCreate.vue'
import LessonDetails from '../views/LessonDetails.vue'
import LessonEdit from '../views/LessonEdit.vue'

import Login from '../views/Login.vue'
import Progress from '../views/Progress.vue'
import Register from '../views/Register.vue'
import ForgotPassword from "../views/forgotPassword.vue";
import ResetPassword from "../views/resetPassword.vue";
import Profile  from "../views/Instructor/Profile.vue";

import StudentDashboard from '../views/Student/StudentDashboard.vue'

//instruction dashboard
import InstructorDashboard from '../views/Instructor/InstructorDashboard.vue'
import InstructorStudents from '../views/Instructor/Students.vue'
import InstructorLessonEditor from '../views/Instructor/LessonEditor.vue'
import InstructorAnalytics from '../views/Instructor/Analytics.vue'
import InstructorCourseEditor from '../views/Instructor/CourseEditor.vue'
import InstructorCourseCreate from '../views/Instructor/CourseCreate.vue'


import {auth} from '../services/auth'
// DEFINE THE ROUTES

const routes = [

    // Public

    { path: '/', name: 'Home', component: Home, meta: { hideLayout: true } },
    { path: '/login', name: 'Login', component: Login, meta: { hideLayout: true } },
    { path: '/register', name: 'Register', component: Register, meta: { hideLayout: true } },
    { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword, meta: { hideLayout: true } },
    { path: '/reset-password/:token', name: 'ResetPassword', component: ResetPassword, meta: { hideLayout: true } },
    

    {path: '/courses/:id', name: 'CourseDetails' , component: CourseDetails, meta: { hideLayout: true },},
    
    
    // Authenticated / Protected

    {path: '/courses', name: 'Courses' , component: Courses ,   meta:{requiresAuth: true},meta: { hideLayout: true } },
    //{path: '/courses/create', name: 'CourseCreate' , component: CourseCreate ,   meta:{requiresAuth: true}},
    {path: '/courses/:id/edit', name: 'CourseEdit' , component: CourseEdit,    meta: { hideLayout: true }, props: true},
    
    // course management 
    {path: '/courses/create', name: 'CourseManage' , component: CourseManage ,   meta:{requiresAuth: true}},
    {path: '/course/:id/students', name: 'StudentManage' , component: StudentManage,    meta:{requiresAuth: true},  props: true},
    

    {path: '/courses/:courseId/enrollments', name: 'Enrollment' , component: Enrollment },

    {path: '/lessons', name: 'Lesson' , component: Lesson , meta: { hideLayout: true } },
    {path: '/courses/:id/lesson', name: 'LessonCreate' , component: LessonCreate, meta: { hideLayout: true }, },
    {path: '/lessons/:id', name: 'LessonDetails' , component: LessonDetails, meta: { hideLayout: true }, },
    {path: '/lessons/:id/edit', name: 'LessonEdit' , component: LessonEdit, meta: { hideLayout: true },   props: true },
    
    {path: '/', name: 'Progress' , component: Progress},
  

    //
    {path: '/student/dashboard', name: 'StudentDashboard' , component: StudentDashboard,  meta: { hideLayout: true },
        // children: [
        //     { path: '', component: DashboardHome },          // /student/dashboard
        //     { path: 'courses', component: EnrolledCourses }, // /student/dashboard/courses
        //     { path: 'profile', component: Profile }         // /student/dashboard/profile
        // ]
    },
    {path: '/instructor/dashboard', name: 'InstructorDashboard' , component: InstructorDashboard, meta:{requiresAuth: true}, meta: { hideLayout: false }},
    {path: '/instructor/course-create', name: 'InstructorCourseCreate' , component: InstructorCourseCreate, meta:{requiresAuth: true}, meta: { hideLayout: false }},
    {path: '/instructor/course-editor/:id', name: 'InstructorCourseEditor' , component: InstructorCourseEditor, meta:{requiresAuth: true}, meta: { hideLayout: false }, props: true},
    {path: '/instructor/students', name: 'InstructorStudents' , component: InstructorStudents, meta:{requiresAuth: true}, meta: { hideLayout: false }},
    //{path: '/instructor/lesson-editor', name: 'InstructorLessonEditor' , component: InstructorLessonEditor,  props: route => ({ courseId: route.query.courseId }), meta:{requiresAuth: true}, meta: { hideLayout: false }},
    {path: '/instructor/analytics', name: 'InstructorAnalytics' , component: InstructorAnalytics, meta:{requiresAuth: true}, meta: { hideLayout: false }},
    {path: '/instructor/profile', name: 'Profile' , component: Profile, meta:{requiresAuth: true}, meta: { hideLayout: false }},
    // {path: '/', name: 'Home' , component: Home},



]



// register route
const router  = createRouter({
    history: createWebHistory(),
    routes  
});






router.beforeEach((to , from , next) => {
   const requiresAuth = to.meta.requiresAuth;

/**
 * Indicates whether the user is currently logged in.
 * Returns true if an authentication token exists in the auth object or in localStorage.
 * @type {boolean}
 */
   const loggedIn = !!(auth.token || localStorage.getItem('token'));
   if (requiresAuth && !loggedIn) return next ({name: 'Login'});
//    if (requiresAuth && auth.token()) {
//         authStore.logout();
//         return next({ name: 'Login' });
//    }
   if((to.name === 'Login' || to.name === 'Register')&& loggedIn) return next({name: 'Courses'});
   next();
})

export default router;