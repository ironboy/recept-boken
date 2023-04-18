function nameStyler(name) {
  name = name.replace(/,/, '---first-comma---');
  name = name.split('---first-comma---');
  name.length > 1 && (name[1] = '<small>' + name[1] + '</small>');
  name[0] = '<span>' + name[0] + '</span>'
  name = name.join('<br>');
  return name;
}