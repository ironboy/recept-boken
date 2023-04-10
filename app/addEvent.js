const events = {};
function addEvent(cssSel, type, func) {
  if (events[cssSel + '_' + type]) { return; }
  events[cssSel + '_' + type] = true;
  $(document).on(type, cssSel, func);
}