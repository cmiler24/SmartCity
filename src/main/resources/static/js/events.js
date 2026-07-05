const categoryFilter = document.getElementById("categoryFilter");
const costFilter = document.getElementById("costFilter");
const searchFilter = document.getElementById("searchFilter");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");

const eventsGrid = document.getElementById("eventsGrid");
const eventCount = document.getElementById("eventCount");
const noResults = document.getElementById("noResults");

let eventCards = [];

async function loadEvents() {
    try {
        const response = await fetch("/api/events");
        const events = await response.json();

        eventsGrid.innerHTML = "";
        eventCards = [];

        events.forEach((event) => {
            const eventCard = createEventCard(event);
            eventsGrid.appendChild(eventCard);
            eventCards.push(eventCard);
        });

        filterEvents();
    } catch (error) {
        console.error("Error loading events:", error);
        eventsGrid.innerHTML = "<p>Error loading events. Please try again later.</p>";
    }
}

function createEventCard(event) {
    const article = document.createElement("article");
    article.className = "event-card";
    article.setAttribute("data-category", event.eventType.toLowerCase().replace(/\s+/g, "-"));
    article.setAttribute("data-location", event.location.toLowerCase().replace(/\s+/g, "-"));
    article.setAttribute("data-cost", event.free ? "free" : "paid");

    const costText = event.free ? "Free" : "Paid";
    const dateObj = new Date(event.eventDate);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    article.innerHTML = `
        <h3>${event.title}</h3>
        <p class="event-description">
            ${event.title} event description
        </p>

        <div class="event-details">
            <p><strong>Category:</strong> ${event.eventType}</p>
            <p><strong>Cost:</strong> ${costText}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Location:</strong> ${event.location}</p>
        </div>

        <button class="register-button">Register</button>
    `;

    const registerButton = article.querySelector(".register-button");
    registerButton.addEventListener("click", handleRegisterClick);

    return article;
}

function filterEvents() {
    const category = categoryFilter.value;
    const cost = costFilter.value;
    const searchTerm = searchFilter.value.trim().toLowerCase();

    let visibleEvents = eventCards.filter((eventCard) => {
        const matchesCategory =
            category === "all" || eventCard.dataset.category === category;

        const matchesCost =
            cost === "all" || eventCard.dataset.cost === cost;

        const matchesSearch =
            searchTerm === "" || eventCard.textContent.toLowerCase().includes(searchTerm);

        return matchesCategory && matchesCost && matchesSearch;
    });

    eventCards.forEach((eventCard) => {
        eventCard.style.display = "none";
    });

    visibleEvents.forEach((eventCard) => {
        eventCard.style.display = "flex";
    });

    eventCount.textContent = `${visibleEvents.length} event${visibleEvents.length === 1 ? "" : "s"} found`;
    noResults.style.display = visibleEvents.length === 0 ? "block" : "none";
}

function clearFilters() {
    categoryFilter.value = "all";
    costFilter.value = "all";
    searchFilter.value = "";

    filterEvents();
}

function handleRegisterClick() {
    const currentUser = localStorage.getItem("currentUser");

    if (currentUser) {
        // TODO: Complete event registration functionality for logged-in users
        console.log("TODO: Handle event registration for logged-in user");
        return;
    }

    openAuthModal();
}

categoryFilter.addEventListener("change", filterEvents);
costFilter.addEventListener("change", filterEvents);
searchFilter.addEventListener("input", filterEvents);
clearFiltersBtn.addEventListener("click", clearFilters);

// Load events when page loads
loadEvents();
