import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminSubjectView from '../views/AdminSubjectsView.vue'
import AdminQuizzesView from "@/views/AdminQuizzesView.vue";
import AdminQuestionsView from "@/views/AdminQuestionsView.vue";
import AdminAnswersView from "@/views/AdminAnswersView.vue";
import SubjectsView from "@/views/SubjectsView.vue";
import QuizzesView from "@/views/QuizzesView.vue";
import QuizFlowView from "@/views/QuizFlowView.vue";
import ResultsView from "@/views/ResultsView.vue";
import AdminTopicsView from "@/views/AdminTopicsView.vue";
import PostsAddView from "@/views/PostsAddView.vue";
import LoginView from "@/views/identity/LoginView.vue";
import RegisterView from "@/views/identity/RegisterView.vue";
import TopicsViews from "@/views/TopicsViews.vue";
import PostsView from "@/views/userflow/PostsView.vue";
import PostView from "@/views/userflow/PostView.vue";
import TodosView from "@/views/userflow/TodosView.vue";
import LogoutComponent from "@/components/identity/LogoutComponent.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/post/:id',
    name: 'postwitchcomments',
    component: PostView
  },
  {
    path: '/todos',
    name: 'todos',
    component: TodosView
  },
  {
    path: '/topics',
    name: 'topics',
    component: TopicsViews
  },
  {
    path: '/topic/:topicId',
    name: 'topicswithposts',
    component: PostsView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutComponent
  },
  {
    path: '/admin/add-subject',
    name: 'add-subject',
    component: AdminSubjectView
  },
  {
    path: '/admin/add-quiz',
    name: 'add-quiz',
    component: AdminQuizzesView
  },
  {
    path: '/admin/add-question',
    name: 'add-question',
    component: AdminQuestionsView
  },
  {
    path: '/admin/add-answer',
    name: 'add-answer',
    component: AdminAnswersView
  },
  {
    path: '/admin/add-topic',
    name: 'add-topic',
    component: AdminTopicsView
  },
  {
    path: '/subjects',
    name: 'subjects',
    component: SubjectsView
  },
  {
    path: '/subject/:subj/quizzes/:id',
    name: 'subjects-quizzes',
    component: QuizzesView
  },
  {
    path: '/quiz/:quizId/userQuiz/:userQuizId',
    name: 'userQuizFlow',
    component: QuizFlowView
  },
  {
    path: '/results/:userQuizId/',
    name: 'ResultsView',
    component: ResultsView
  },
  {
    path: '/post-add/',
    name: 'PostsAddView',
    component: PostsAddView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
