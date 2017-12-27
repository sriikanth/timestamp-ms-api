'use strict';

module.exports = function(app) {

    app.get('/:query', function(req, res) {
        var date = req.params.query;
        var unix = null;
        var natural = null;

        // Check for initial unix time
        if (+date >= 0) {
            unix = +date;
            natural = unixToNat(unix);
        }

        // Check for initial natural time
        if (isNaN(+date)) {
            var temp = parseDate(date);
            unix = natToUnix(temp[0], months.indexOf(temp[1]), temp[2]);
            natural = date;
        }

        var dateObj = { "unix": unix, "natural": natural };
        res.send(dateObj);

    });

    function natToUnix(year,month,date) {
        // Conver from natural date to unix timestamp
        return (new Date(year,month,date).getTime() / 1000);
    }

    function unixToNat(unix) {
        // Convert unix timestamp to natural date
        var date = new Date(unix*1000);
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }

    function parseDate(d){
        var temp = d.split(",");

        var y = temp[1];
        var m = temp[0].split(" ")[0];
        var dt = temp[0].split(" ")[1];

        return [y,m,dt];
    }

    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

};
