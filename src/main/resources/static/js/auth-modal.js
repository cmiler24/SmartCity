function loginBtnClick() {
    if (document.getElementById("login").innerText === "Login") {
        openAuthModal();
    } else {
        localStorage.clear();
        alert("You have been logged out.");
        window.location.reload();
    }
}

function openAuthModal() {
    const authModal = document.getElementById("authModal");

    if (!authModal) {
        return;
    }

    authModal.classList.add("is-open");
    authModal.setAttribute("aria-hidden", "false");
    setAuthTab(tabName);
}

function closeAuthModal() {
    const authModal = document.getElementById("authModal");

    if (!authModal) {
        return;
    }

    authModal.classList.remove("is-open");
    authModal.setAttribute("aria-hidden", "true");
}

function setAuthTab(tabName) {
    const loginPanel = document.getElementById("loginPanel");
    const signupPanel = document.getElementById("signupPanel");
    const tabButtons = document.querySelectorAll(".auth-tab");

    if (!loginPanel || !signupPanel) {
        return;
    }

    const isLogin = tabName === "login";

    loginPanel.hidden = !isLogin;
    signupPanel.hidden = isLogin;

    tabButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.authTab === tabName);
    });
}

function toggleTestAccounts() {
    const testAccountsContent = document.getElementById("testAccountsContent");
    const testAccountsToggle = document.getElementById("testAccountsToggle");
    const toggleCaret = document.getElementById("toggleCaret");

    if (!testAccountsContent || !testAccountsToggle || !toggleCaret) {
        return;
    }

    const isHidden = testAccountsContent.hidden;
    testAccountsContent.hidden = !isHidden;
    testAccountsToggle.setAttribute("aria-expanded", isHidden);
    toggleCaret.style.transform = isHidden ? "rotate(0deg)" : "rotate(180deg)";
}

document.addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-open-auth]");
    const closeButton = event.target.closest("[data-close-auth]");
    const tabButton = event.target.closest("[data-auth-tab]");
    const testAccountsToggle = event.target.closest("#testAccountsToggle");

    if (openButton) {
        openAuthModal(openButton.dataset.openAuth);
    }

    if (closeButton) {
        closeAuthModal();
    }

    if (tabButton) {
        setAuthTab(tabButton.dataset.authTab);
    }

    if (testAccountsToggle) {
        toggleTestAccounts();
    }

    if (event.target.id === "authModal") {
        closeAuthModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeAuthModal();
    }
});

document.addEventListener("submit", async (event) => {
    if (event.target.id === "signupForm") {
        event.preventDefault();

        const firstName = document.getElementById("signupFirstName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // send the signup data to your server for processing.
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: firstName,
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (!data) {
                alert("Could not create account. Please try again later");
                return;
            } else {
                // set currentUser in local storage
                localStorage.setItem("currentUser", JSON.stringify(data));
                alert("User account successfully created.");
            }

            closeAuthModal();
            event.target.reset();
            window.location.reload();
        } catch (error) {
            console.error("Error during signup:", error);
            alert("The server could not be reached");
        }
    }

    if (event.target.id === "loginForm") {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (!data.success) {
                alert("Incorrect username or password. Please try again later");
                return;
            } else {
                localStorage.setItem("currentUser", JSON.stringify(data));
                alert("User logged in successfully.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("The server could not be reached: " + error);
        }

        closeAuthModal();
        event.target.reset();
        window.location.reload();
    }
});