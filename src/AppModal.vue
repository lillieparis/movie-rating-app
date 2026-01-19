<script setup>
import { defineEmits } from 'vue';
import {XMarkIcon} from "@heroicons/vue/24/solid";
import MovieForm from './MovieForm.vue';

defineProps({
    title:{
    type: String,
    default: null
},
    popupOpen:{
        type: Boolean,
        required: true
    }
})

const emit = defineEmits(['close'])

</script>


<template>
<Transition name="fade">
    <div v-if="popupOpen === true" class="app-modal-wrapper">
        <div class="app-modal-background"> </div>

        <Transition name="slide">
        <div class="app-modal-content">
    <!-- x button -->
        <button class="x-button" @click="$emit('close')">
            <XMarkIcon class="size-7 x-mark"></XMarkIcon>
        </button>
        <!-- body content -->
        <slot class="body-content"></slot>
        </div>
        </Transition>
    </div>
</Transition>
</template>

<style>
.slide-enter-active,
.slide-leave-active{
    transition: all 0.3s ease-out;
}

.slide-enter, .slide-leave-to {
  transform: translateY(-50px); 
  opacity: 0;
}


.fade-enter-active,
.fade-leave-active{
    transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


.app-modal-content{
    position: relative;
    top: 25%;
    left: 0;
    z-index: 1;
}

.app-modal-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(4px); 
    z-index: -1; 
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
.app-modal-wrapper{
    position: fixed;
    background-color: blur(8px);
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    

}

.body-content{
    position: relative;
    left: 0;
    top: 25%;
}



.x-button{
    position: absolute;
    top: 3%; /* Align close button to top-right */
    left: 66%;
    z-index: 10;
}

.size-7.x-mark{
    position: absolute;
    color:black;
    text-align: center;
    z-index: 10;
}

</style>