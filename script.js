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