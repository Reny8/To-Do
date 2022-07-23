var accordions = document.getElementsByClassName("accordion-todos");
for (var i = 0; i < accordions.length; i++) {
  accordions[i].onClick = function () {
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  };
}