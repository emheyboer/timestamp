function update() {
    var now = new Date();
    var secs = Math.floor(now / 1000);
    timestamp.innerText = secs.toLocaleString();
    
    countdown.innerText = timeToMilestone(now);
}

function timeToMilestone(now, milestone) {
    if (!milestone) {
    milestone = Math.ceil(now / 1e11) * 1e11;
    }

    var periods = [
    [365*24*60*60*1000, 'year'],
    [24*60*60*1000, 'day'],
    [60*60*1000, 'hour'],
    [60*1000, 'minute'],
    [1000, 'second']
    ];

    var delta = milestone - now;
    var deltaString = '';
    for (let i = 0; i < periods.length; i++) {
    var count = Math.floor(delta / periods[i][0])
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

    deltaString += ' until ' + Math.floor(milestone / 1000).toLocaleString();
    return deltaString;
}

update()
window.setInterval(update, 1000)