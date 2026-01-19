<script setup>

import { PencilIcon, StarIcon, TrashIcon, EyeIcon} from "@heroicons/vue/24/solid";
import { defineEmits} from "vue";




defineProps({
    movies: {
        type: Array,
        required: true
    },
    popupOpen: {
        type: Boolean,
        required: true
    },
    isNewMovie: {
        type: Boolean,
        required: true
    },
    currentIndex: {
        type: Number,
        required: true
    },
    newMovie: {
        type: Object,
        required: true
     }
  
});

const emit = defineEmits(['changeValuesFromEdit', 'deleteMovie', 'updateMovieRating', 'viewMovie'])


//edit button triggers editPopup
const editPopup = (i) => {
    emit('changeValuesFromEdit', i)
    }

//deleteMovie button deletes the movie
const deleteMovie = (i) => {

  emit('deleteMovie', i)
}

const viewMovie = (i) => {
  emit('viewMovie', i)
}

//changes the movie rating 
const rated = (i,n) => {
  
  emit('updateMovieRating', i,n)
};

//returns true if the movie has not been rated
// const notRated = (i) => {
//     if(movies[i].rating < 1 || movies[i].rating ==null){
//         return true;
//     }else{
//         return false;
//     }
// }
</script>

<template>
<!-- displays movie list with title, image, genres, description -->
  <div class="all-movies">
    <div class="movie-list" v-for="movie in movies" :key="movie.id">
      <h1> {{ movie.name }} </h1>
      <div class="movie-star-wrapped">
        <img :src="movie.image" class="movie-poster">
          <div class="star-on-poster">
            <span v-if="movie.rating !== null">
              <div class="star-container">
                <StarIcon class="size-20 text-yellow-500"></StarIcon>
                  <span class="rating-on-star">{{ movie.rating }}</span>
              </div>
            </span>
            <span v-else>
              <div class="star-container">
                <StarIcon class="size-20 text-gray-500"></StarIcon>
                  <span class="icon-text"> - </span>
              </div>
            </span> 
          </div>
      </div>
      <h2> {{movie.description}}</h2> 
      <h3> Genre(s):</h3>
      <div v-for="genre in movie.genres" >
        <li> {{genre}} </li>
      </div>
  
    

 

    <!-- interactive rating star buttons  -->
    <div class="rating-stars">
    <span class="rating-text"> Rating: ({{ movie.rating }}/5)</span>      
      <span v-for="n in  movie.rating" :key="n">
        <button :disabled="n === movie.rating"
          @click="rated(movie.id -1, n)">
            <StarIcon class="size-5 text-yellow-500"></StarIcon>
        </button> 
      </span>
   
    <span v-for="n in 5 - movie.rating" :key="n">
      <button @click="rated(movie.id -1, n +movie.rating)">
        <StarIcon class="size-5 text-gray-500"></StarIcon>
      </button>
    </span>
  </div>

  <!-- edit button -->
  <div class="edit-container">
    <button @click="editPopup(movie.id -1)">
      <PencilIcon class="size-7"></PencilIcon>
    </button>
  </div>

  <!-- delete button -->
  <div class="delete-container">
    <button @click="deleteMovie(movie.id - 1)">
      <TrashIcon class="size-7 text-icon"></TrashIcon>
    </button>
  </div>

  <!-- view button -->
  <div class="view-container">
    <router-link :to="{name: 'MovieDetail', params : {id : movie.id}}">
        <button @click="viewMovie(movie.id - 1)">
          <EyeIcon class="size-7 eye-icon"></EyeIcon>
        </button> 
      </router-link>      
  </div>
  
</div>
</div>

</template>

<style>
.size-7.text-icon{
  top: 8px;
  left: 10px;
  text-align: center;
  position: absolute;
}

.delete-container{
  border:  2px solid #ffffff;
  top: -38px;
  left: 60px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  align-items: center;
}

.view-container{
  border:  2px solid #ffffff;
  top: -87px;
  left: 120px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  align-items: center;
}

.size-7.eye-icon{
  top: 8px;
  left: 9px;
  text-align: center;
  position: absolute;
}

.edit-container {
  border:  2px solid #ffffff;
  top: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  align-items: center;  
}

.size-7{
  top: 10px;
  left: 8px;
  text-align: center;
  position: absolute;

}

.all-movies{
  display: grid;
  grid-template-columns: repeat(3, 1fr) ;
  gap: 50px;
  width: 100%;
  padding-left: 30px;
  padding-right: 30px
}

.star-on-poster{
  position: absolute;
  top: 35px;
  right: 5px;
}
.movie-poster{
  display: block;
  position: relative;
  width: 100%;
} 


.icon-text{
  position: absolute;
  color: black;
  font-size: x-large;
  text-align: center;
  line-height: 1;
}

.star-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100px; 
  height: 100px; 
}


.size-20.text-yellow-50{
  display: flex;
  align-items: center;
  position: absolute;
}


.rating-on-star{
  position: absolute;
  color: black;
  font-size: x-large;
  text-align: center;
  line-height: 1;
  
}

.rating-text{
  padding-right: 5px;
}

.rating-stars{
  align-items: center;
  align-content: center;
}
.movie-list{
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 20px;
  width: 100%; 
  position: relative;
  color: aliceblue;
  border: 2px solid aliceblue;
  }
.movie-list h1{
  text-align: center;
  padding-bottom: 5px;
  font-size: x-large; 
  font:bolder;
}

.movie-list h2{
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
}

</style>