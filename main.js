function getByText(selector, text) {
    return Array.from(
        document.querySelectorAll(selector)
    ).find(div => div.textContent.includes(text));
}

function getByInnerText(selector, text) {
    return Array.from(
        document.querySelectorAll(selector)
    ).find(div => div.innerText.includes(text));
}

function replace() {
    // get pawified
    const getVerified = getByInnerText("div[data-testid='UserName'] > div.css-175oi2r", "Get verified")
    if (getVerified) {
        getVerified.innerHTML = getVerified.innerHTML.replace("Get verified", "Get pawified")
    }

    const headerReplacements = {
        "Home": "Pawm",
        "Explore": "Pawsplore",
        "Notifications": "Pawifications",
        "Messages": "Pawssages",
        "Lists": "Pawlists",
        "Bookmarks": "Pawmarks",
        "Jobs": "Pawjobs",
        "Communities": "Pawomunities",
        "Premium": "Pawmium",
        "Verified Orgs": "Verified Paworgs",
        "Profile": "Pawfile",
        "Post": "Pawst",

        "Grok": "Pawk",
    }

    const dropdownReplacements = {
        "Create your Space": "Create your Pawspace",
        "Monetization": "Pawjobization",
        "Ads": "Pawds",
        "Settings and privacy": "Pawtings and pawvacy",
    }

    // headerReplacements
    for (
        const [originalText, newText] of Object.entries(headerReplacements)
    ) {
        // https://stackoverflow.com/a/38399344/26767691
        const headerElement = document.querySelector(`header > * a[aria-label*='${originalText}' i]`)
        if (headerElement) {
            const textElement = headerElement.querySelector("div > div[dir=ltr]:not([aria-label]) > span")
            if (textElement) {
                textElement.innerHTML = newText
            }
        }
    }
    
    // dropdownReplacements
    for (
        const [originalText, newText] of Object.entries(dropdownReplacements)
    ) {
        const dropdownElement = getByText("div[data-testid='Dropdown'] > div > div > a", originalText)
        if (dropdownElement) {
            const textElement = dropdownElement.querySelector("div > div[dir=ltr]:not([aria-label]) > span")
            if (textElement) {
                textElement.innerHTML = newText
            }
        }
    }
}

let previousHTML = document.querySelector('body').innerHTML

function checkForChanges() {
    const currentHTML = document.querySelector('body').innerHTML

    if (currentHTML !== previousHTML) {
        replace()
        previousHTML = currentHTML
    }
}

setInterval(checkForChanges, 100)