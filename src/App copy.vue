<script setup>
import { items } from "/Users/lillieparis/Desktop/create-a-movie-rating-app-1/src/movies.json";
import { reactive ,ref } from "vue";
import { PencilIcon, StarIcon, TrashIcon } from "@heroicons/vue/24/solid";


 

const movies = reactive({items})

const popupOpen = reactive({value: false});

const isNewMovie = reactive({value : true});

const currentIndex = ref(0)

const newMovie = reactive({
  name: "",
  description: "",
  image: "",
  rating: null,
  genres: "[]",
})

const rated = (movie,n) => {
  movie.rating = n;
};

const openPopup = () => {
  popupOpen.value = true
};

const closePopup=()=>{
  popupOpen.value = false

  newMovie.name = ""
  newMovie.description = ""
  newMovie.genres = []
  newMovie.image = ""
  newMovie.inTheaters = false

}

const editPopup = (i) => {
  popupOpen.value = true
  isNewMovie.value = false
  currentIndex.value = i

  newMovie.name = movies.items[i].name
  newMovie.description = movies.items[i].description
  newMovie.genres = movies.items[i].genres
  newMovie.image = movies.items[i].image
  newMovie.inTheaters = movies.items[i].inTheaters

}

const deleteMovie = (i) => {
  movies.items.splice(i,1);
}




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


// as long as all fields are filled out the new movie is saved and the popup is closed
const submitPopup=()=>{
  if( !newMovie.name || !newMovie.description || !newMovie.image || newMovie.genres.length === 0){
    alert("Please fill out all the input boxes and select a genre.")
  };
  
  popupOpen.value = false
  
  
  if(isNewMovie.value === true){
    movies.items.push({
    id: movies.items.length + 1,
    name: newMovie.name,
    description: newMovie.description,
    image: newMovie.image,
    rating: null,
    genres: newMovie.genres,
    inTheaters: newMovie.inTheaters
  })}
  else{
    movies.items[currentIndex.value].name = newMovie.name;
    movies.items[currentIndex.value].description = newMovie.description;
    movies.items[currentIndex.value].image = newMovie.image;
    movies.items[currentIndex.value].genres = newMovie.genres;
    movies.items[currentIndex.value].inTheaters = newMovie.inTheaters;
  }
  
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
  }
}
  
</script>

<template>
  <!-- total number of movies and the average rating -->
  <div class="header"> 
    <h1>Total Movies: {{ movies.items.length }} </h1>
    <h2>Average Rating:  {{averageRatingFunc()}}</h2>
  </div>
  

  <!-- displays movie list with title, image, genres, description -->
  <div class="all-movies">
    <div class="movie-list" v-for="movie in movies.items" :key="movie.id">
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
          @click="rated(movie, n)">
            <StarIcon class="size-5 text-yellow-500"></StarIcon>
        </button> 
      </span>
   
    <span v-for="n in 5 - movie.rating" :key="n">
      <button @click="rated(movie.id, n +movie.rating)">
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
  


</div>
</div>

<!-- popup screen to add new movie -->
<div class="popup-screen"> 
  <button  @click="openPopup()"  class="add-movie-button"> Add Movie </button>
  <div class="add-new-movie-popup" v-if="popupOpen.value">
    <h1>Movie Information</h1>
    <p>Name:</p>
    <input v-model.trim="newMovie.name">
    <p>Description:</p>
    <input v-model.trim="newMovie.description">
    <p>Image:</p>
    <input v-model.trim="newMovie.image">
    <p>Genre:</p>
    <select class="selector" v-model="newMovie.genres" multiple>
      <option disabled value="">Select your movie's genre</option>
      <option>Crime</option>
      <option>Comedy</option>
      <option>Drama</option>
      <option>Action</option>
      <option>Horror</option>
      <option>Thriller</option>
      <option>Romance</option>
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

<!-- reset ratings -->
<div class="reset-ratings">
  <button @click="resetRatingsFunc()" class="reset-ratings-button"> Reset Ratings </button>
</div>

</template>

<style scoped>

.size-7.text-icon{
  top: 10px;
  left: 8px;
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
  position: fixed;
  background-color: #dbd9e7;

  
  
}
.add-movie-button{
  border: 2px solid #ffffff;
  color: aliceblue;
  border-radius: 2px;
  padding:  10px;
  position: fixed;
  top: 20px;
  right: 20px;
  cursor: pointer;
  
}


.all-movies{
  display: grid;
  grid-template-columns: repeat(3, 1fr) ;
  gap: 50px;
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
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

