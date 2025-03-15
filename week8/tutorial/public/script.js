document.addEventListener("DOMContentLoaded", () => {
    const celebrityNameInput = document.getElementById("celebrityName");
    const celebrityDropdown = document.getElementById("celebrityDropdown");
    const submitBtn = document.getElementById("submitBtn");
    const resultsDiv = document.getElementById("results");

    // Load celebrity names into the dropdown
    fetch("/api/celebrities")
        .then(response => response.json())
        .then(data => {
            data.forEach(name => {
                const option = document.createElement("option");
                option.value = name;
                option.textContent = name;
                celebrityDropdown.appendChild(option);
            });
        })
        .catch(error => console.error("Error loading celebrity list:", error));

    // Handle search
    submitBtn.addEventListener("click", () => {
        const name = celebrityNameInput.value.trim() || celebrityDropdown.value;

        if (!name) {
            resultsDiv.innerHTML = `<p class="text-danger">Please enter or select a celebrity.</p>`;
            return;
        }

        fetch(`/api/celebrities/search?name=${encodeURIComponent(name)}`)
            .then(response => response.json())
            .then(data => {
                resultsDiv.innerHTML = `
                    <div class="card">
                        <img src="${data.image}" class="card-img-top" alt="${data.name}">
                        <div class="card-body">
                            <h5 class="card-title">${data.name}</h5>
                            <p class="card-text">${data.bio}</p>
                        </div>
                    </div>
                `;
            })
            .catch(() => {
                resultsDiv.innerHTML = `<p class="text-danger">Celebrity not found.</p>`;
            });
    });
});
