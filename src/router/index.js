import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import AboutMe from '../views/AboutMe.vue'
import MyPicture from '@/views/MyPicture.vue'
import MyNote from '@/views/MyNote.vue'
import AboutMessage from '@/views/AboutMessage.vue'
import NoteAllLook from '@/views/NoteAllLook.vue'
import NoteAdd from '@/views/NoteAdd.vue'
import ReadNote from '@/views/ReadNote.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/AboutMe'
  },
  {
    path: '/AboutMe',
    component: AboutMe
  },
  {
    path: '/MyPicture',
    component: MyPicture
  },
  {
    path: '/MyNote',
    component: MyNote,
    redirect: '/MyNote/NoteAllLook',
    children: [
      {
        path: '/MyNote/NoteAllLook',
        component: NoteAllLook
      },
      {
        path: '/MyNote/NoteAdd',
        component: NoteAdd
      },
      {
        path: '/MyNote/ReadNote',
        component: ReadNote
      }
    ]
  },
  {
    path: '/AboutMessage',
    component: AboutMessage
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
