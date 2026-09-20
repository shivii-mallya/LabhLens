# LabhLens

### Discover benefits. Verify before you trust.

LabhLens is a simple web application that helps users discover government schemes that may be relevant to them and identify common warning signs in suspicious scheme-related messages.

---

## Problem

Government schemes can provide important financial, educational, housing, insurance and livelihood support, but many people may not know which schemes could be relevant to them.

At the same time, scam messages often misuse the names of government schemes to ask people for:

- OTPs and passwords
- Payments or processing fees
- Personal information
- Urgent actions
- Clicking suspicious links

LabhLens brings these two problems together in one simple interface.

---

## Solution

LabhLens provides two core tools:

### 1. Find Schemes

Users enter basic information such as:

- Age
- State
- Annual household income
- Occupation
- Category
- Gender

The application compares these details against a structured scheme dataset and displays schemes that may be relevant.

Each result provides:

- Scheme name
- Benefit description
- Why the user matched
- Required documents
- How to apply
- Verification notes
- Official website

The application also calculates a potential yearly benefit total when a scheme has a clearly defined monetary benefit.

### 2. Scam Checker

Users can paste a suspicious SMS, WhatsApp message or social media message.

LabhLens checks for common warning signs such as:

- OTP, password or PIN requests
- Payment or processing-fee requests
- Urgent or threatening language
- Suspicious links
- Unrealistic prize or money claims
- Government-related claims requiring verification

The message is classified as:

- **High Scam Risk**
- **Needs Verification**
- **No Obvious Red Flags**

The checker is intentionally presented as a screening tool, not as proof that a message is definitely safe or fraudulent.

---

## Key Features

- Personalized scheme discovery
- Rule-based eligibility matching
- Benefit summary
- "Why you qualify" explanations
- Required documents and application guidance
- Links to official scheme websites
- Scam message screening
- Suspicious-link detection
- Clear safety guidance
- Responsive interface
- No login or personal data storage required

---

## How It Works

```text
User
  |
  v
Eligibility Form
  |
  v
JavaScript Matching Engine
  |
  v
schemes.json
  |
  v
Potential Scheme Matches
  |
  +--> Benefit Summary
  |
  +--> Documents & Application Information
  |
  +--> Official Website


Suspicious Message
  |
  v
Rule-Based Scam Detection
  |
  +--> Warning Signs
  |
  +--> Risk Classification
  |
  v
Safety Guidance
```

## Technology Stack
HTML5 — application structure
CSS3 — responsive UI and styling
JavaScript — eligibility matching and scam detection
JSON — structured scheme data
VS Code / Live Server — development and local testing

No backend or database is required for the current version.

## Project Structure
LabhLens/
│
├── index.html
├── style.css
├── script.js
├── schemes.json
└── README.md

## Running Locally
1. Clone the repository
git clone https://github.com/shivii-mallya/LabhLens.git
2. Open the project
cd LabhLens
3. Run the application

Open index.html using a local development server such as VS Code Live Server.
The application will open in your browser.

## Data & Verification
LabhLens uses a structured dataset containing information about selected Indian government schemes.
The application provides links to official government websites so users can verify scheme details and eligibility before applying.

The eligibility engine only evaluates the conditions encoded in the application's dataset. Actual eligibility may depend on additional government rules, documentation, verification and scheme-specific conditions.

## Limitations
LabhLens is currently a lightweight client-side prototype.

The current version:
Uses a predefined scheme dataset
Uses rule-based matching
Does not connect directly to government databases
Does not submit applications
Does not guarantee official eligibility
Uses rule-based scam screening rather than a definitive fraud-detection system

These limitations are intentional for the prototype and provide a clear path for future development.

## Future Scope
Potential future improvements include:
Larger and regularly updated scheme database
More detailed eligibility rules
Regional and state-specific schemes
Hindi and other Indian language support
Voice-based interaction
AI-assisted scam analysis
Government API integration where available
Personalized family-level scheme discovery
Progressive Web App support

## Impact
LabhLens aims to make government-benefit discovery simpler while encouraging users to verify suspicious scheme-related messages before sharing sensitive information or making payments.

The goal is not to replace official government portals, but to provide a simpler starting point that helps users discover relevant information and verify it through official sources.