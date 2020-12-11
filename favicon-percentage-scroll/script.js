const faviconHref = (value) => {
    return `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 75 75 %22 fill=%22black%22><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2258%22>${value}</text></svg>`;
};

const changeFavicon = (favicon) => {
    if (typeof window === 'undefined') {
        return;
    }

    const link =
        window.document.querySelector("link[rel*='icon']") ||
        window.document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'shortcut icon';
    link.href = faviconHref(favicon);

    window.document.getElementsByTagName('head')[0].appendChild(link);
};

const setValue = (value) => {
    switch (value) {
        case 100:
            value = '✔';
            break;
        case 0:
            value = '✖';
            break;
    }
    changeFavicon(value);
};

const calculateScroll = () => {
    const parent = document.body.parentNode;
    let percentage =
        ((document.body.scrollTop || parent.scrollTop) /
            (parent.scrollHeight - parent.clientHeight)) *
        100;

    percentage = Math.round(percentage);

    setValue(percentage);
};

window.addEventListener('scroll', calculateScroll);

calculateScroll();
