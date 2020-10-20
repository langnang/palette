export const list = () => {
    return [
        {
            "id": 1,
            "name": "Black",
            "type": "single",
            "colors": [
                "#000000"
            ]
        },
        {
            "id": 2,
            "name": "Telegram",
            "type": "gradient",
            "colors": [
                "#1c92d2",
                "#f2fcfe"
            ]
        },
        {
            "id": 3,
            "name": "七原色",
            "type": "multi",
            "colors": [
                "#FF0000",
                "#FF7F00",
                "#FFFF00",
                "#00FF00",
                "#00FFFF",
                "#0000FF",
                "#8B00FF"
            ]
        }
    ];
}

export const item = (id = null) => {
    return {
        "id": id,
        "name": "",
        "type": "single",// single,gradient,multi,
        "colors": [""]
    };
}