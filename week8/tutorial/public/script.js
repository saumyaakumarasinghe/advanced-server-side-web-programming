$(document).ready(function () {
    // Fetch and populate the dropdown on page load
    $.get("/celebrities", function (data) {
        data.forEach(name => {
            $("#celebrityDropdown").append(`<option value="${name}">${name}</option>`);
        });
    });

    // Update text input when dropdown selection changes
    $("#celebrityDropdown").change(function () {
        $("#celebrityName").val($(this).val());
    });

    // Handle form submission
    $("#submitBtn").click(function () {
        let name = $("#celebrityName").val().trim();

        if (!name) {
            alert("Please enter or select a celebrity name.");
            return;
        }

        // Show loading spinner before making the request
        $("#loadingSpinner").show();
        $("#results").empty(); // Clear previous results

        // Fetch celebrity details
        $.get(`/celebrities/search?name=${encodeURIComponent(name)}`, function (data) {
            // Hide the loading spinner once the data is received
            $("#loadingSpinner").hide();

            // Create the HTML to display celebrity info
            let filmsList = "<ul>";
            data.films.forEach(film => {
                filmsList += `<li>${film}</li>`;
            });
            filmsList += "</ul>";

            // Display the result
            $("#results").html(`
                <h3>${data.name} (${data.age} years old)</h3>
                <img src="${data.image}" alt="${data.name}" width="150">
                <p>${data.bio}</p>
                <h4>Top 3 Films:</h4>
                ${filmsList}
            `);
        }).fail(function () {
            // Hide the loading spinner if there's an error
            $("#loadingSpinner").hide();

            // Display an error message
            $("#results").html(`<p style="color: red;">Celebrity not found or an error occurred. Please try again.</p>`);
        });
    });
});
