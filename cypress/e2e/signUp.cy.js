describe("Sign Up Page", () => {
    beforeEach(() => {
        // Visit the Sign Up page before each test
        cy.visit("/signup"); // Adjust this path if necessary
    });
    it("should successfully sign up a new user and redirect to login", () => {
        // Intercept the POST request to the sign-up endpoint
        cy.intercept("POST", "/api/signup", {
            statusCode: 201, // Mock a successful response
            body: {
                message: "User registered successfully", // Mock success message
            },
        }).as("signUp");
        // Fill out the form fields
        cy.get('input[name="email"]').type("testuser@example.com");
        cy.get('input[name="username"]').type("testuser");
        cy.get('input[name="first_name"]').type("Test");
        cy.get('input[name="last_name"]').type("User");
        cy.get('input[name="phone_number"]').type("1234567890");
        cy.get('input[name="password"]').type("securePassword123");
        // Submit the form
        cy.get('button[type="submit"]').click();
        // Wait for the sign-up request to complete
        cy.wait("@signUp");
        // Check if the user is redirected to the login page
        cy.url().should("include", "/login");
        // Check for success toast message
        cy.get(".Toastify__toast--success").should("contain", "User registered successfully"); // Adjust the expected message as necessary
    });
    it("should display validation errors for empty fields", () => {
        // Attempt to submit the form without filling any fields
        cy.get('button[type="submit"]').click();
        // Check for validation error messages
        cy.get('input[name="email"]')
            .parent()
            .find(".error-message") // Adjust the selector based on your error message element
            .should("contain", "Invalid email address"); // Check for the specific validation message
        cy.get('input[name="username"]')
            .parent()
            .find(".error-message")
            .should("contain", "At least 2 characters."); // Adjust accordingly
        // Continue checking other fields...
    });
    it("should display an error message on failed sign-up", () => {
        // Intercept the POST request to the sign-up endpoint and mock a failure response
        cy.intercept("POST", "/api/signup", {
            statusCode: 400, // Mock a failure response
            body: {
                message: "Sign-up failed", // Mock error message
            },
        }).as("signUpFailure");
        // Fill out the form with data that will fail the sign-up
        cy.get('input[name="email"]').type("invalidEmail");
        cy.get('input[name="username"]').type("testuser");
        cy.get('input[name="first_name"]').type("Test");
        cy.get('input[name="last_name"]').type("User");
        cy.get('input[name="phone_number"]').type("1234567890");
        cy.get('input[name="password"]').type("short");
        // Submit the form
        cy.get('button[type="submit"]').click();
        // Wait for the sign-up request to complete
        cy.wait("@signUpFailure");
        // Check for error toast message
        cy.get(".Toastify__toast--error").should("contain", "Sign-up failed"); // Adjust the expected message
    });
});
