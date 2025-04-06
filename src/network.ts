const network: Navigation.Network = {
  places: {
    "Banal-Witchita": {
      coordinates: [-1890005, -1898735],
      methods: {
        street: {
          "UV-OP-1 Ekilorea Intersection": {
            distance: 1800,
            methodNames: ["UV-OP-1", "UV-VY"],
          },
          "UV-OP-1 UV-VY Intersection": {
            distance: 2700,
            methodNames: ["UV-OP-1", "UV-VY"],
          },
        },
        iceway: {
          Rotherhythe: { distance: 8500, methodNames: ["OPE Nord"] },
          Hounderia: { distance: 1000, methodNames: ["OPE Nord"] },
        },
        railway: {
          "Evergreen": {
            distance: 2800,
            methodNames: ["UltraStar Express 2"],
          },
          "Ekilorea": {
            distance: 1800,
            methodNames: ["UltraStar Express 1"],
          },
        },
      },
      type: "Town",
    },
    Borealis: {
      coordinates: [-2002925, -1995367],
      methods: {
        street: {
          "Southern Polaris": {
            distance: 500,
            methodNames: ["UV-NS-2", "UV-VY"],
          },
          "Sky Temple": {
            distance: 500,
            methodNames: ["UV-NS-2", "UV-VY"],
          },
          "Hephasdor Factory": {
            distance: 1300,
            methodNames: ["UV-NS-202"],
          },
          "Northern Borealis": {
            distance: 300,
            methodNames: ["Unlabeled Roadway"],
          },
        },
        iceway: {
          Publix: { distance: 100, methodNames: ["Spawn Purple Line"] },
          "Northwest Island": {
            distance: 450,
            methodNames: ["Spawn Purple Line"],
          },
        },
      },
      type: "District",
    },
    Ekilorea: {
      coordinates: [-1888320, -1899676],
      methods: {
        street: {
          "UV-OP-1 Ekilorea Intersection": {
            distance: 200,
            methodNames: ["Road to Ekilorea Island"],
          },
        },
        railway: {
          "Banal-Witchita": {
            distance: 1800,
            methodNames: ["UltraStar Express 1"],
          },
        },
      },
      type: "Town",
    },
    Evergreen: {
      coordinates: [-1890899, -1896049],
      methods: {
        railway: {
          Outpost: {
            distance: 1600,
            methodNames: ["UltraStar 1"],
          },
          "Banal-Witchita": {
            distance: 2800,
            methodNames: ["UltraStar Express 1"],
          },
        },

        street: {
          "UV-OP-201 UV-OP-2 Intersection": {
            distance: 1500,
            methodNames: ["UV-OP-201"],
          },
          "UV-OP-1 UV-VY Intersection": {
            distance: 1000,
            methodNames: ["UV-OP-1"],
          },
          Outpost: { distance: 1300, methodNames: ["UV-OP-1"] },
        },
        iceway: {
          Stonehelm: { distance: 2400, methodNames: ["OPE Nord"] },
          Hounderia: { distance: 1700, methodNames: ["OPE Nord"] },
        },
      },
      type: "Town",
    },
    Hounderia: {
      coordinates: [-1889736, -1898044],
      methods: {
        iceway: {
          Evergreen: { distance: 1700, methodNames: ["OPE Nord"] },
          "Banal-Witchita": { distance: 1000, methodNames: ["OPE Nord"] },
        },
      },
      type: "Town",
    },
    Illyria: {
      coordinates: [-1894664, -1894940],
      methods: {
        street: {
          "La Cueva": { distance: 200, methodNames: ["UV-OP-2"] },
        },
				railway: {
					"Pagasa City": {distance: 2000, methodNames: ["UltraStar 2"]}
				}
      },
      type: "Town",
    },
    "La Cueva": {
      coordinates: [-1894664, -1894940],
      methods: {
        street: {
          "UV-OP-203 UV-OP-2 Intersection": {
            distance: 1500,
            methodNames: ["UV-OP-2"],
          },
          Illyria: { distance: 200, methodNames: ["UV-OP-2"] },
        },
        iceway: {
          Outpost: { distance: 3800, methodNames: ["OPE Ouest"] },
        },
      },
      type: "Town",
    },
    Malus: {
      coordinates: [-1891248, -1890524],
      methods: {
        railway: {
          Outpost: { distance: 5000, methodNames: ["UltraStar 4"] },
        },
      },
      type: "Town",
    },
    Mercy: {
      coordinates: [-526, 155],
      methods: {
        street: {
          "Old Spawn": { distance: 1200, methodNames: ["UV-OS-1"] },
        },
      },
      type: "Town",
    },
    "New Spawn": {
      coordinates: [-2002407, -1995444],
      methods: {
        street: {
          "Eastern Polaris": { distance: 200, methodNames: ["UV-NS-204"] },
          "Southern Polaris": {
            distance: 500,
            methodNames: ["UV-NS-1", "UV-NS-2", "UV-VY"],
          },
          "Southern Spawn Border": {
            distance: 320,
            methodNames: ["UV-NS-1", "UV-NS-2", "UV-VY"],
          },
        },
        iceway: {
          Borealis: { distance: 500, methodNames: ["Spawn Purple Line"] },
          Birchgrove: {
            distance: 500,
            methodNames: ["Spawn Orange Line"],
          },
        },
      },
      type: "Hub",
    },
    "Old Spawn": {
      coordinates: [-1335, -22],
      methods: {
        street: { Mercy: { distance: 1200, methodNames: ["UV-OS-1"] } },
      },
      type: "Hub",
    },
    Outpost: {
      coordinates: [-1890764, -1894658],
      methods: {
        railway: {
          "Seacrestica": {
            distance: 2000,
            methodNames: ["UltraStar 1"],
          },
          "Evergreen": {
            distance: 1600,
            methodNames: ["UltraStar 2"],
          },
          "Malus": {
            distance: 5000,
            methodNames: ["UltraStar 3"],
          },
        },

        street: {
          "UV-OP-201 UV-OP-2 Intersection": {
            distance: 1200,
            methodNames: ["UV-OP-2"],
          },
          Evergreen: { distance: 1300, methodNames: ["UV-OP-1"] },
          Stonehelm: {
            distance: 800,
            methodNames: ["UV-OP-1", "UV-OP-2"],
          },
        },
        iceway: {
          "La Cueva": { distance: 3800, methodNames: ["OPE Ouest"] },
          Stonehelm: { distance: 880, methodNames: ["OPE Nord"] },
        },
      },
      type: "Hub",
    },
    "Pagasa City": {
      coordinates: [-1893320, -1894596],
      methods: {
        street: {
          "UV-OP-203 UV-OP-2 Intersection": {
            distance: 350,
            methodNames: ["UV-OP-203"],
          },
        },
        railway: {
          Seacrestica: { distance: 2100, methodNames: ["UltraStar 2"] },
          Illyria: { distance: 2000, methodNames: ["UltraStar 1"] },
        },
				iceway: {
          "La Cueva": { distance: 2000, methodNames: ["OPE Quest"] },
				}
      },
      type: "Town",
    },
    Rotherhythe: {
      coordinates: [-1887536, -1905476],
      methods: {
        street: {
          "UV-OP-1 Ekilorea Intersection": {
            distance: 6000,
            methodNames: ["UV-OP-1", "UV-VY"],
          },
          Steambolt: {
            distance: 7000,
            methodNames: ["UV-OP-1", "UV-VY"],
          },
        },
        iceway: {
          "Banal-Witchita": { distance: 8500, methodNames: ["OPE Nord"] },
          Steambolt: { distance: 8500, methodNames: ["OPE Nord"] },
        },
      },
      type: "Town",
    },
    Seacrestica: {
      coordinates: [-1891664, -1893972],
      methods: {
        railway: {
          Outpost: { distance: 2000, methodNames: ["UltraStar 2"] },
          "Pagasa City": { distance: 2100, methodNames: ["UltraStar 1"] },
        },
      },
      type: "Town",
    },
    "Sky Temple": {
      coordinates: [-2002407, -1995444],
      methods: {
        street: {
          "Northern Borealis": {
            distance: 550,
            methodNames: ["UV-NS-204"],
          },
          Borealis: { distance: 560, methodNames: ["UV-NS-2", "UV-VY"] },
        },
        iceway: {
          "Northwest Island": {
            distance: 200,
            methodNames: ["Spawn Purple Line"],
          },
        },
      },
      type: "Town",
    },
    Steambolt: {
      coordinates: [-1890008, -1911524],
      methods: {
        street: {
          Rotherhythe: {
            distance: 7000,
            methodNames: ["UV-OP-1", "UV-VY"],
          },
        },
        iceway: {
          Rotherhythe: { distance: 8500, methodNames: ["OPE Nord"] },
        },
      },
      type: "Town",
    },
    Stonehelm: {
      coordinates: [-1890016, -1894716],
      methods: {
        street: {
          Outpost: { distance: 800, methodNames: ["UV-OP-1", "UV-OP-2"] },
        },
        iceway: {
          Outpost: { distance: 880, methodNames: ["OPE Nord"] },
          Evergreen: { distance: 2400, methodNames: ["OPE Nord"] },
        },
      },
      type: "Town",
    },
    "Central Polaris": {
      coordinates: [-1894664, -1894940],
      methods: {
        street: {
          "Northern Polaris": { distance: 300, methodNames: ["UV-NS-1"] },
          "Southern Polaris": { distance: 150, methodNames: ["UV-NS-1"] },
          "Eastern Polaris": { distance: 150, methodNames: ["UV-NS-204"] },
          "Northern Borealis": {
            distance: 150,
            methodNames: ["UV-NS-204"],
          },
        },
      },
      type: "Town",
    },
    "Southern Polaris": {
      coordinates: [-1894664, -1894940],
      methods: {
        street: {
          "New Spawn": {
            distance: 500,
            methodNames: ["UV-NS-1", "UV-NS-2", "UV-VY"],
          },
          "Central Borealis": {
            distance: 500,
            methodNames: ["UV-NS-2", "UV-VY"],
          },
          "Central Polaris": { distance: 150, methodNames: ["UV-NS-1"] },
        },
      },
      type: "Town",
    },
    "Hephasdor Factory": {
      coordinates: [-1894664, -1894940],
      methods: { street: {} },
      type: "Town",
    },
    "Northwest Island": {
      coordinates: [-1894664, -1894940],
      methods: {
        iceway: {
          "Sky Temple": {
            distance: 200,
            methodNames: ["Spawn Purple Line"],
          },
          Borealis: { distance: 450, methodNames: ["Spawn Purple Line"] },
        },
      },
      type: "Town",
    },
    "UV-OP-1 UV-VY Intersection": {
      coordinates: [-1893230, -1895039],
      methods: {
        street: {
          Evergreen: { distance: 1000, methodNames: ["UV-OP-1"] },
          "Banal-Witchita": {
            distance: 2700,
            methodNames: ["UV-OP-1", "UV-VY"],
          },
        },
      },
      type: "Separate station / Crossing",
    },
    "UV-OP-1 Ekilorea Intersection": {
      coordinates: [-1893230, -1895039],
      methods: {
        street: {
          "Banal-Witchita": {
            distance: 1800,
            methodNames: ["UV-OP-1", "UV-VY"],
          },
          Ekilorea: {
            distance: 200,
            methodNames: ["Road to Ekilorea Island"],
          },
          Rotherhythe: {
            distance: 6000,
            methodNames: ["UV-OP-1", "UV-VY"],
          },
        },
      },
      type: "Separate station / Crossing",
    },
    "UV-OP-201 UV-OP-2 Intersection": {
      coordinates: [-1891962, -1895207],
      methods: {
        street: {
          "UV-OP-203 UV-OP-2 Intersection": {
            distance: 1300,
            methodNames: ["UV-OP-2"],
          },
          Evergreen: { distance: 1500, methodNames: ["UV-OP-201"] },
          Outpost: { distance: 1200, methodNames: ["UV-OP-2"] },
        },
      },
      type: "Separate station / Crossing",
    },
    "UV-OP-203 UV-OP-2 Intersection": {
      coordinates: [-1893230, -1895039],
      methods: {
        street: {
          "UV-OP-201 UV-OP-2 Intersection": {
            distance: 1300,
            methodNames: ["UV-OP-2"],
          },
          "La Cueva": { distance: 1500, methodNames: ["UV-OP-2"] },
          "Pagasa City": { distance: 350, methodNames: ["UV-OP-203"] },
        },
      },
      type: "Separate station / Crossing",
    },
  },
  operators: {
    "UV-OP-1": "UVDOT Outpost Division",
    "UV-OP-2": "UVDOT Outpost Division",
    "UV-OP-201": "UVDOT Outpost Division",
    "UV-OP-203": "UVDOT Outpost Division",
    "UV-NS-1": "UVDOT New Spawn Division",
    "UV-NS-2": "UVDOT New Spawn Division",
    "UV-NS-202": "UVDOT New Spawn Division",
    "UV-NS-204": "UVDOT New Spawn Division",
    "UV-OS-1": "UVDOT Old Spawn Division",
    "UV-VY": "UVDOT",
    "Road to Ekilorea Island": "Town of Ekilorea",
    "Unlabeled Roadway": "Unknown",
    "UltraStar 1": "Seacrestica Transports Outpost",
    "UltraStar 2": "Seacrestica Transports Outpost",
    "UltraStar 3": "Seacrestica Transports Outpost",
    "UltraStar 4": "Seacrestica Transports Outpost",
    "UltraStar Express 1": "Seacrestica Transports Outpost",
    "UltraStar Express 2": "Seacrestica Transports Outpost",
    "OPE Ouest": "OPC",
    "OPE Est": "OPC",
    "OPE Sud": "OPC",
    "OPE Nord": "OPC",
    "Spawn Red Line": "Unknown",
    "Spawn Yellow Line": "Unknown",
    "Spawn Aqua Line": "Unknown",
    "Spawn Purple Line": "Unknown",
    "Spawn Green Line": "Unknown",
    "Spawn Orange Line": "Unknown",
    "Spawn Pink Line": "Unknown",
    "Spawn Blue Line": "Unknown",
    "Spawn Gold Line": "Unknown",
    "Spawn Silver Line": "USUV, Unknown",
    "Outpost Warp": "Server Staff",
    "New Spawn Warp": "Server Staff",
    "Old Spawn Warp": "Server Staff",
    "Olympics Warp": "Server Staff",
  },
  warps: ["Outpost", "New Spawn", "Old Spawn"],
  sameMethods: [
    ["UltraStar 1", "UltraStar 2"],
    ["UltraStar 3", "UltraStar 4"],
    ["UltraStar Express 1", "UltraStar Express 2"],
    ["OPE Nord"],
    ["UV-OP-1"],
    ["UV-OP-2"],
    ["UV-VY"],
  ],
};
export default network;
