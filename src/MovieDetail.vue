
<script setup>


import {useRoute} from 'vue-router'
import {computed} from 'vue'
import { StarIcon} from "@heroicons/vue/24/solid";

const route = useRoute()

const storedMovies = JSON.parse(localStorage.getItem("movies"));

const movie = computed(() =>{
    return storedMovies.find(m => m.id === parseInt(route.params.id))
})
    
</script>

<template>

        <div class="movie-detail-wrapper" v-if="movie !== null">
            <h1 class="movie-detail-name">{{ movie.name }}</h1>
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
      <p class="movie-detail-description"> {{ movie.description }}</p>
      <h1 class="movie-detail-h1">Genre(s):</h1>
      <li v-for="(genre,index) in movie.genres" :key="index">
                {{ genre }}
      </li>  
      
        </div>

</template>

<style>
.movie-detail-h1{
  font-weight: 700;
}

.movie-detail-wrapper{
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 20px;
  left: 35%;
  width: 30%; 
  top: 10px;
  position: relative;
  color: aliceblue;
  border: 2px solid aliceblue;
}

.movie-detail-name{
    font-weight:900;
    
}

.movie-detail-image{
    width: 100%;
}
</style>