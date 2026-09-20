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

        // Check income
        if (scheme.eligibility.incomeBands) {

            if (!scheme.eligibility.incomeBands.includes(user.income)) {
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
                    benefitSummary.classList.remove("hidden");

            } 
            else {
                    benefitSummary.innerHTML = "";
                    benefitSummary.classList.add("hidden");
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

                if (scheme.eligibility.incomeBands) {
                    reasons.push(
                        "Your household income falls within the applicable income range."
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

                    <div class="verification-note">
                        <strong>Important:</strong>
                        ${scheme.verificationNote}
                    </div>

                    <a href="${scheme.officialWebsite}" target="_blank">
                        Visit Official Website →
                    </a>
                `;

                resultsContainer.appendChild(card);
            });

            resultsSection.classList.remove("hidden");

        });

});
document
    .getElementById("check-scam-btn")
    .addEventListener("click", function() {

        let message = document
            .getElementById("scam-message")
            .value
            .toLowerCase();

        let result = document.getElementById("scam-result");

        if (message.trim() === "") {

            result.innerHTML = `
                <div class="scam-result warning">
                    <h3>Please enter a message</h3>
                    <p>Paste the suspicious message above to check it.</p>
                </div>
            `;

            result.classList.remove("hidden");
            return;
        }

        let warningSigns = [];

        // Asking for OTP or password
        if (
            message.includes("otp") ||
            message.includes("one time password") ||
            message.includes("password") ||
            message.includes("pin")
        ) {
            warningSigns.push(
                "The message asks for sensitive information such as an OTP, password or PIN."
            );
        }

        // Asking for money
        if (
            message.includes("pay") ||
            message.includes("payment") ||
            message.includes("send money") ||
            message.includes("transfer") ||
            message.includes("fee") ||
            message.includes("processing charge")
        ) {
            warningSigns.push(
                "The message asks you to make a payment or transfer money."
            );
        }

        // Urgency
        if (
            message.includes("urgent") ||
            message.includes("immediately") ||
            message.includes("act now") ||
            message.includes("within 24 hours") ||
            message.includes("account will be blocked") ||
            message.includes("account will be closed")
        ) {
            warningSigns.push(
                "The message uses urgent or threatening language to pressure you."
            );
        }

        // Suspicious links
        // Suspicious links
        let links = message.match(/https?:\/\/[^\s]+/g);

        if (links) {

            let suspiciousLink = false;

            links.forEach(function(link) {

                try {
                    let url = new URL(link);
                    let hostname = url.hostname;

                    if (
                        !hostname.endsWith(".gov.in") &&
                        hostname !== "gov.in"
                    ) {
                        suspiciousLink = true;
                    }

                } catch (error) {
                    suspiciousLink = true;
                }

            });

            if (suspiciousLink) {
                warningSigns.push(
                    "The message contains a link that is not from an official .gov.in government domain."
                );
                }
            }   
        // Unrealistic promises
        if (
            message.includes("you won") ||
            message.includes("you have won") ||
            message.includes("free money") ||
            message.includes("guaranteed cash") ||
            message.includes("claim your prize") ||
            message.includes("lucky winner")
        ) {
            warningSigns.push(
                "The message makes an unrealistic prize, reward or money promise."
            );
        }

        // Government impersonation
        if (
            message.includes("government scheme") ||
            message.includes("government grant") ||
            message.includes("pm scheme") ||
            message.includes("ministry") ||
            message.includes("aadhaar update")
        ) {
            warningSigns.push(
                "The message uses government-related claims that should be verified through an official government website."
            );
        }

        let verdict;
        let resultClass;

        if (warningSigns.length >= 3) {

            verdict = "High Scam Risk";
            resultClass = "danger";

        } else if (warningSigns.length >= 1) {

            verdict = "Needs Verification";
            resultClass = "warning";

        } else {

            verdict = "No Obvious Red Flags";
            resultClass = "safe";
        }

        result.innerHTML = `
            <div class="scam-result ${resultClass}">
                <h3>${verdict}</h3>

                <p>
                    ${
                        warningSigns.length > 0
                        ? "We found the following warning signs:"
                        : "We did not detect the common warning signs checked by LabhLens."
                    }
                </p>

                ${
                    warningSigns.length > 0
                    ? `
                        <ul>
                            ${warningSigns.map(function(sign) {
                                return `<li>${sign}</li>`;
                            }).join("")}
                        </ul>
                    `
                    : ""
                }

                <div class="scam-advice">
                   <strong>Safety reminder:</strong>
                    Never share OTPs, passwords or PINs. Verify government
                    schemes through official government websites before making
                    payments or submitting personal information.

                    <br><br>

                    <strong>Note:</strong>
                    LabhLens provides a screening based on common warning signs.
                    It does not confirm that a message is definitely a scam or safe.
                </div>
            </div>
        `;

        result.classList.remove("hidden");
    });