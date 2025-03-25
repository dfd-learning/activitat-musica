 // Pedir acceso aqui: https://cors-anywhere.herokuapp.com/corsdemo

 let audio = new Audio();

fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/tracks").then(
    function(res){
        return res.json();
    }
).then(
    function(data){
        parsearCanciones(data.tracks);
    }
).catch(
    function(err){
        console.log(err);
    }
);
 
 function crearCancionEl(contenedorEl, cancion){
     let cancionDivEl = document.createElement("div");
     cancionDivEl.classList.add('cancion');
     cancionDivEl.innerHTML = `
     <h2 class="titulo-cancion">${cancion.title_short}</h2>
     <a class="link-cancion" href="${cancion.link}" target="_blank">
         <img class="imagen-cancion">
     </a>
     <a class="boton-play-pause" href="javascript:void(0);" onclick="playPauseAudio('${cancion.preview}')">Play/Pause</a>
     <p class="artista">${cancion.artist.name}</p>
  `;
     contenedorEl.appendChild(cancionDivEl);
     fetch(`https://cors-anywhere.herokuapp.com/${cancion.album.cover_medium}`)
    .then((response) => response.blob())
    .then(
        function(blob){
            const imageUrl = URL.createObjectURL(blob);
            const imageEl = cancionDivEl.querySelector('.imagen-cancion');
            imageEl.src = imageUrl;
        }
    )
    .catch(
        function(err){
            console.error(err);
        }
    );
 }
 
 function parsearCanciones(tracks){
     //console.log(tracks);
     let mainEl = document.querySelector("main");
     for( let cancion of tracks.data ){
         console.log(cancion);
         if( cancion.title_short.length >= 15 ){
             cancion.title_short = cancion.title_short.substring(0, 15) + "...";
         }
         crearCancionEl(mainEl, cancion);
     }
 }
  
 function playPauseAudio(url){
     if( url !== audio.src ){
         audio.src = url;
     }
     console.log(audio.paused);
     if( audio.paused ){
         audio.play();
     } else{
         audio.pause();
    }
}