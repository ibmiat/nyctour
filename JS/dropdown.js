var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;

        // Toggle the visibility of the content div
        if (content.style.display === "block") {
            content.style.display = "none";
            // Change the chevron to down when content is hidden
            this.querySelector(".back-chevron-icon").src = "../SVG/chevron--down.svg";
        } else {
            content.style.display = "block";
            // Change the chevron to up when content is shown
            this.querySelector(".back-chevron-icon").src = "../SVG/chevron--up.svg";
        }
    });
}