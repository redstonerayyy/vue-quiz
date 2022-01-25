export function decodeHtmlEntities(str) {
  var textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value;
}
