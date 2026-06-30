const categoryFilter = document.getElementById("categoryFilter");
const locationFilter = document.getElementById("locationFilter");
const costFilter = document.getElementById("costFilter");
const typeFilter = document.getElementById("typeFilter");
const sortFilter = document.getElementById("sortFilter");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");

const eventsGrid = document.getElementById("eventsGrid");
const eventCards = [...document.querySelectorAll(".event-card")];
const eventCount = document.getElementById("eventCount");
const noResults = document.getElementById("noResults");

function filterAndSortEvents() {
    const category = categoryFilter.value;
    const location = locationFilter.value;
    const cost = costFilter.value;
    const type = typeFilter.value;
    const sortBy = sortFilter.value;

    let visibleEvents = eventCards.filter((eventCard) => {
        const matchesCategory =
            category === "all" || eventCard.dataset.category === category;

        const matchesLocation =
            location === "all" || eventCard.dataset.location === location;

        const matchesCost =
            cost === "all" || eventCard.dataset.cost === cost;

        const matchesType =
            type === "all" || eventCard.dataset.type === type;

        return matchesCategory && matchesLocation && matchesCost && matchesType;
    });

    visibleEvents.sort((firstEvent, secondEvent) => {
        if (sortBy === "popularity") {
            return Number(secondEvent.dataset.popularity) - Number(firstEvent.dataset.popularity);
        }

        return new Date(firstEvent.dataset.date) - new Date(secondEvent.dataset.date);
    });

    eventCards.forEach((eventCard) => {
        eventCard.style.display = "none";
    });

    visibleEvents.forEach((eventCard) => {
        eventCard.style.display = "flex";
        eventsGrid.appendChild(eventCard);
    });

    eventCount.textContent = `${visibleEvents.length} event${visibleEvents.length === 1 ? "" : "s"} found`;
    noResults.style.display = visibleEvents.length === 0 ? "block" : "none";
}

function clearFilters() {
    categoryFilter.value = "all";
    locationFilter.value = "all";
    costFilter.value = "all";
    typeFilter.value = "all";
    sortFilter.value = "date";

    filterAndSortEvents();
}

categoryFilter.addEventListener("change", filterAndSortEvents);
locationFilter.addEventListener("change", filterAndSortEvents);
costFilter.addEventListener("change", filterAndSortEvents);
typeFilter.addEventListener("change", filterAndSortEvents);
sortFilter.addEventListener("change", filterAndSortEvents);
clearFiltersBtn.addEventListener("click", clearFilters);