const ratingDisplay = document.getElementById("rating-display");
const ratingRange = document.getElementById("rating");

ratingRange.addEventListener("change", (event) => {
    ratingDisplay.textContent = ratingRange.value; 
})

$(document).ready(function () {                 
    $('#bookForm').submit(function (event) { 
        event.preventDefault();                 
        var form = document.getElementById('bookForm'); 
        console.log(form.title.value);
        var formData = new FormData(form); 
       
        $.ajax({ 
            url: 'http://localhost:3000/book/edit', 
            method: 'PATCH', 
            data: formData, 
            processData: false, 
            contentType: false, 
            success: function (response) {                       
                alert('Your form has been sent successfully.'); 
            }, 
            error: function (xhr, status, error) {                        
                alert('Your form was not sent successfully.'); 
                console.error(error); 
            } 
        }); 
    }); 
}); 
