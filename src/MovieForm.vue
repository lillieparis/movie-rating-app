<script setup>

import {defineEmits,useTemplateRef,onMounted} from "vue";

const input = useTemplateRef('my-input')

onMounted(() =>{
  input.value.focus()
});

    defineProps({ 
        title:{
            type: String,
            default: null
        },
        popupOpen: {
            type:Boolean,
            required:true
        },
        newMovie: {
            type: Object,
            required: true
        },
        currentIndex: {
            type: Number,
            required: true
        }
        
    });

    
    const emit = defineEmits(['closePopup','submitPopup', 'changeTitle'])
    

    const closePopup =()=>{
        emit('closePopup')
    }

    // as long as all fields are filled out, the new movie is saved and the popup is closed
    const submitPopup=()=>{ 
        emit('submitPopup')
    }

    

</script>

<template>

<!-- popup screen to add new movie -->
<div class="popup-screen"> 

  <div v-if="popupOpen" class="add-new-movie-popup" >
    <!-- title -->
    <h1>{{title}}</h1>
    
    <p>Name:</p>
    <input ref="my-input" v-model.trim="newMovie.name">
    <p>Description:</p>
    <input v-model.trim="newMovie.description">
    <p>Image:</p>
    <input v-model.trim="newMovie.image">
    <p>Genre:</p>
    <select class="selector" v-model="newMovie.genres" multiple>
      <option disabled value="">Select your movie's genre</option>
      <option value="Crime">Crime</option>
      <option value="Comedy">Comedy</option>
      <option value="Drama">Drama</option>
      <option value="Action">Action</option>
      <option value="Horror">Horror</option>
      <option value="Thriller">Thriller</option>
      <option value="Romance">Romance</option>
    </select>
    <p> </p>
    <div class="checkbox-container">
    <input type="checkbox" id="checkbox" v-model="newMovie.inTheaters" />
    <label class="in-theatres-label"> in theaters </label>
    </div>
    <p> </p>
   
    <button @click="submitPopup()" class="submit-button">Submit</button>
    <button @click="closePopup" class="close-button">Cancel</button>
    
  </div>
</div>
</template>


<style>
.close-button{
  border: 2px solid #ffffff;
  color: aliceblue;

  padding: 7px 10px;
  cursor: pointer;
}

.submit-button{
  border: 2px solid #ffffff;
  color: aliceblue;
  padding: 7px 10px;
  cursor: pointer;
}
.add-new-movie-popup h1{
  font-weight: 900;
  padding: 5px;
  align-items: center;
}
.add-new-movie-popup{
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 20px;
  width: 40%; 
  left: 30%;
  top: 30%;
  position: relative;
  background-color: #dbd9e7;
  z-index: 5;
}


 
</style>
