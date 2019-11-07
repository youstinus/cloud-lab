const fetchUsername = async () => {
    try {
        let res = await fetch('/username');
        return await res.text();
    } catch (err) {
        console.error(err);
    }
};

const fetchUsernameHash = async (username) => {
    try {
        let res = await fetch('/' + username);
        return await res.text();
    } catch (err) {
        console.error(err);
    }
};

const updateHashInfo = async (username) => {
    let hash = await fetchUsernameHash(username);
    if (!hash) {
        hash = "---"
    }
    let elem = document.querySelector('#pod-hostname');
    if (elem.textContent !== hash) {
        elem.parentElement.classList.remove('bounceIn');
        elem.parentElement.classList.remove('animated');
        setTimeout(() => {
            elem.parentElement.classList.add('animated');
            elem.parentElement.classList.add('bounceIn');
            elem.textContent = hash;
        }, 20);
    }
};

const runProgress = (totalTime) => {
    let target = totalTime; // assume ms
    let incr = 15; //ms
    let current = 0;
    return setInterval(() => {
        current += incr;
        if (current > target) {
            current = 0;
        }
        let percentage = (current * 100) / target;
        document.querySelector('#bottom-bar').style.width = `${percentage}%`
    }, incr);
};


const loopFetch = async () => {
    let interval = 10 * 1000;
    let username = await fetchUsername();
    if (username) {
        document.querySelector('#github-username').textContent = username;
    }
    setInterval(() => {
        updateHashInfo(username);
    }, interval);
    runProgress(interval);
};

//updateHashInfo();
loopFetch();