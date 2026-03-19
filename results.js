import{i as S}from"./assets/lenis-Vg-C-t4S.js";import{g as m}from"./assets/vendor-CO_RJdZs.js";import{g as D,c as k}from"./assets/storage-D_nSxz11.js";async function O(e){const t=`https://api.themoviedb.org/3/genre/movie/list?api_key=${e}`;return(await(await fetch(t)).json()).genres}function g(e,t){return e.map(o=>{const a=t.find(n=>n.name===o);return a?a.id:null}).filter(o=>o!==null)}async function R(e,t,o,a=1){const n=[...t.favorites,...o.favorites],s=[...t.avoid,...o.avoid],i=[...new Set(n)],r=[...new Set(s)],c=await O(e),u=g(i,c)||[],d=g(r,c)||[],f=`https://api.themoviedb.org/3/discover/movie?api_key=${e}${u.length?`&with_genres=${u.join(",")}`:""}${d.length?`&without_genres=${d.join(",")}`:""}&vote_average.gte=6`,A=`${f}&page=${a}`,H=`${f}&page=${a+1}`,[j,N]=await Promise.all([fetch(A),fetch(H)]),U=await j.json(),F=await N.json();return{movies:[...U.results||[],...F.results||[]],genreList:c}}async function W(e,t=1){const o=`https://api.themoviedb.org/3/movie/popular?api_key=${e}&page=${t}`;return(await(await fetch(o)).json()).results||[]}const P={"Need comfort":["Drama","Romance","Comedy","Fantasy"],"Need distraction":["Action","Comedy","Adventure","Animation"],"Want to feel deeply":["Drama","Romance","Mystery"],"Want to think":["Sci-Fi","Mystery","Thriller"],"Want energy":["Action","Thriller","Horror"],"Want something different":["Sci-Fi","Fantasy","Animation"]};function p(e,t){const o=new Map(t.map(a=>[a.id,a.name]));return(e||[]).map(a=>o.get(a)).filter(Boolean)}function y(e,t){if(!e)return null;const o=P[e]||[],a=t.filter(i=>o.includes(i)),n=o.length?a.length/o.length:0;let s;return n>=.75?s="High":n>=.4?s="Medium":s="Low",{label:s,overlap:a,moodGenres:o}}function M(e,t,o){const a=p(e.genre_ids,t);let n=0;const s=y(o.user1,a),i=y(o.user2,a);return s&&(s.label==="High"?n+=3:s.label==="Medium"?n+=2:n+=1),i&&(i.label==="High"?n+=3:i.label==="Medium"?n+=2:n+=1),n+=e.vote_average/2,n}let h,v;function q(){h=document.getElementById("movie-modal"),v=document.getElementById("modal-body");const e=document.getElementById("modal-close-btn"),t=document.querySelector(".movie-modal__overlay");e.addEventListener("click",_),t.addEventListener("click",_)}function B(e,t,o){const a=p(e.genre_ids,t),n=e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"";v.innerHTML=`
    <div class="modal-layout">
      <div class="modal-poster">
        ${n?`<img src="${n}" alt="${e.title}" />`:""}
      </div>

      <div class="modal-meta">
        <h2>${e.title}</h2>
        <p>⭐ ${Math.round(e.vote_average*10)/10}</p>
        <p class="modal-genres"><strong>Genres:</strong> ${a.join(", ")||"Unknown"}</p>

        <h3>About this movie</h3>
        <p class="movie-overview">${e.overview||"No description available."}</p>
      </div>
    </div>
  `,h.classList.remove("hidden"),m.set(".movie-modal__overlay",{opacity:0}),m.set(".movie-modal__content",{opacity:0,y:18,scale:.98}),m.timeline({defaults:{ease:"power3.out"}}).to(".movie-modal__overlay",{opacity:1,duration:.22}).to(".movie-modal__content",{opacity:1,y:0,scale:1,duration:.32},"-=0.1")}function _(){m.timeline({defaults:{ease:"power2.inOut"},onComplete:()=>{h.classList.add("hidden"),v.innerHTML=""}}).to(".movie-modal__content",{opacity:0,y:14,scale:.98,duration:.22}).to(".movie-modal__overlay",{opacity:0,duration:.18},"-=0.12")}function b(e,t,o,a,n=!1){n||(e.innerHTML=""),t.forEach((s,i)=>{const r=Math.round(s.vote_average*10)/10,c=document.createElement("div");c.classList.add("movie-card");const u=p(s.genre_ids,o),d=s.poster_path?`https://image.tmdb.org/t/p/w500${s.poster_path}`:"";c.innerHTML=`
      ${d?`<img src="${d}" alt="${s.title}" />`:""}
      <h3>${s.title}</h3>
      <p>⭐ ${r}</p>
      <p class="movie-genres">${u.join(", ")||"Unknown"}</p>
    `,c.addEventListener("click",function(){B(s,o)}),e.appendChild(c)})}function x(e,t,o,a){e.innerHTML="";const n=p(t.genre_ids,o),s=Math.round(t.vote_average*10)/10,i=t.poster_path?`https://image.tmdb.org/t/p/w500${t.poster_path}`:"",r=document.createElement("div");r.classList.add("best-match-card"),r.innerHTML=`
    <div class="best-match-card__image">
      ${i?`<img src="${i}" alt="${t.title}" />`:""}
    </div>

    <div class="best-match-card__content">
      <p class="hero-badge">Top recommendation</p>
      <h3>${t.title}</h3>
      <p>⭐ ${s}</p>
      <p class="movie-genres">${n.join(", ")||"Unknown"}</p>
      <p class="movie-overview">
        ${t.overview||"No description available."}
      </p>
    </div>
  `,r.addEventListener("click",function(){B(t,o)}),e.appendChild(r)}S();const w="4b1ef9933dbb53ae038172050f28ee9b",$=document.getElementById("results"),z=document.getElementById("restart-btn"),Y=document.getElementById("home-btn"),G=document.getElementById("load-more-btn"),L=document.getElementById("fallback-message"),J=document.getElementById("best-match"),C=D();let E=1,I=!1,l=null;const K=20,Q=12;C||(window.location.href="./match.html");q();T();z.addEventListener("click",function(){k(),window.location.href="./match.html"});Y.addEventListener("click",function(){k(),window.location.href="./index.html"});G.addEventListener("click",async function(){E+=1,await T(E)});async function T(e=1){try{const{user1:t,user2:o}=C;L.classList.add("hidden");let{movies:a,genreList:n}=await R(w,t,o,e);if(l={user1:t.mood,user2:o.mood},!a||a.length===0)if(e===1)L.classList.remove("hidden"),a=await W(w);else{G.style.display="none";return}const s=[...a].sort((i,r)=>M(r,n,l)-M(i,n,l));if(I){const i=s.slice(0,Q);b($,i,n,l,!0)}else{const i=s.slice(0,K+1),r=i[0],c=i.slice(1);r&&x(J,r,n,l),b($,c,n,l,!1),I=!0,V()}}catch(t){console.error("Failed to load movies:",t)}}function V(){m.timeline({defaults:{ease:"power3.out"}}).from(".results-header",{y:18,opacity:0,duration:.5}).from("#fallback-message:not(.hidden)",{y:12,opacity:0,duration:.4},"-=0.2").from(".best-match-card",{y:28,opacity:0,duration:.7},"-=0.2").from(".movie-card",{y:24,opacity:0,duration:.5,stagger:.06},"-=0.35")}
//# sourceMappingURL=results.js.map
