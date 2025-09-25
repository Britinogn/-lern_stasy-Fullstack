import { createRouter, createWebHistory } from "vue-router";

//importin all pages/views

import Courses from '../views/Courses.vue'
import CourseCreate from '../views/CourseCreate.vue'
import CourseDetails from '../views/CourseDetails.vue'
import CourseEdit from '../views/CourseEdit.vue'

import Enrollment from '../views/Enrollment.vue'

import Home from '../views/Home.vue'

import Lesson from '../views/Lessons.vue'
import LessonCreate from '../views/LessonCreate.vue'
import LessonDetails from '../views/LessonDetails.vue'
import LessonEdit from '../views/LessonEdit.vue'

import Login from '../views/Login.vue'
import Progress from '../views/Progress.vue'
import Register from '../views/Register.vue'

import StudentDashboard from '../views/StudentDashboard.vue'
import InstructorDashboard from '../views/InstructorDashboard.vue'

import {auth} from '../services/auth'
// DEFINE THE ROUTES

const routes = [

    // Public
    {path: '/', name: 'Home' , component: Home},
    {path: '/register', name: 'Register' , component: Register,   meta:{hideNavbar: true}},
    {path: '/login', name: 'Login' , component: Login ,  meta:{hideNavbar: true}},
    {path: '/courses/:id', name: 'CourseDetails' , component: CourseDetails ,},

    
    // Authenticated / Protected

    {path: '/courses', name: 'Courses' , component: Courses ,   meta:{requiresAuth: true}},
    {path: '/courses/create', name: 'CourseCreate' , component: CourseCreate ,   meta:{requiresAuth: true}},
    {path: '/courses/:id/edit', name: 'CourseEdit' , component: CourseEdit,    meta:{requiresAuth: true},  props: true},
    
    {path: '/courses/:courseId/enrollments', name: 'Enrollment' , component: Enrollment },

    {path: '/lessons', name: 'Lesson' , component: Lesson , meta:{requiresAuth: true} },
    {path: '/courses/:id/lesson', name: 'LessonCreate' , component: LessonCreate, meta:{requiresAuth: true} },
    {path: '/lessons/:id', name: 'LessonDetails' , component: LessonDetails, meta:{requiresAuth: true} },
    {path: '/lessons/:id/edit', name: 'LessonEdit' , component: LessonEdit, meta:{requiresAuth: true},  props: true },
    
    {path: '/', name: 'Progress' , component: Progress},
  

    //
    {path: '/student/dashboard', name: 'StudentDashboard' , component: StudentDashboard, meta:{requiresAuth: true,
        // children: [
        //     { path: '', component: DashboardHome },          // /student/dashboard
        //     { path: 'courses', component: EnrolledCourses }, // /student/dashboard/courses
        //     { path: 'profile', component: Profile }         // /student/dashboard/profile
        // ]
    }},
    {path: '/instructor/dashboard', name: 'InstructorDashboard' , component: InstructorDashboard, meta:{requiresAuth: true}}
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
   if((to.name === 'Login' || to.name === 'Register')&& loggedIn) return next({name: 'Courses'});
   next();
})

export default router;