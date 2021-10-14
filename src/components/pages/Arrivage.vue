<template>
  <div class="card h-100">
    <div class="row row-xs wd-xl-80p" v-if="arrivage " >
      <div class="col-sm-6 col-md-3 mg-t-10 mg-md-t-0"  v-if="utilisateur.roles.includes('ROLE_IMPORTER')"><button class="btn btn-success btn-with-icon btn-block" data-bs-toggle="modal" data-bs-target="#uploadModal"><i class="fas fa-plus-circle"></i> Uploader un fichier</button></div>
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
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",

      fileInfos: [],
      table:{
        isLoading: false,
        isReSearch: false,
        columns: [
          
			{
				label: "Immatriculation",
				field: "immatriculation",
				width: "10%",
				
				display: function (row) {
					return (
						row.immatriculation 
					);
				},
			},
			{
				label: "Date d'entrée en arrivage",
				field: "date_entree_arrivage",
				width: "15%",
					
			},
			{
				label: "Marque",
				field: "marque",
				width: "15%",
				
				display: function (row) {
					return (
						row.marque.marque_name 
					);
				},
			},
			{
				label: "Modele",
				field: "modele",
				width: "15%",
				
				display: function (row) {
					return (
						row.modele.modele_name 
					);
				},
			},
			{
				label: "Version",
				field: "version",
				width: "15%",
				
			},
			{
				label: "Fournisseur",
				field: "fournisseur",
				width: "15%",
            
				display: function (row) {
					return (
						row.fournisseur.frs_name 
					);
				},
			},
			{
				label: "Energie",
				field: "energie",
				width: "10%",
				
				display: function (row) {
					return (
						row.energie.energie_name 
					);
				},
			},
			{
				label: "Provenance",
				field: "provenance",
				width: "15%",
            
				display: function (row) {
					return (
						row.provenance.provenance_name 
					);
				},
			},
			{
				label: "Parc",
				field: "parc",
				width: "15%",
				
				display: function (row) {
				return (
					row.parc.parc_name 
				);
				},
			},
        ],
        rows: [
            
        ],
        totalRecordCount: 0,
        
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
      return this.$store.state.arrivage.arrivage;
    },
	uploading(){
		return this.$store.state.arrivage.uploading;
    },
	uploaded(){
		return this.$store.state.arrivage.uploaded;
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
			this.retrieveArrivage();
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
		this.$store.dispatch("arrivage/load").then(()=>{
			this.arrivage['hydra:member'].forEach(element => {
				this.table.rows.push(element)
			})
		})
    },
  },
  mounted() {
    this.retrieveArrivage();
  },
  watch:{
    uploaded: function (uploaded){
      console.log(uploaded);
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
