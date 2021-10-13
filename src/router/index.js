import { createWebHistory, createRouter } from "vue-router";
import Accueil from '@/components/pages/Accueil'
import Utilisateurs from '@/components/pages/Utilisateurs'
import Connexion from '@/components/pages/Connexion'
import Profile from '@/components/pages/Profile'
import Arrivage from '@/components/pages/Arrivage'
import ArrivageParMois from '@/components/pages/ArrivageParMois'
import NotFound from '@/components/pages/NotFound'
import HelloWorld from '@/components/pages/HelloWorld'


const routes= [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil
  },
  {
    path: '/utilisateurs',
    name: 'Utilisateurs',
    component: Utilisateurs
  },
  {
    path: '/connexion',
    name: 'Connexion',
    component: Connexion
  },
  {
    path: '/profil',
    name: 'Mon profil',
    component: Profile
  },
  {
    path: '/arrivage',
    name: 'Arrivage',
    component: Arrivage
  },
  {
    path: '/arrivage-par-mois',
    name: 'Arrivage par mois',
    component: ArrivageParMois
  },
  {
    path: '/quitter',
    name: 'Se déconnecter',
    component: Connexion
  },
  {
    path: '/hello',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/arrivage','/connexion', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    next('/connexion');
  } else {
    next();
  }
});

export default router;