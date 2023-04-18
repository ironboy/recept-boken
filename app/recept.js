function recept() {
  const s = x => {
    //console.log(x);
    return x;
  }
  return /*html*/`<div class="receptlist not-lpage">
    ${receptMd.split('<a href').map(x => s('<a href' + x))}
   </div>`;
}