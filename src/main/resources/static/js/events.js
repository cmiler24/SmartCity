const categoryFilter = document.getElementById("categoryFilter");
const costFilter = document.getElementById("costFilter");
const searchFilter = document.getElementById("searchFilter");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");

const eventsGrid = document.getElementById("eventsGrid");
const eventCount = document.getElementById("eventCount");
const noResults = document.getElementById("noResults");
let events = [];

let eventCards = [];

async function loadEvents() {
    try {
        const response = await fetch("/api/events");
        events = await response.json();

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
    article.setAttribute("data-title", event.title)
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
    registerButton.addEventListener("click", (e) => handleRegisterClick(e));

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

async function handleRegisterClick(e) {
    const currentUser = localStorage.getItem("currentUser");

    if (currentUser) {
        // TODO: Complete event registration functionality for logged-in users
        console.log("TODO: Handle event registration for logged-in user");

        // check that e.target card === to one of the events in const envents
        const targetEvent = e.target.closest(".event-card").dataset;
        const eventToRegister = events.find(event => event.title === targetEvent.title && event.eventType.toLowerCase().replace(/\s+/g, "-") === targetEvent.category && event.location.toLowerCase().replace(/\s+/g, "-") === targetEvent.location.toLowerCase() && (event.free ? "free" : "paid") === targetEvent.cost);

        // if already registered, delete user registration

        if (e.target.textContent === "Registered") {
            // TODO: Delete user registration
            try {
                const response = await fetch("/api/event-registrations/unregister", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId: currentUser.id,
                        eventId: eventToRegister.id
                    })
                });

                if (response.ok) {
                    alert("Successfully unregistered from the event!");
                    e.target.textContent = "Register";
                    e.target.style.backgroundColor = "";
                    e.target.style.color = "";
                    // e.target.disabled = false;
                } else {
                    alert("Failed to unregister from the event. Please try again.");
                }

                return;
            } catch (error) {
                console.error("Error unregistering from event:", error);
                alert("An error occurred while unregistering from the event. Please try again later.");
            }
        }

        if (e.target.textContent === "Register") {
            // post eventToRegister id and id of currentUser to backend
            try {
                const response = await fetch("/api/event-registrations/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId: currentUser.id,
                        eventId: eventToRegister.id
                    })
                });

                if (response.ok) {
                    alert("Successfully registered for the event!");
                    // change register event button to "Registered" and disable it
                    e.target.textContent !== "Registered" ? e.target.textContent = "Registered" : "Register";
                    e.target.style.backgroundColor = "#4CAF50";
                    e.target.style.color = "white";
                    // e.target.disabled = true;
                } else {
                    alert("Failed to register for the event. Please try again.");
                }

                return;
            } catch (error) {
                console.error("Error registering for event:", error);
                alert("An error occurred while registering for the event. Please try again later.");
            }
        }
        openAuthModal();
    }
}

categoryFilter.addEventListener("change", filterEvents);
costFilter.addEventListener("change", filterEvents);
searchFilter.addEventListener("input", filterEvents);
clearFiltersBtn.addEventListener("click", clearFilters);

// Load events when page loads
loadEvents();
