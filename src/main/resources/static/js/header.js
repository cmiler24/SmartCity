async function loadHeader() {
    const header = document.getElementById("header");
    authModal = document.getElementById("authModal");

    if (!header) {
        return;
    }

    let authModalResponseText;
    try {
        const [headerResponse, authModalResponse] = await Promise.all([
            fetch("/components/header.html"),
            fetch("/components/auth-modal.html")
        ]);

        header.innerHTML = await headerResponse.text();
        authModalResponseText = await authModalResponse.text();

        if (!authModal) {
            document.body.insertAdjacentHTML("beforeend", authModalResponseText);
        } else {
            authModal.innerHTML = authModalResponseText;
        }

        updateWelcomeName();
        highlightCurrentPage();
    } catch (error) {
        console.error(error);
    }
}

function updateWelcomeName() {
    const welcomeName = document.getElementById("welcomeName");
    const savedUser = localStorage.getItem("smartCityUser");

    if (!welcomeName || !savedUser) {
        return;
    }

    const user = JSON.parse(savedUser);

    if (user.firstName) {
        welcomeName.textContent = user.firstName;
    }
}

function highlightCurrentPage() {
    const currentPage = document.body.dataset.page;
    const activeLink = document.querySelector(`[data-nav="${currentPage}"]`);

    if (activeLink) {
        activeLink.classList.add("active-link");
    }
}

document.addEventListener("DOMContentLoaded", loadHeader);

// document.getElementById("loginBtn").addEventListener("click", () => {
//     console.log('clicking')
//     openAuthModal();
// });