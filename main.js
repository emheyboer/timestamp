function update() {
    const now = Math.floor(new Date() / 1000);
    timestamp.innerHTML = now.toLocaleString().replaceAll(/([^0-9])/g, '$1<wbr/>');
    
    const url = new URL(location);
    const milestone = Number(url.searchParams.get('milestone')) || Math.ceil(now / 1e8) * 1e8;

    countdown.innerText = timeToMilestone(now, milestone);
}

function timeToMilestone(now, milestone) {
    const periods = [
        [365*24*60*60, 'year'],
        [24*60*60, 'day'],
        [60*60, 'hour'],
        [60, 'minute'],
        [1, 'second']
    ];

    let delta = milestone - now;
    let deltaString = '';
    for (let i = 0; i < periods.length; i++) {
        let count = Math.floor(delta / periods[i][0])
        if (count) {
            if (deltaString.length) {
                deltaString += ' ';
            }

            deltaString += `${count} ${periods[i][1]}`;
            if (count > 1) {
                deltaString += 's'
            }

            delta -= periods[i][0] * count;
        }
    }

    deltaString += ' until ' + Math.floor(milestone).toLocaleString();
    return deltaString;
}

update()
window.setInterval(update, 1000)