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
        // Check minimum age
        if (scheme.eligibility.minAge) {
            if (user.age < scheme.eligibility.minAge) {
                isMatch = false;
            }
        }

        // Check gender
        if (scheme.eligibility.gender) {
            if (!scheme.eligibility.gender.includes(user.gender)) {
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
            let totalBenefit = 0;

            matches.forEach(function(scheme) {
                if (scheme.benefitAmount) {
                    totalBenefit += scheme.benefitAmount;
                }
            });

            let benefitSummary = document.getElementById("benefit-summary");

            if (totalBenefit > 0) {
                benefitSummary.innerHTML = `
                    <span>Potential benefits you may be eligible for</span>
                    <strong>₹${totalBenefit.toLocaleString("en-IN")} / year</strong>
                `;
            } else {
                benefitSummary.innerHTML = "";
            }

            let resultsSection = document.getElementById("results-section");
            let resultsContainer = document.getElementById("results-container");

            resultsContainer.innerHTML = "";

            matches.forEach(function(scheme) {

                let card = document.createElement("div");

                card.className = "scheme-card";
                let reasons = [];

                if (scheme.eligibility.occupation) {
                    reasons.push(
                        "Your occupation matches: " + user.occupation
                    );
                }

                if (scheme.eligibility.maxAge) {
                    reasons.push(
                        "Your age (" + user.age +
                        ") is within the age limit of " +
                        scheme.eligibility.maxAge + "."
                    );
                }

                if (scheme.eligibility.minAge) {
                    reasons.push(
                        "You meet the minimum age requirement of " +
                        scheme.eligibility.minAge + " years."
                    );
                }

                if (scheme.eligibility.gender) {
                    reasons.push(
                        "Your gender matches this scheme."
                    );
                }

                card.innerHTML = `
                    <h3>${scheme.name}</h3>
                    <p>${scheme.benefit}</p>

                    <div class="why-qualify">
                        <strong>Why you qualify</strong>
                        <ul>
                            ${reasons.map(function(reason) {
                                return `<li>${reason}</li>`;
                            }).join("")}
                        </ul>
                    </div>

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