<script setup>
import { items } from "/Users/lillieparis/Desktop/create-a-movie-rating-app-1/src/movies.json";
import { reactive ,ref } from "vue";
import { defineAsyncComponent } from "vue";
import MovieItem from "./MovieItem.vue"
import MovieForm from "./MovieForm.vue"
import AppModal from "./AppModal.vue"
 
const movies = reactive({items})
const storedMovies = localStorage.getItem("movies");
console.log(storedMovies)

if(storedMovies){
  movies.items = JSON.parse(storedMovies)
}


const popupOpen = reactive({value: false});

const isNewMovie = reactive({value : true});

const currentIndex = ref(0)

const newMovie = reactive({
  name: "",
  description: "",
  image: "",
  rating: null,
  genres: [],
})

const title = reactive({text: "Movie Information"})

const AsyncAppModal = defineAsyncComponent(() =>
  import('./AppModal.vue')
  );

const AsyncMovieForm = defineAsyncComponent(() =>
  import('./MovieForm.vue')
  );


// calculates the average rating
const averageRatingFunc = () => {
  if(movies.items.length ===  0){
    return 0;
  }
  else{
      let totalRatingsSum = 0;
      for(let i = 0; i < movies.items.length; i++) {
        if(movies.items[i].rating !== null){
            totalRatingsSum += movies.items[i].rating
        }   
      }
    return (totalRatingsSum / movies.items.length).toFixed(1) ;
    }
  }

//resets newMovie into its "empty" fields
const newMovieReset = () => {
  newMovie.name = ""
  newMovie.description = ""
  newMovie.genres = []
  newMovie.image = ""
  newMovie.inTheaters = false
}


//reset ratings
const resetRatingsFunc = () => {
  for(let i = 0; i < movies.items.length; i++) {
    movies.items[i].rating = null;

    localStorage.setItem("movies", JSON.stringify(movies.items))
  }
}

//handles edit emited from MovieItem
const handleEditValues = (i) => {
  isNewMovie.value = false
  currentIndex.value = i
  openPopup()
  
  newMovie.name = movies.items[i].name
  newMovie.description = movies.items[i].description;
  newMovie.image = movies.items[i].image;
  newMovie.genres = movies.items[i].genres;
  newMovie.inTheaters = movies.items[i].inTheaters;
}

//deletes movie emited from MovieItem
const handleDeleteMovie = (i) => {
  movies.items.splice(i,1)
  localStorage.setItem("movies",JSON.stringify(movies.items))

}

//updates movie rating emited from MovieItem
const handleUpdateRating = (i,n) => {
  movies.items[i].rating = n
  localStorage.setItem("movies",JSON.stringify(movies.items))
}


//on submit 
const handleSubmitPopup = () => {
  //make sure all fields are filled out and a genre has been selected
  if( !newMovie.name || !newMovie.description || !newMovie.image || newMovie.genres.length === 0){
        alert("Please fill out all the input boxes and select a genre.")
    }
  else{
     //close popup   
  popupOpen.value = false
  //if it is a new movie add it to the array
  if(isNewMovie.value === true){
    movies.items.push({
    id: movies.items.length + 1,
    name: newMovie.name,
    description: newMovie.description,
    image: newMovie.image,
    rating: null,
    genres: newMovie.genres,
    inTheaters: newMovie.inTheaters
    }) 
  
  } 
  //if its a movie being edited then edit the given movie
  else{
    movies.items[currentIndex.value].name = newMovie.name;
    movies.items[currentIndex.value].description = newMovie.description;
    movies.items[currentIndex.value].image = newMovie.image;
    movies.items[currentIndex.value].genres = newMovie.genres;
    movies.items[currentIndex.value].inTheaters = newMovie.inTheaters;
  }

  localStorage.setItem("movies",JSON.stringify(movies.items))
  //reset the newMovie
  newMovieReset()
}}


//on addMovie or on edit, generate popup
const openPopup = () => {
  console.log(isNewMovie.value)
    popupOpen.value = true
    if(isNewMovie.value === true){
      title.text='Add a New Movie'
    }else{
      title.text= 'Edit ' + '"' + movies.items[currentIndex.value].name + '"';

    }
     
    };

//on cancel close popup
const handleClosePopup = () => {
  popupOpen.value=false
  isNewMovie.value = true

  //reset new Movie fields
  newMovieReset()
}  
</script>


<template>
  <!-- total number of movies and the average rating -->
  <div class="header"> 
    <h1>Total Movies: {{ movies.items.length }} </h1>
    <h2>Average Rating:  {{averageRatingFunc()}}</h2>
  </div>




<!-- movie items -->
<div id="app">
  <!-- pass items to the child template MovieItem -->
  <MovieItem 
  :movies="movies.items" 
  :popup-open="popupOpen.value"
  :is-new-movie="isNewMovie.value"
  :current-index="currentIndex"
  :new-movie="newMovie"
  @changeValuesFromEdit="handleEditValues"
  @deleteMovie="handleDeleteMovie"
  @updateMovieRating="handleUpdateRating"
  />

  <AppModal
  :title="title.text"
  :popup-open="popupOpen.value"
  @close="handleClosePopup"
  >
  <!-- pass items to the child template MovieForm -->
  <MovieForm
  :title="title.text"
  :popup-open="popupOpen.value"
  :is-new-movie="isNewMovie.value"
  :current-index="currentIndex"
  :new-movie="newMovie"
  @closePopup="handleClosePopup"
  @submitPopup="handleSubmitPopup"
  />
  </AppModal>
  
</div>


<!-- reset ratings -->
<div class="reset-ratings">
  <button @click="resetRatingsFunc()" class="reset-ratings-button"> Reset Ratings </button>
</div>

<button  @click="openPopup()" class="add-movie-button" > Add Movie </button>

</template>

<style scoped>
.reset-ratings-button{
  border: 2px solid #ffffff;
  color: aliceblue;
  border-radius: 2px;
  padding:  10px;
  position: fixed;
  top: 20px;
  right: 140px;
  cursor: pointer;
}
.header{
  color: aliceblue;
  padding-left: 20px;
  padding-bottom: 30px;
  padding-top: 20px;
}




</style>
