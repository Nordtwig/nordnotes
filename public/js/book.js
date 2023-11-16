const ratingDisplay = document.getElementById("rating-display");
const ratingRange = document.getElementById("rating");

ratingRange.addEventListener("change", (event) => {
    ratingDisplay.textContent = ratingRange.value; 
})
