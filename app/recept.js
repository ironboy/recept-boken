function recept() {
  return /*html*/`<div class="receptlist not-lpage">
    <h2>Recept</h2>
    ${receptMd}
   </div>`
}

window.showImageOnLoad = img => $(img).addClass('visible');