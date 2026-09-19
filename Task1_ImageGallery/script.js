const cards=[...document.querySelectorAll(".card")];const filters=[...document.querySelectorAll(".filter")];const count=document.getElementById("count");const lightbox=document.getElementById("lightbox");const lightboxImage=document.getElementById("lightboxImage");const lightboxTitle=document.getElementById("lightboxTitle");let visibleCards=cards;let current=0;
function updateCount(){count.textContent=`${visibleCards.length} image${visibleCards.length!==1?"s":""}`}
filters.forEach(btn=>btn.addEventListener("click",()=>{filters.forEach(b=>b.classList.remove("active"));btn.classList.add("active");const filter=btn.dataset.filter;cards.forEach(card=>card.style.display=filter==="all"||card.dataset.category===filter?"block":"none");visibleCards=cards.filter(card=>filter==="all"||card.dataset.category===filter);updateCount()}));
function show(index){if(!visibleCards.length)return;current=(index+visibleCards.length)%visibleCards.length;const card=visibleCards[current];lightboxImage.src=card.dataset.image;lightboxImage.alt=card.querySelector("img").alt;lightboxTitle.textContent=card.dataset.title}
cards.forEach(card=>card.addEventListener("click",()=>{current=visibleCards.indexOf(card);show(current);lightbox.classList.add("open");lightbox.setAttribute("aria-hidden","false")}));
document.getElementById("close").onclick=()=>{lightbox.classList.remove("open");lightbox.setAttribute("aria-hidden","true")};
document.getElementById("prev").onclick=()=>show(current-1);document.getElementById("next").onclick=()=>show(current+1);
document.addEventListener("keydown",e=>{if(!lightbox.classList.contains("open"))return;if(e.key==="Escape")document.getElementById("close").click();if(e.key==="ArrowLeft")show(current-1);if(e.key==="ArrowRight")show(current+1)});
updateCount();
