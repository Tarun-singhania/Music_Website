let songIndex=0;

let audioElement=new Audio("songs/1.mp3");
let masterPlay=document.getElementById("masterPlay");
let myProgressBar=document.getElementById("myProgressBar");
let gif=document.getElementById("gif");
let backwardSong=document.getElementById("backwardSong");
let forwardSong=document.getElementById("forwardSong");
let songItems=Array.from(document.getElementsByClassName("songItem"));

let singleSongBtns=document.querySelectorAll(".songTime i");

// Songs List
const songs=[
  {songName:"Barsaat Aa Gayi",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
  {songName:"Chaand se pyara mukhda",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
  {songName:"Dilbara",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
  {songName:"Ek Tu Hi Hai",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
  {songName:"Issa Vibe Bloddy Daddy",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
  {songName:"Pehli Barish Mein",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
  {songName:"Sun Sajni",filePath:"songs/7.mp3",coverPath:"covers/7.jpg"},
  {songName:"Teri Main Hogayi",filePath:"songs/8.mp3",coverPath:"covers/8.jpg"}
]

songItems.forEach((songItem,i)=>{
  songItem.getElementsByTagName("img")[0].src=songs[i].coverPath;
  songItem.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})

// Play and Paused songs
masterPlay.addEventListener('click',()=>{
  if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity=1;
    singleSongBtns[songIndex].classList.add("fa-circle-pause");
    singleSongBtns[songIndex].classList.remove("fa-circle-play");
  }
  else{
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity=0;
    singleSongBtns[songIndex].classList.remove("fa-circle-pause");
    singleSongBtns[songIndex].classList.add("fa-circle-play");
  }
})

//work on progressBar
audioElement.addEventListener('timeupdate',()=>{
  progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
  myProgressBar.value=progress;
})
myProgressBar.addEventListener('change',()=>{
  audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100;
})

// Work on Next & Previous Song
forwardSong.addEventListener('click',()=>{
  singleSongBtns[songIndex].classList.remove("fa-circle-pause");
  singleSongBtns[songIndex].classList.add("fa-circle-play");
  if(songIndex>=songs.length-1){
    songIndex=0;
    singleSongBtns[songIndex].classList.add("fa-circle-pause");
    singleSongBtns[songIndex].classList.remove("fa-circle-play");
  }else{
    songIndex+=1;
    singleSongBtns[songIndex].classList.add("fa-circle-pause");
    singleSongBtns[songIndex].classList.remove("fa-circle-play");
  }
  audioElement.currentTime=0;
  audioElement.src=`songs/${songIndex+1}.mp3`;
  masterPlay.classList.add("fa-circle-pause");
  masterPlay.classList.remove("fa-circle-play");
  audioElement.play();

  document.getElementById("currentMusicPlay").innerText=songs[songIndex].songName;
});

backwardSong.addEventListener('click',()=>{
    singleSongBtns[songIndex].classList.remove("fa-circle-pause");
    singleSongBtns[songIndex].classList.add("fa-circle-play");
  if(songIndex<=0){
    songIndex=songs.length-1;
    singleSongBtns[songIndex].classList.remove("fa-circle-play");
    singleSongBtns[songIndex].classList.add("fa-circle-pause");
  }else{
    songIndex-=1;
    singleSongBtns[songIndex].classList.remove("fa-circle-play");
    singleSongBtns[songIndex].classList.add("fa-circle-pause");
  }
  audioElement.currentTime=0;
  audioElement.src=`songs/${songIndex+1}.mp3`;
  masterPlay.classList.add("fa-circle-pause");
  masterPlay.classList.remove("fa-circle-play");
  audioElement.play();
  document.getElementById("currentMusicPlay").innerText=songs[songIndex].songName;
});

// work on small play and pause btn
// singleSongBtns.forEach((singleSongBtn)=>{
//   singleSongBtn.addEventListener(('click'),()=>{
//     if(singleSongBtn.classList.contains("fa-circle-play")){
//       console.log("I")
//       singleSongBtn.classList.remove("fa-circle-play")
//       singleSongBtn.classList.add("fa-circle-pause");
//     }
//     else if(singleSongBtn.classList.contains("fa-circle-pause")){
//       singleSongBtn.classList.remove("fa-circle-pause");
//       singleSongBtn.classList.add("fa-circle-play")
//     };
//   })
// })


// work on play all Music which are available
const makeAllPlay=()=>{
  Array.from(document.getElementsByClassName("songPlayItem")).forEach((element)=>{
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
  })
}
Array.from(document.getElementsByClassName("songPlayItem")).forEach((element)=>{
  element.addEventListener('click',(e)=>{
    makeAllPlay();
    songIndex=parseInt(e.target.id);
    e.target.classList.remove("fa-circle-play");
    e.target.classList.add("fa-circle-pause");
    audioElement.currentTime=0;
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterPlay.classList.add("fa-circle-pause");
    masterPlay.classList.remove("fa-circle-play");
    audioElement.play();
    document.getElementById("currentMusicPlay").innerText=songs[songIndex].songName;
    gif.style.opacity=1;
  })
})