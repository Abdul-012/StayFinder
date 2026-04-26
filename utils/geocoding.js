const coordinateOverrides = {
    "malibu, united states": [-118.7798, 34.0259],
    "new york city, united states": [-74.006, 40.7128],
    "aspen, united states": [-106.8175, 39.1911],
    "florence, italy": [11.2558, 43.7696],
    "portland, united states": [-122.6765, 45.5152],
    "cancun, mexico": [-86.8515, 21.1619],
    "lake tahoe, united states": [-120.0324, 39.0968],
    "los angeles, united states": [-118.2437, 34.0522],
    "verbier, switzerland": [7.2286, 46.0961],
    "serengeti national park, tanzania": [34.8333, -2.3333],
    "amsterdam, netherlands": [4.9041, 52.3676],
    "fiji, fiji": [178.065, -17.7134],
    "cotswolds, united kingdom": [-1.8433, 51.833],
    "boston, united states": [-71.0589, 42.3601],
    "bali, indonesia": [115.1889, -8.4095],
    "banff, canada": [-115.5708, 51.1784],
    "miami, united states": [-80.1918, 25.7617],
    "phuket, thailand": [98.3381, 7.8804],
    "scottish highlands, united kingdom": [-4.2026, 57.12],
    "dubai, united arab emirates": [55.2708, 25.2048],
    "montana, united states": [-110.3626, 46.8797],
    "mykonos, greece": [25.3289, 37.4467],
    "costa rica, costa rica": [-84.0907, 9.9281],
    "charleston, united states": [-79.9311, 32.7765],
    "tokyo, japan": [139.6917, 35.6895],
    "new hampshire, united states": [-71.5724, 43.1939],
    "maldives, maldives": [73.2207, 3.2028],
};

const getLocationKey = (location, country) => {
    return `${location || ""}, ${country || ""}`.trim().toLowerCase();
};

module.exports.geocodeLocation = async (location, country) => {
    const key = getLocationKey(location, country);

    if (coordinateOverrides[key]) {
        return {
            type: "Point",
            coordinates: coordinateOverrides[key],
        };
    }

    const query = encodeURIComponent(`${location}, ${country}`);
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

    const response = await fetch(url, {
        headers: {
            "User-Agent": "StayFinder/1.0",
        },
    });
    const data = await response.json();

    if (!data.length) {
        return {
            type: "Point",
            coordinates: [0, 0],
        };
    }

    return {
        type: "Point",
        coordinates: [Number(data[0].lon), Number(data[0].lat)],
    };
};
