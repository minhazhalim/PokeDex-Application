let buttons = document.querySelectorAll('button');
let buttonSearch = document.getElementById('buttonSearch');
let buttonRight = document.getElementById('buttonRight');
let buttonLeft = document.getElementById('buttonLeft');
let buttonUp = document.getElementById('buttonUp');
let buttonSwitch = document.getElementById('buttonSwitch');
let screen = document.getElementById('poke-image');
let audio = document.getElementById('audio');
let pokeName = document.getElementById('poke-name');
let pokeInput = document.getElementById('poke-input');
let pokeID = document.getElementById('poke-id');
let infoType = document.getElementById('info-type');
let infoHP = document.getElementById('info-hp');
let infoSPEED = document.getElementById('info-speed');
let infoATTACK = document.getElementById('info-attack');
let infoDEFENSE = document.getElementById('info-defense');
let index = 0;
let evolutionPhase = 0;
function init(){
     index = 0;
     pokeName.innerText = 'Who am i?';
     pokeID.innerText = '00';
     infoType.innerText = '';
     infoHP.innerText = '';
     infoSPEED.innerText = '';
     infoATTACK.innerText = '';
     infoDEFENSE.innerText = '';
     screen.src = './images/bras.png';
     pokeInput.value = '';
     buttonLeft.style.color = 'grey';
     buttonUp.style.color = 'grey';
     buttonDown.style.color = 'grey';
     buttonUp.disabled = true;
     buttonDown.disabled = true;
     buttonLeft.disabled = true;
}
init();
buttonSwitch.addEventListener('click',init);
function displayPokemonInfo(pokemonInfo){
     pokeName.innerText = pokemonInfo.name.toUpperCase();
     screen.src = pokemonInfo.sprites.front_default;
     pokeID.innerText = pokemonInfo.id < 10 ? `0${pokemonInfo.id}` : `${pokemonInfo.id}`;
     infoType.innerText = `Type: ${pokemonInfo.types[0].type.name}`;
     infoHP.innerText = `Health: ${pokemonInfo.stats[5].stat.name,pokemonInfo.stats[5].base_stat}`;
     infoSPEED.innerText = `Speed: ${pokemonInfo.stats[0].stat.name,pokemonInfo.stats[0].base_stat}`;
     infoATTACK.innerText = `Attack: ${pokemonInfo.stats[3].stat.name,pokemonInfo.stats[3].base_stat}`;
     infoDEFENSE.innerText = `Defense: ${pokemonInfo.stats[4].stat.name,pokemonInfo.stats[4].base_stat}`;
}
async function searchPokemonInfo(pokemonName){
     try {
          const API = 'https://pokeapi.co/api/v2/pokemon';
          const response = await fetch(`${API}/${pokemonName}`);
          const data = await response.json();
          displayPokemonInfo(data);
     }catch(error){
          pokemonName.innerText = (error.message);
          index = parseInt(pokeID.innerText);
     }
}
async function searchPokemonEvolution(number){
     try {
          if(index <= 0) init();
          const APIEvolution = 'https://pokeapi.co/api/v2/evolution-chain';
          const responseEvolution = await fetch(`${APIEvolution}/${index}`);
          const dataEvolution = await responseEvolution.json();
          switch(number){
               case 0:
                    evolution = dataEvolution.chain.species.name;
                    break;
               case 1:
                    evolution = dataEvolution.chain.evolves_to[0].species.name;
                    break;
               case 2:
                    evolution = dataEvolution.chain.evolves_to[0].evolves_to[0].species.name;
                    break;
          }
          searchPokemonInfo(evolution);
     }catch(error){
          console.log(error,'Index < 0');
     }
}
buttonSearch.addEventListener('click',() => {
     if(pokeInput.value == ""){
          pokeName.innerText = 'Zzz..... name?';
     }else if(pokeInput.value == 'praseidimio' || pokeInput.value == 'tremotino'){
          pokeName.innerText = 'Erica BLENDER!';
          screen.src = './images/blender.jpg';
          buttonLeft.style.color = 'burlywood';
          buttonUp.style.color = 'grey';
          buttonDown.style.color = 'grey';
          buttonUp.disabled = true;
          buttonDown.disabled = true;
          buttonLeft.disabled = false;
     }else {
          pokemonName = pokeInput.value.toUpperCase();
          searchPokemonInfo(pokemonName);
          index = 0;
          buttonUp.style.color = 'grey';
          buttonDown.style.color = 'grey';
          buttonLeft.style.color = 'grey';
          buttonUp.disabled = true;
          buttonDown.disabled = true;
          buttonLeft.disabled = true;
     }
});
buttonRight.addEventListener('click',() => {
     index += 1;
     evolutionPhase = 0;
     searchPokemonEvolution(0);
     pokeInput.value = "";
     buttonLeft.style.color = 'burlywood';
     buttonUp.style.color = 'burlywood';
     buttonDown.style.color = 'burlywood';
     buttonUp.disabled = false;
     buttonDown.disabled = false;
     buttonLeft.disabled = false;
});
buttonLeft.addEventListener('click',() => {
     index -= 1;
     evolutionPhase = 0;
     searchPokemonEvolution(0);
});
buttonUp.addEventListener('click',() => {
     if(evolutionPhase >= 2) evolutionPhase = 2;
     else evolutionPhase += 1;
     searchPokemonEvolution(evolutionPhase);
});
buttonDown.addEventListener('click',() => {
     if(evolutionPhase <= 0) evolutionPhase = 0;
     else evolutionPhase -= 1;
     searchPokemonEvolution(evolutionPhase);
});
buttons.forEach(element => {
     element.addEventListener('click',() => audio.play());
});