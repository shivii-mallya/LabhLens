function showView(viewName) {

    // Hide all views
    document.querySelectorAll(".app-view").forEach(function(view) {
        view.classList.add("hidden");
    });

    // Show the selected view
    document
        .getElementById(viewName + "-view")
        .classList.remove("hidden");

    // Scroll to the top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

let schemes = [];

fetch("schemes.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        schemes = data;
        console.log("Schemes loaded:", schemes);
    })
    .catch(function(error) {
        console.error("Error loading schemes:", error);
    });

function findMatchingSchemes(user) {
    let matches = [];

    schemes.forEach(function(scheme) {

        let isMatch = true;

        // Check occupation
        if (scheme.eligibility.occupation) {
            if (!scheme.eligibility.occupation.includes(user.occupation)) {
                isMatch = false;
            }
        }

        // Check maximum age
        if (scheme.eligibility.maxAge) {
            if (user.age > scheme.eligibility.maxAge) {
                isMatch = false;
            }
        }

        // If all conditions matched, add the scheme
        if (isMatch) {
            matches.push(scheme);
        }
    });

    return matches;
}

document.addEventListener("DOMContentLoaded", function() {

    document
        .getElementById("eligibility-form")
        .addEventListener("submit", function(event) {

            event.preventDefault();

            let user = {
                age: Number(document.getElementById("age").value),
                state: document.getElementById("state").value,
                income: document.getElementById("income").value,
                occupation: document.getElementById("occupation").value,
                category: document.getElementById("category").value,
                gender: document.getElementById("gender").value
            };

            console.log("User details:", user);

            let matches = findMatchingSchemes(user);

            console.log("Matching schemes:", matches);

            let resultsSection = document.getElementById("results-section");
            let resultsContainer = document.getElementById("results-container");

            resultsContainer.innerHTML = "";

            matches.forEach(function(scheme) {

                let card = document.createElement("div");

                card.className = "scheme-card";

                card.innerHTML = `
                    <h3>${scheme.name}</h3>
                    <p>${scheme.benefit}</p>

                    <p>
                        <strong>Documents:</strong>
                        ${scheme.documents.join(", ")}
                    </p>

                    <p>
                        <strong>How to apply:</strong>
                        ${scheme.howToApply}
                    </p>

                    <a href="${scheme.officialWebsite}" target="_blank">
                        Visit Official Website →
                    </a>
                `;

                resultsContainer.appendChild(card);
            });

            resultsSection.classList.remove("hidden");

        });

});