<template>
	<div>
		<section class="main-header navbar navbar-expand-lg navbar-light bg-light">
			<div class="container">
				<div class="title"><h1>ARRIVAGE</h1></div>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<div class="user navbar-nav ms-auto mb-2 mb-lg-0">
						<img id="user_photo" src="https://img.icons8.com/ios/452/user--v1.png" alt=""> 
						<div class="name" v-if="utilisateur && utilisateur.firstname"><span><span id="firstname">{{utilisateur.firstname}}</span> <span id="lastname">{{utilisateur.lastname}}</span></span><router-link class="navbar-brand" id="logout" @click.prevent="deconnexion" :to="{ name: 'Se déconnecter' }">Déconnexion</router-link></div>
						<div class="name" v-if="!utilisateur && !utilisateur.firstname"><router-link class="navbar-brand" id="login" :to="{ name: 'Connexion' }">Connexion</router-link></div>
					</div>
				</div>
			</div>
		</section>
		<section v-if="utilisateur.firstname" class="nav d-flex justify-content-center">
			<div class="container-logo">
			<img src="https://communication.autobonplan.com/abp-home/img/Logo_Autobonplan.png" alt="">
			</div>
			<div class="list-group ">
				<router-link  :to="{name:'Accueil'}" class="list-group-item list-group-item-action">Accueil</router-link>
				<router-link  :to="{name:'Arrivage'}" class="list-group-item list-group-item-action">Tous les arrivages</router-link>
				<router-link  :to="{name: 'Arrivage par mois'}" class="list-group-item list-group-item-action">Arrivage par mois</router-link>
				<router-link v-if="utilisateur.roles && utilisateur.roles.includes('ROLE_IMPORTER')"  :to="{name: 'Utilisateurs'}" class="list-group-item list-group-item-action">Utilisateurs</router-link>
			</div>
			
		</section>
	</div>
</template>

<script>

export default ({
  computed: {
    utilisateur() {
      return this.$store.state.auth.userProfile;
    }
  },
  mounted(){},
  methods: {
    deconnexion() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/connexion');
    }
  }
})
</script>
