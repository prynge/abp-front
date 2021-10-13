<template>
  <div class="container-fluid row">
    <div class="col-5 card" style="height:90vh;">
		<div class="row ">
			<Form class="text-start" @submit="handleAddUser" :validation-schema="schema">
            <div class="form-group">
				<label>Email</label>
				<Field name="email" type="email" class="form-control"   placeholder="Entrez votre email"/>
				<ErrorMessage name="email" class="error-feedback" />
            </div><!-- form-group -->
            <div class="form-group">
				<label>Mot de passe</label>
				<Field name="password" type="password" class="form-control"  placeholder="Entrez votre mot de passe" />
				<ErrorMessage name="password" class="error-feedback" />
            </div><!-- form-group -->
            <div class="form-group">
				<label>Nom</label>
				<Field name="lastname" type="text" class="form-control"  placeholder="Entrez le nom" />
				<ErrorMessage name="lastname" class="error-feedback" />
            </div><!-- form-group -->
            <div class="form-group">
				<label>Prénom</label>
				<Field name="firstname" type="text" class="form-control"  placeholder="Entrez le prénom" />
				<ErrorMessage name="firstname" class="error-feedback" />
            </div><!-- form-group -->
            <div class="form-check">
				<Field name="importer" value="true" type="radio" class="form-check-input" />
				<label class="form-check-label">Peut importer des fichier ?</label>
				<ErrorMessage name="firstname" class="error-feedback" />
            </div><!-- form-group -->
            <button class="btn btn-primary mt-5 d-grid col-6 mx-auto mb-3" :disabled="loading">Ajouter</button>
            <div class="form-group">
              <div v-if="message" class="alert alert-danger" role="alert">
                {{ message }}
              </div>
            </div>
          </Form>
			
		</div>
	</div>
    <div class="col-7 card">
		<div v-if="!utilisateurs" class="progress">
			<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
		</div>
		<vue-table-lite v-if="utilisateurs"
		:has-checkbox="false"
		:is-loading="table.isLoading" 
		:is-re-search="table.isReSearch" 
		:columns="table.columns" 
		:rows="table.rows" 
		:total="utilisateurs['hydra:totalItems']" 
		:sortable="table.sortable" 
		:messages="table.messages" 
		@do-search="doSearch" 
		@is-finished="tableLoadingFinish" 
		@return-checked-row="updateCheckedRows" 
		/>
	</div>
  </div>
</template>

<script>
import VueTableLite from 'vue3-table-lite';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
	name: 'Utilisateurs',
	components: {
		Form,
		Field,
		ErrorMessage,
		VueTableLite
	},
	data() {
		const schema = yup.object().shape({
		email: yup
			.string()
			.required("Email est requis!")
			.email("Email est invalide!"),
		password: yup
			.string()
			.required("Mot de passe est requis!")
			.min(6, "Doit avoir au moins 6 charactères!")
			.max(40, "Doit avoir 40 charactères au maximum!"),
		firstname: yup
			.string()
			.required("Le prénom est requis!"),
		lastname: yup
			.string()
			.required("Le nom est requis!"),
		importer: yup
			.bool(),
		});

		return {
			successful: false,
			loading: false,
			message: "",
			schema,
			table:{
				isLoading: false,
				isReSearch: false,
				columns: [
					{
						label: "Nom",
						field: "lastname",
						width: "25%",
					},
					{
						label: "Prénom",
						field: "firstname",
						width: "25%",
					},
					{
						label: "Email",
						field: "email",
						width: "30%",
					},
					{
						label: "Peut importer ?",
						field: "importer",
						width: "20%",
					display: function (row) {
						return (
							row.importer ? 'Oui': 'Non'
						);
					},
					},
				],
				rows: [
					
				],
				totalRecordCount: 0,
				sortable: {
				order: "id",
				sort: "asc",
				},
				messages: {
				pagingInfo: "Affichage de {0}-{1} sur {2}",
				pageSizeChangeLabel: "Row count:",
				gotoPageLabel: "Aller à la page:",
				noDataAvailable: "Aucune donnée",
				},
			},
		};
	},
	computed: {
		utilisateurs() {
			return this.$store.state.users.users;
		},
		loggedIn() {
			return this.$store.state.auth.status.loggedIn;
		},
  },
  mounted() {
		console.log(this.utilisateurs)
    this.$store.dispatch('users/users').then(
		()=> {
			this.utilisateurs['hydra:member'].forEach(element => {
				this.table.rows.push(element)
			})
		}
	).catch(error=>{
		if (error.response.status === 401) {
				localStorage.removeItem('user');
				this.$store.dispatch('auth/logout')
				this.$router.push("/")
			}
	})
  },
  methods: {
    handleAddUser(user) {
		this.message = "";
		this.successful = false;
		this.loading = true;
		user.importer = user.importer == "true" ? true: false

		this.$store.dispatch("users/addUser", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
			if (error.response.status === 401) {
				localStorage.removeItem('user');
				this.$store.dispatch('auth/logout')
				this.$router.push("/")
			}
        }
      );
    },
  },
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
