import"./assets/styles-CCtAtZr1.js";import{g as $,c as w}from"./assets/storage-D_nSxz11.js";async function _(e){const t=`https://api.themoviedb.org/3/genre/movie/list?api_key=${e}`;return(await(await fetch(t)).json()).genres}function h(e,t){return e.map(o=>{const s=t.find(n=>n.name===o);return s?s.id:null}).filter(o=>o!==null)}async function L(e,t,o){const s=[...t.favorites,...o.favorites],n=[...t.avoid,...o.avoid],a=[...new Set(s)],i=[...new Set(n)],r=await _(e),l=h(a,r),m=h(i,r),p=`https://api.themoviedb.org/3/discover/movie?api_key=${e}&with_genres=${l.join(",")}&without_genres=${m.join(",")}&vote_average.gte=6`;return{movies:(await(await fetch(p)).json()).results,genreList:r}}const E={"Need comfort":["Drama","Romance","Comedy","Fantasy"],"Need distraction":["Action","Comedy","Adventure","Animation"],"Want to feel deeply":["Drama","Romance","Mystery"],"Want to think":["Sci-Fi","Mystery","Thriller"],"Want energy":["Action","Thriller","Horror"],"Want something different":["Sci-Fi","Fantasy","Animation"]};function d(e,t){const o=new Map(t.map(s=>[s.id,s.name]));return(e||[]).map(s=>o.get(s)).filter(Boolean)}function g(e,t){if(!e)return null;const o=E[e]||[],s=t.filter(i=>o.includes(i)),n=o.length?s.length/o.length:0;let a;return n>=.75?a="High":n>=.4?a="Medium":a="Low",{label:a,overlap:s,moodGenres:o}}function c(e,t,o){const s=d(e.genre_ids,t);let n=0;const a=g(o.user1,s),i=g(o.user2,s);return a&&(a.label==="High"?n+=3:a.label==="Medium"?n+=2:n+=1),i&&(i.label==="High"?n+=3:i.label==="Medium"?n+=2:n+=1),n+=e.vote_average/2,n}let v,u;function G(){v=document.getElementById("movie-modal"),u=document.getElementById("modal-body");const e=document.getElementById("modal-close-btn"),t=document.querySelector(".movie-modal__overlay");e.addEventListener("click",f),t.addEventListener("click",f)}function b(e,t,o){const s=d(e.genre_ids,t),n=e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"";u.innerHTML=`
    <div class="modal-layout">
      <div class="modal-poster">
        ${n?`<img src="${n}" alt="${e.title}" />`:""}
      </div>

      <div class="modal-meta">
        <h2>${e.title}</h2>
        <p>⭐ ${e.vote_average}</p>
        <p class="modal-genres"><strong>Genres:</strong> ${s.join(", ")||"Unknown"}</p>
        <h3>About this movie</h3>
        <p class="movie-overview">${e.overview||"No description available."}</p>
      </div>
    </div>
  `,v.classList.remove("hidden")}function f(){v.classList.add("hidden"),u.innerHTML=""}function T(e,t,o,s){e.innerHTML="",t.forEach(n=>{const a=document.createElement("div");a.classList.add("movie-card");const i=d(n.genre_ids,o),r=n.poster_path?`https://image.tmdb.org/t/p/w500${n.poster_path}`:"";a.innerHTML=`
      ${r?`<img src="${r}" alt="${n.title}" />`:""}
      <h3>${n.title}</h3>
      <p>⭐ ${n.vote_average}</p>
      <p class="movie-genres">${i.join(", ")||"Unknown"}</p>
    `,a.addEventListener("click",function(){b(n,o)}),e.appendChild(a)})}function k(e,t,o,s){e.innerHTML="";const n=d(t.genre_ids,o),a=t.poster_path?`https://image.tmdb.org/t/p/w500${t.poster_path}`:"",i=document.createElement("div");i.classList.add("best-match-card"),i.innerHTML=`
    <div class="best-match-card__image">
      ${a?`<img src="${a}" alt="${t.title}" />`:""}
    </div>

    <div class="best-match-card__content">
      <p class="hero-badge">Top recommendation</p>
      <h3>${t.title}</h3>
      <p>⭐ ${t.vote_average}</p>
      <p class="movie-genres">${n.join(", ")||"Unknown"}</p>
      <p class="movie-overview">
        ${t.overview||"No description available."}
      </p>
    </div>
  `,i.addEventListener("click",function(){b(t,o)}),e.appendChild(i)}const B="4b1ef9933dbb53ae038172050f28ee9b",M=document.getElementById("results"),H=document.getElementById("restart-btn"),y=$();y||(window.location.href="./match.html");G();I();H.addEventListener("click",function(){w(),window.location.href="./match.html"});async function I(){const{user1:e,user2:t}=y,{movies:o,genreList:s}=await L(B,e,t);if(!o||o.length===0){M.innerHTML="<p>No movies found. Try different preferences.</p>";return}const n=document.getElementById("best-match"),a={user1:e.mood,user2:t.mood},i=[...o].sort((m,p)=>c(p,s,a)-c(m,s,a)),r=i[0],l=i.slice(1);k(n,r,s),T(M,l,s)}[...movies].sort((e,t)=>c(t,genreList,movieMoods)-c(e,genreList,movieMoods));
//# sourceMappingURL=results.js.map
