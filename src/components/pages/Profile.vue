<template>
  <div class="container p-5 d-flex flex-column justify-content-center" style="height:94vh;">
    <h1>Mon profil</h1>
    <div>
      <form class="text-start col-5 mx-auto" :key="forreload">
        <div class="form-group">
          <label>Email</label>
          <input type="text" v-model="utilisateur.email" class="form-control" placeholder="Entrez votre email">
        </div><!-- form-group -->
        <div class="form-group">
          <label>Mot de passe</label>
          <input type="password" class="form-control" v-model="utilisateur.motdepasse" placeholder="Entrez votre mot de passe">
        </div><!-- form-group -->
        <button class="btn btn-primary mt-5 d-grid col-6 mx-auto" @click="ajour">Mettre à jour</button>
      </form>
    </div>
  </div>
</template>

<script>
import UtilisateurService from "../../services/utilisateurService";

export default {
  name: 'Profil',
  
  data () {
    return {
      data:{},
      forreload:0
    }
  },
  methods:{
    ajour(e){
      e.preventDefault();
      const utilisateur = {};
      if (this.data.email !=this.utilisateur.email) {
        utilisateur.email=this.utilisateur.email;
      }
      if (this.data.email !=this.utilisateur.email) {
        utilisateur.motdepasse=this.utilisateur.motdepasse;
      }
      UtilisateurService.update(this.utilisateur.id, utilisateur)
        .then(response => {
          console.log(response.data);
          this.forreload++;
          this.utlisateur = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  computed: {
    utilisateur() {
      return this.$store.state.auth.user;
    }
  },
  watch:{
    utilisateur:function(utilisateur) {
      if (!utilisateur) {
        return;
      }
      this.data=utilisateur;
    }
  },
  mounted() {
    if (!this.utilisateur) {
      this.$router.push('/inscription');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
