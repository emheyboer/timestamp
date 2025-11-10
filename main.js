function update() {
    const now = Math.floor(new Date() / 1000);
    timestamp.innerText = now.toLocaleString();
    
    countdown.innerText = timeToMilestone(now);
}

function timeToMilestone(now, milestone) {
    if (!milestone) {
        milestone = Math.ceil(now / 1e8) * 1e8;
    }

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