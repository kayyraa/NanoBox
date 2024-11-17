export const Elements = [
    {
        Name: "WATR",
        Type: "Liquid",
        Color: "rgb(75, 75, 200)",
        Molten: "Gas",
        Temp: 22,
        Melt: 100
    },
    {
        Name: "LAVA",
        Type: "Liquid",
        Color: "rgb(255, 0, 0)",
        Molten: "Liquid",
        Cold: "Solid",
        Temp: 1600,
        Melt: 1600
    },
    {
        Name: "MGMA",
        Type: "Solid",
        Color: "rgb(255, 150, 50)",
        Molten: "Liquid",
        Cold: "Solid",
        Temp: 1200,
        Melt: 1200
    },
    {
        Name: "STNE",
        Type: "Powder",
        Color: "rgb(220, 220, 220)",
        Molten: "Liquid",
        Cold: "Powder",
        Temp: 22,
        Melt: 400,

        Physics: {
            Density: 2.4,
            Elasticity: 0.2
        }
    },
    {
        Name: "URAN",
        Type: "Radioactive, Powder",
        Color: "rgb(112, 112, 32)",
        Temp: 2200,
        Pres: 5,
        Melt: 600
    },
    {
        Name: "NEUT",
        Type: "Radioactive, Light",
        Color: "rgb(0, 200, 255)",
    },
    {
        Name: "NONE",
        Type: "None",
        Color: "rgb(255, 0, 0)"
    }
];

export const Types = [
    [
        "Liquid",
        "../images/Liquid.svg"
    ],
    [
        "Solid",
        "../images/Solid.svg"
    ],
    [
        "Powder",
        "../images/Powder.svg"
    ],
    [
        "Gas",
        "../images/Gas.svg"
    ],
    [
        "Radioactive",
        "../images/Radioactive.svg"
    ],
    [
        "None",
        "../images/None.svg"
    ],
];