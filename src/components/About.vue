<template>
<div class="people-wrapper">
<div class="search-bar-wrapper">
      <input
        class="search-bar"
        type="text"
        v-model="filterText"
        placeholder="Search for People.."
      />
      <div class="add-people-button-wrapper">
       <svg @click="onAddIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi-bi-plus-square" viewBox="0 0 16 16">
      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    </svg>
      </div>
    <div class="all-people">

      <div v-for="people in filteredPeople"
      :key="people.id" class="single-people-card">
        <h1 class="people-name">{{people.name}} </h1>
        <h1 class="people-surname">{{people.surname}}</h1>
        <br>
        <img class="people-image" :src="people.src"/>
        <h5 @click="showInfo(people)" class="people-show-desc">Click here for more info!</h5>
        <div class="action-buttons">
          <svg @click="onUpdateIcon(people)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi-bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>
          <svg @click="onDeleteIcon(people)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi-bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </div>
      </div>
    </div>
    <Modal v-model="showInfoModal" modalClass="modal-wrapper-info">
      <h4><i>{{itemForInfo.name}} </i>, {{itemForInfo.surname}}</h4>&nbsp;
      <hr>
      <br>
      <p><i>{{itemForInfo.desc}}</i></p>
      <hr>
    </Modal>
    <Modal v-model="showDeleteModal" modalClass="modal-wrapper-delete">
      <h5>Removing-<i>{{itemForDelete.name}}?</i></h5>
      <div class="delete-action-buttons">
        <button class="btn btn-primary" @click="confirmDelete(itemForDelete.id)">Confirm</button>
        <button class="btn btn-danger" @click="closeDeleteModal">Cancel</button>
      </div>
    </Modal>

    <!-- Tamara ADD -->

    <!-- UPDATE EXISTING people DIALOG -->

    <Modal v-model="showUpdateModal" modalClass="modal-wrapper-update">
      <h3 class="add__modal-title">Update reader</h3>
      <hr><div class="modal-content">
        <img :src="itemForUpdate.src" class="uploading-image" />
      <br>
        <h3>Name</h3>
        <input
          class="modal__people__name-input"
          type="text"
          :maxlength="35"
          v-model.lazy="itemForUpdate.name"
        />
        <br>
        <h3>Surname</h3>

        <input
          class="modal__people__name-input"
          type="text"
          :maxlength="35"
          v-model.lazy="itemForUpdate.surname"
        />
        <br>
        <h3>Add Description</h3>

        <textarea
          placeholder="Enter people Description.."
          class="modal__people__desc-textarea"
          name="desc"
          id="desc"
          :maxlength="1350"
          v-model.lazy="itemForUpdate.desc">
        </textarea>
        <br>
         </div>


      <div class="delete-action-buttons">
        <button class="btn btn-primary"
        @click="confirmUpdate(itemForUpdate)">Confirm</button>
        <button class="btn btn-danger" @click="closeUpdateModal">Cancel</button>
      </div>

    </Modal>

     <!-- ADD NEW people DIALOG -->

    <Modal v-model="showAddModal" modalClass="modal-wrapper">
      <h3 class="add__modal-title">Add new people</h3>
      <hr><div class="modal-content">
        <h3>Name</h3>

        <input
          placeholder="Enter name.."
          class="modal__people__name-input"
          type="text"
          :maxlength="35"
          v-model="peopleAdded.name" />
        <br>
        <h3>Add Image</h3>

        <img style="border: none" :src="peopleAdded.src" class="uploading-image" />

        <button
          class="upload-image__btn"
          @click="onPickFile()">
            Upload Image
        </button>
        <input
          ref="fileInput"
          class="add__modal-image-btn"
          style="display: none"
          type="file"
          accept="image/*"
          @change="onFilePicked"
        />
        <br>
        <h3>Surname</h3>

        <input
          placeholder="Enter surname.."
          class="modal__people__name-input"
          type="text"
          :maxlength="35"
          v-model="peopleAdded.surname"
        />
        <br>
        <h3>Add  Description</h3>

        <textarea
          placeholder="Enter Description.."
          class="modal__people__desc-textarea"
          name="desc"
          id="desc"
          :maxlength="650"
          v-model="peopleAdded.desc " >
        </textarea>
        <br>
       </div>
      <div class="delete-action-buttons">
        <button class="btn btn-primary"
        @click="confirmAdd(peopleAdded)">Confirm</button>
        <button class="btn btn-danger" @click="closeAddModal">Cancel</button>
      </div>

    </Modal>

  </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      filterText: '',
      previewImage: null,
      itemForDelete: {},
      itemForInfo: {},
      itemForUpdate: {},
      showDeleteModal: false,
      showInfoModal: false,
      showUpdateModal:false,
      showAddModal: false,
      copyOfItemForUpdate: {},
      copyOfItemForAdd: {},
      peopleAdded:{
       name: '',
       src: '',
       surname: '',
       desc: ''
      }
    }
  },
  computed: {
    ...mapState(["peopleCollection"]),
    ...mapActions(["getPeopleCollection"]),
    filteredPeople() {
    return this.peopleCollection.filter((item)=>{
      let name = item.name.toLowerCase();
      return name.match(this.filterText);
    })
    }
  },
  // LIFE-CYCLE hooks
  mounted() {
    this.$store.dispatch("getPeopleCollection");
  },
  methods: {
    onFilePicked(event){
      const files = event.target.files;
      let fileName = files[0].name;
      if(fileName.lastIndexOf('.')<= 0 ){
      alert('Please provide image!');
      }
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
      this.peopleAdded.src = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.previewImage = files[0];
    },
    onPickFile(){
      this.$refs.fileInput.click();
    },
    onDeleteIcon(people) {
      this.itemForDelete = people;
      this.showDeleteModal = true;
    },
    onUpdateIcon(people) {
      this.itemForUpdate = people;
      this.showUpdateModal = true;

      this.copyOfItemForUpdate = Object.assign({}, people);
    },
    confirmDelete(id) {
      this.$store.dispatch("deletePeople", id);
      this.closeDeleteModal();
      this.$store.dispatch("getPeopleCollection");
    },
    async confirmUpdate(itemForUpdate) {
      await this.$store.dispatch("updatePeople", this.itemForUpdate);
      this.showUpdateModal = false;

    },
    async confirmAdd(){
      if(!this.previewImage){
         return
      }
      const people = {
        name: this.peopleAdded.name,
        src: this.previewImage,
        surname: this.peopleAdded.surname,
        desc: this.peopleAdded.desc,

      }
      await this.$store.dispatch('createPeople' , people );
      this.$store.dispatch('getPeopleCollection');
      this.showAddModal = false;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
    },
    closeUpdateModal() {
      Object.assign(this.itemForUpdate, this.copyOfItemForUpdate);
      this.showUpdateModal = false;
    },
    onAddIcon() {
    this.showAddModal=true;
    },
    closeAddModal() {
      this.showAddModal= false;
    },
    showInfo(people) {
      this.itemForInfo = people;
      this.showInfoModal = true;
    }
  }

}
</script>

<style scoped>
@import '../scss/about.css';
</style>
