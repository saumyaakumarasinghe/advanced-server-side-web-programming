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

        // Fetch celebrity details
        $.get(`/celebrities/search?name=${encodeURIComponent(name)}`, function (data) {
            $("#results").html(`
                <h3>${data.name}</h3>
                <img src="${data.image}" alt="${data.name}" width="150">
                <p>${data.bio}</p>
            `);
        }).fail(function () {
            $("#results").html(`<p style="color: red;">Celebrity not found!</p>`);
        });
    });
});
