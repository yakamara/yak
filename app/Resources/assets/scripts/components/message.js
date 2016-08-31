import toastr from 'toastr';

export function info(message) {
    toastr.info(message);
}

export function success(message) {
    toastr.success(message);
}

export function warning(message) {
    toastr.warning(message);
}

export function error(message) {
    toastr.error(message);
}

export function message(type, message) {
    toastr[type](message);
}

export function handleMessages(flashes) {
    for (let key in flashes) {
        if (key === 'length' || !flashes.hasOwnProperty(key)) {
            continue;
        }

        for (var i in flashes[key]) {
            message(key, flashes[key][i]);
        }
    }
}

function handleMainResponse() {
    const cookie = getCookie();

    if (!cookie) {
        return;
    }
    const flashes = JSON.parse(decodeURIComponent(cookie.replace(/\+/g, ' ')));

    handleMessages(flashes);

    document.cookie = "flashes=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function getCookie() {
    var name = "flashes=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) {
            return c.substring(name.length,c.length);
        }
    }

    return false;
}

handleMainResponse();
