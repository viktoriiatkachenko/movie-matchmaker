import"./assets/styles-B2NxqJIg.js";import{g as f,c as w}from"./assets/storage-D_nSxz11.js";async function $(e){const t=`https://api.themoviedb.org/3/genre/movie/list?api_key=${e}`;return(await(await fetch(t)).json()).genres}function m(e,t){return e.map(o=>{const n=t.find(s=>s.name===o);return n?n.id:null}).filter(o=>o!==null)}async function M(e,t,o){const n=[...t.favorites,...o.favorites],s=[...t.avoid,...o.avoid],a=[...new Set(n)],r=[...new Set(s)],i=await $(e),u=m(a,i),h=m(r,i),g=`https://api.themoviedb.org/3/discover/movie?api_key=${e}&with_genres=${u.join(",")}&without_genres=${h.join(",")}&vote_average.gte=6`;return{movies:(await(await fetch(g)).json()).results,genreList:i}}function v(e,t){const o=new Map(t.map(n=>[n.id,n.name]));return(e||[]).map(n=>o.get(n)).filter(Boolean)}let d,l;function _(){d=document.getElementById("movie-modal"),l=document.getElementById("modal-body");const e=document.getElementById("modal-close-btn"),t=document.querySelector(".movie-modal__overlay");e.addEventListener("click",p),t.addEventListener("click",p)}function y(e,t,o){const n=v(e.genre_ids,t),s=e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"";l.innerHTML=`
    <div class="modal-layout">
      <div class="modal-poster">
        ${s?`<img src="${s}" alt="${e.title}" />`:""}
      </div>

      <div class="modal-meta">
        <h2>${e.title}</h2>
        <p>⭐ ${e.vote_average}</p>
        <p class="modal-genres"><strong>Genres:</strong> ${n.join(", ")||"Unknown"}</p>
        <h3>About this movie</h3>
        <p class="movie-overview">${e.overview||"No description available."}</p>
      </div>
    </div>
  `,d.classList.remove("hidden")}function p(){d.classList.add("hidden"),l.innerHTML=""}function b(e,t,o,n){e.innerHTML="",t.forEach(s=>{const a=document.createElement("div");a.classList.add("movie-card");const r=v(s.genre_ids,o),i=s.poster_path?`https://image.tmdb.org/t/p/w500${s.poster_path}`:"";a.innerHTML=`
      ${i?`<img src="${i}" alt="${s.title}" />`:""}
      <h3>${s.title}</h3>
      <p>⭐ ${s.vote_average}</p>
      <p class="movie-genres">${r.join(", ")||"Unknown"}</p>
    `,a.addEventListener("click",function(){y(s,o)}),e.appendChild(a)})}const L="4b1ef9933dbb53ae038172050f28ee9b",E=document.getElementById("results"),I=document.getElementById("restart-btn"),c=f();c||(window.location.href="./match.html");_();B();I.addEventListener("click",function(){w(),window.location.href="./match.html"});async function B(){const{user1:e,user2:t}=c;console.log("matchData:",c);const{movies:o,genreList:n}=await M(L,e,t);console.log("movies:",o),console.log("genreList:",n),b(E,o,n,{user1:e.mood,user2:t.mood})}
//# sourceMappingURL=results.js.map
