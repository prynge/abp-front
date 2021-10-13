<template>
	<div class="card h-100">
		<div class="m-3 row">
			<div class="col text-start">
				<label class="form-label">Choisir un mois</label>
				<select class="form-select" v-model="selectedMonth">
					<option disabled selected>Choisir un mois</option>
					<option v-for="month,key in months" :key="key" :value="key">{{month}}</option>
				</select>
			</div>
			<div class="col text-start">
				<label class="form-label">Choisir une année</label>
				<select class="form-select" v-model="selectedYear">
					<option disabled selected>Choisir une année</option>
					<option v-for="an in ans" :key="an" :value="an">{{an}}</option>
				</select>
			</div>
		</div>
		<div class="row row-xs wd-xl-80p" v-if="arrivage " >
			<div class="col-sm-6 col-md-3 mg-t-10 mg-md-t-0" v-if="utilisateur.roles.includes('ROLE_IMPORTER')"><button class="btn btn-success btn-with-icon btn-block" data-bs-toggle="modal" data-bs-target="#uploadModal"><i class="fas fa-plus-circle"></i> Uploader un fichier</button></div>
		</div><!-- row -->
    
		<div v-if="!arrivage" class="progress">
			<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
		</div>
		<vue-table-lite v-if="arrivage"
		:has-checkbox="false"
		:is-loading="table.isLoading" 
		:is-re-search="table.isReSearch" 
		:columns="table.columns" 
		:rows="table.rows" 
		:total="arrivage['hydra:totalItems']" 
		:sortable="table.sortable" 
		:messages="table.messages" 
		@do-search="doSearch" 
		@is-finished="tableLoadingFinish" 
		@return-checked-row="updateCheckedRows" 
		/>

    <!-- Modal -->
    <div class="modal fade" id="uploadModal" tabindex="-1" aria-labelledby="uploadModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="uploadModalLabel">Ajouter un nouveau véhicule</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-start">
            <div v-if="currentFile" class="progress">
              <div
                class="progress-bar progress-bar-info progress-bar-striped"
                role="progressbar"
                :aria-valuenow="progress"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="{ width: progress + '%' }"
              >
                {{ progress }}%
              </div>
            </div>

            <label class="btn btn-default">
              <input type="file" ref="file" @change="selectFile" />
            </label>

            <div class="alert alert-light" role="alert">{{ message }}</div>
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" :disabled="!selectedFiles" @click="upload">Charger</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTableLite from 'vue3-table-lite';
import UploadService from "../../services/uploadService";


export default {
  name: ' Arrivage',
  components: {
    VueTableLite
  },
  data () {
    return {
		selectedYear: new Date().getFullYear(),
		selectedMonth: new Date().getMonth(),
		ans:[],
		months:{
			0:'Janvier',
			1:'Février',
			2:'Mars',
			3:'Avril',
			4:'Mai',
			5:'Juin',
			6:'Juillet',
			7:'Août',
			8:'Septembre',
			9:'Octobre',
			10:'Novembre',
			11:'Décembre'
		},
		selectedFiles: undefined,
		currentFile: undefined,
		progress: 0,
		message: "",

		table:{
			isLoading: false,
			isReSearch: false,
			columns: [
				{
					label: "Immatriculation",
					field: "immatriculation",
					width: "10%",
				},
				{
					label: "Marque",
					field: "marque",
					width: "15%",
				},
				{
					label: "Modele",
					field: "modele",
					width: "15%",
				},
				{
					label: "Version",
					field: "version",
					width: "15%",
				},
				{
					label: "Date d'entrée en arrivage",
					field: "date_entree_arrivage",
					width: "15%",
					display: function (row) {
						return (
							row.date_entree_arrivage.date
						);
					},
				},
				{
					label: "Fournisseur",
					field: "fournisseur",
					width: "15%",
				},
				{
					label: "Energie",
					field: "energie",
					width: "10%",
				},
				{
					label: "Provenance",
					field: "provenance",
					width: "15%",
				},
				{
					label: "Parc",
					field: "parc",
					width: "15%",
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
    utilisateur() {
      return this.$store.state.auth.userProfile;
    },
    arrivage() {
      return this.$store.state.arrivage.monthlyArrivage;
    }
  },
	watch:{
		selectedYear: function () {
			this.retrieveArrivage();
		},
		selectedMonth: function () {
			this.retrieveArrivage();
		}
	},
  methods: {
    selectFile() {
      this.selectedFiles = this.$refs.file.files;
    },
    upload() {
      console.log('uploading')
      this.progress = 0;

      this.currentFile = this.selectedFiles.item(0);
      UploadService.upload(this.currentFile, event => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then(() => {
          this.retrieveArrivage()
          
        })
        .catch(() => {
          this.progress = 0;
          this.message = "Could not upload the file!";
          this.currentFile = undefined;
        });

      this.selectedFiles = undefined;
    },
    doSearch(){
      console.log("search")
    },
    tableLoadingFinish(){
      console.log("finished")
    },
    updateCheckedRows(){
      console.log("checkedrow")

    },

    retrieveArrivage() {
		console.log("rrr");
		this.table.rows = []
		this.$store.dispatch("arrivage/loadMonthly",{m:this.selectedMonth,y:this.selectedYear}).then(()=>{
			this.arrivage['hydra:member'].forEach(element => {
				this.table.rows.push(element)
			})
		})
    },
	range(start, end) {
		return Array.apply(0, Array(end - 1))
		.map((element, index) => index + start);
	}
  },
  mounted() {
    this.retrieveArrivage();
	this.ans = this.range(new Date().getFullYear()-5, 7)
	console.log(this.selectedMonth, this.selectedYear)
 
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
