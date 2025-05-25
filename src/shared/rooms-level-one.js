export const smallRooms = [
  {
    roll: 2,
    name: "Emtpy Space",
    description: "There is nothing in this small space.",
    unique: false,
  },
  {
    roll: 3,
    name: "Strange Text",
    description:
      "This narrow room connects the corridors and has no furniture. On the wall though is some illegible text.",
    unique: false,
  },
  {
    roll: 4,
    name: "Grakada Mural",
    description:
      "There is a large mural of Grakada here. Her old face smiles at you. If you call for her favour here -2 to the roll. There is no space to make offerings.",
    unique: true,
  },
  {
    roll: 5,
    name: "Intuneric Mosaic",
    description:
      "There is a large mosaic of Intuneric here, a swirling black visage. If you call for his favour here -2 to the roll. There is no space to make offerings.",
    unique: true,
  },
  {
    roll: 6,
    name: "Maduva Statue",
    description:
      "There is a rough statue of Maduva here. Its form is twisted sinew. If you call for its favour here -2 to the roll. There is no space to make offerings.",
    unique: true,
  },
  {
    roll: 7,
    name: "Murataynie Effigy",
    description:
      "There is a grisly effigy of Murataynie here. It smells of rotting flesh. If you call for its favour here -2 to the roll. There is no space to make offerings.",
    unique: true,
  },
  {
    roll: 8,
    name: "Nevazator Doll",
    description:
      "There is a rope doll of Nevazator hanging here, limp and symbolic. If you call for his favour here -2 to the roll. There is no space to make offerings.",
    unique: true,
  },
  {
    roll: 9,
    name: "Radacina Tapestry",
    description:
      "There is a beautiful tapestry of Radacina here, high out of reach. If you call for her favour here -2 to the roll. There is no space to make offerings.",
    unique: true,
  },
  {
    roll: 10,
    name: "Heated Space",
    description:
      "There is a small burner here that is lit. The space is warm, flickering shadows cast across the space. If you dry yourself roll on #L1P. There is nothing else in the room.",
    unique: false,
  },
  {
    roll: 11,
    name: "Wall Shrine",
    description:
      "In the wall is a small shrine at which you can make an offering, as it has a ledge to place items. It is dedicated to a god, roll on #GOT1. Gain 1FP if applied correctly.",
    unique: false,
  },
  {
    roll: 12,
    name: "Banner Arms",
    description:
      "On the wall are two crossed spears and a shield. You take a closer look and see they are for display only and useless. There are some cord and metal strips though.",
    unique: true,
  },
];

export const largeRooms = [
  {
    roll: 2,
    name: "Stone Workshop",
    description:
      "This large space has rough walls and piles of stone laying everywhere. There are the remains of a large stone statue that has been smashed. There is no one here.",
    exits: "wooden doors",
    unique: false,
  },
  {
    roll: 3,
    name: "Marble Hall",
    description:
      "There are evenly spaced pillars running along this large marble lined hall, with a round central burner and a metal grill. If you have some wood, you could start a fire.",
    exits: "archways",
    unique: true,
  },
  {
    roll: 4,
    name: "Old Mess Hall",
    description:
      "This room was once a mess hall. Some benches and tables are pushed to one side. Other chairs are stacked around the edges of the room. Roll on #IAUT1.",
    exits: "wooden doors",
    unique: true,
  },
  {
    roll: 5,
    name: "Penitentiary",
    description:
      "The northeast corner is being used to hold captives. There are whips and knives on a table. The floor is covered in bloodied straw. Fight a JAILOR and then roll on #ENP1. <event:combat:JAILOR>",
    exits: "reinforced doors",
    unique: true,
  },
  {
    roll: 6,
    name: "Fountain Room",
    description:
      "In the centre is an ornate fountain bubbling with clear water. It is dedicated to a god and carved in their form. Roll on #GOT1. You can make an offering for 1 FP.",
    exits: "archways",
    unique: false,
  },
  {
    roll: 7,
    name: "Temple",
    description:
      "Dark murals line the walls. Empty pews form two lines, chandeliers loaded with lit candles hang above. Behind a pulpit stands a figure who attacks. Roll on #L1R-1.",
    exits: "archways",
    unique: true,
  },
  {
    roll: 8,
    name: "Sparring Chamber",
    description:
      "This is a training room, where there is a circle of sand in which a WARRIOR and a SCOUT are sparring. They turn and attack. If you survive roll on #BT1+2.",
    exits: "wooden doors",
    unique: false,
  },
  {
    roll: 9,
    name: "Crate Store",
    description:
      "This space is used for storage and crates scatter the space, creating hidden spaces. There is a noise so roll on #L1CE, then on #MIT2, #CT1-2 and #BT2-1.",
    exits: "archways",
    unique: false,
  },
  {
    roll: 10,
    name: "Slate Shrine",
    description:
      "A large slate monolith stands in the centre. Hanging from it is a gold amulet worth 2D6 GC and it has 4 slots. If you have 4 gems you may roll on #GCT1.",
    exits: "archways",
    unique: true,
  },
  {
    roll: 11,
    name: "Dormitory",
    description:
      "Lining the walls are bunks and you count enough for twelve men, but most are empty. But, two are occupied. Roll on #L1W-1 and #L1WO-1. They attack. After, roll on #CT2.",
    exits: "wooden doors",
    unique: true,
  },
  {
    roll: 12,
    name: "Library",
    description:
      "Lined with bookshelves, this huge library is protected by two GUARDS. There are also tables covered in scrolls. If you survive roll on #SCT1 and #SCT2.",
    exits: "wooden doors",
    unique: true,
  },
];

export const regularRooms = [
  {
    roll: [1, 1],
    name: "Empty Space",
    description:
      "This room is bare and seems to have been cleared out or forgotten about.",
    encounter: "The room is quiet. You hear nothing.",
    exits: "archways",
    unique: false,
  },
  {
    roll: [1, 2],
    name: "Abandoned Guard Post",
    description:
      "There is a dusty table here upon which sits a dry tankard and an empty wooden bowl.",
    encounter:
      "Beneath the table is a pile of rubbish. Roll on table #RUPT1-1.",
    exits: "wooden doors",
    unique: false,
  },
  {
    roll: [1, 3],
    name: "Guard Post",
    description:
      "A small burner provides warmth for two chairs around a low table. It is lit and casts shadows.",
    encounter:
      "There is someone here. Roll on #L1G. If you survive roll on table #IAUT1.",
    exits: "reinforced doors",
    unique: false,
  },
  {
    roll: [1, 4],
    name: "Mason's Workshop",
    description:
      "Large blocks of stone scatter the space. Iron tools and an old hammer lay around.",
    encounter:
      "Roll a D6. 1-4 an ARTISAN is here. You must fight them. If you survive roll on #TCT1. <event:combat:ARTISAN>",
    exits: "random",
    unique: true,
  },
  {
    roll: [1, 5],
    name: "Storage Area",
    description:
      "Crates are piled high, creating hidden spaces. Sacks and baskets lean to one side.",
    encounter:
      "Roll a D6. 1-3 a random patrol comes by, roll on #L1G-1. If you survive roll on #TCT1-1.",
    exits: "archways",
    unique: false,
  },
  {
    roll: [1, 6],
    name: "Meeting Room",
    description:
      "Three simple chairs are tucked in around a makeshift wooden table.",
    encounter:
      "Two people stand as you enter. Roll on #L1M-1 and #L1R-1. If you survive roll on #CT1.",
    exits: "wooden doors",
    unique: true,
  },
  {
    roll: [2, 1],
    name: "Blacksmiths",
    description:
      "There is an anvil on a block, a glowing furnace and walls lined with worn tools.",
    encounter:
      "There is someone here. You must fight the BLACKSMITH. If you survive roll on #MIT1. <event:combat:BLACKSMITH>",
    exits: "wooden doors",
    unique: true,
  },
  {
    roll: [2, 2],
    name: "Scuffed Up Space",
    description:
      "There is a pile of rubbish here and the floor is covered in scuff marks.",
    encounter:
      "You can check the rubbish pile. Roll on table #RUPT1 and then on #IAUT1.",
    exits: "archways",
    unique: false,
  },
  {
    roll: [2, 3],
    name: "Holding Cell",
    description:
      "An iron barred cell where prisoners are kept is in one corner, a broken chain on the floor.",
    encounter:
      "Roll a D6. 1-4 the JAILOR is here. You must fight them. If you survive roll on #ENP1. <event:combat:JAILOR>",
    exits: "reinforced doors",
    unique: false,
  },
  {
    roll: [2, 4],
    name: "Wash Room",
    description:
      "There are basins set in worktops here and buckets of soapy water. It is damp here.",
    encounter:
      "Roll a D6. 1-3 a fungal creature emerges. Roll on #L1F. If you survive roll on #TAT1.",
    exits: "random",
    unique: true,
  },
  {
    roll: [2, 5],
    name: "Fire Pit Room",
    description:
      "A large fire pit in the centre of the room is full of glowing embers and ash.",
    encounter:
      "There's a MERCHANT sitting on a stool by the pit. They stand and attack. If you survive roll on #CT1. <event:combat:MERCHANT>",
    exits: "random",
    unique: true,
  },
  {
    roll: [2, 6],
    name: "Kennel",
    description:
      "Kennels line one wall and the floor is littered with bones, water bowls and straw.",
    encounter:
      "A GUARD handler stands and releases a dog. Roll on #L1D and then face the GUARD after.",
    exits: "wooden doors",
    unique: true,
  },
  {
    roll: [3, 1],
    name: "Snake Pit",
    description:
      "A dusty bowl set into the floor is home to an angry looking snake. It rises up towards you.",
    encounter:
      "To open the chest in the pit you must face a snake, roll on #L1S. If you survive roll on #CT2-2.",
    exits: "random",
    unique: true,
  },
  {
    roll: [3, 2],
    name: "Weapon Dump",
    description:
      "Some crates and barrels hold a range of broken and busted weapons.",
    encounter:
      "You begin to search the space. First roll on #IAUT1 and then on #MIT2.",
    exits: "wooden doors",
    unique: true,
  },
  {
    roll: [3, 3],
    name: "Shackle Room",
    description:
      "Shackles and chains hang from the stone walls, and a cage stands in one corner.",
    encounter:
      "A form moves from the darkness. Roll on table #L1WO. If you survive roll on #ENP1.",
    exits: "reinforced doors",
    unique: false,
  },
  {
    roll: [3, 4],
    name: "Prayer Room",
    description:
      "To one side is a wall mounted symbol above a small altar and cushion.",
    encounter: "Roll a D6. 1-4 roll on #L1R. If you survive roll on #RATT1.",
    exits: "curtains",
    unique: true,
  },
  {
    roll: [3, 5],
    name: "Empty Space",
    description:
      "This room has been left empty, the floor swept clean and the walls washed.",
    encounter: "The space is silent. There is nobody here.",
    exits: "archways",
    unique: false,
  },
  {
    roll: [3, 6],
    name: "Indoor Camp",
    description:
      "In a corner two chairs are placed at a burner. The room is warm. On a shelf is a ball of twine.",
    encounter:
      "Someone is sitting by the burner. They attack. Roll on #L1W-1. If you survive roll on #IAUT1.",
    exits: "wooden doors",
    unique: false,
  },
  {
    roll: [4, 1],
    name: "Small Shrine",
    description:
      "This room is bare apart from a small stone shrine set into the wall.",
    encounter:
      "Roll on #GOT1 to identify the shrine's god. When offerings are correctly applied gain 1 FP.",
    exits: "random",
    unique: false,
  },
  {
    roll: [4, 2],
    name: "Abandoned Guard Post",
    description:
      "There is a dusty table here upon which sits a dry pewter tankard and an empty bowl.",
    encounter: "There is something on the rough table. Roll on table #TAT1.",
    exits: "wooden doors",
    unique: false,
  },
  {
    roll: [4, 3],
    name: "Pool Room",
    description:
      "The only feature in this room is a large, tiled bathing pool set into the floor.",
    encounter:
      "In the pool is a chest. If you jump in for it you acquire the soaked status. Roll on #CT1.",
    exits: "wooden doors",
    unique: true,
  },
  {
    roll: [4, 4],
    name: "Barracks",
    description:
      "You see two rows of bunks and some hammocks. There are people here talking.",
    encounter:
      "Roll on #L1M-1 twice. If you survive the fight roll on #TCT1 as you find a tea chest in the corner.",
    exits: "wooden doors",
    unique: false,
  },
  {
    roll: [4, 5],
    name: "Storage Area",
    description:
      "Empty boxes and tea chests fill this space. There are also sacks and bags.",
    encounter:
      "Roll a D6. 1-4 a random patrol comes by, roll on #L1P-1. If you survive roll on #BT1.",
    exits: "archways",
    unique: false,
  },
  {
    roll: [4, 6],
    name: "Canteen",
    description:
      "Three rough tables, a few chairs and stools stand next to a wooden bar.",
    encounter:
      "The barman yells and attacks (use LABOURER stats). Also face a patron. Roll on #L1W-1. <event:combat:LABOURER>",
    exits: "wooden doors",
    unique: true,
  },
  {
    roll: [5, 1],
    name: "Morgue",
    description:
      "A stone chamber has been added here. The floor is bloody. Inside lays a corpse on a slab.",
    encounter:
      "There is an ARTISAN here who you must fight. If you survive you find some herbs. Roll on #HST1. <event:combat:ARTISAN>",
    exits: "wooden doors",
    unique: true,
  },
  {
    roll: [5, 2],
    name: "Sleeping Quarters",
    description:
      "Behind two curtains, one on each side, are neat wooden framed beds.",
    encounter:
      "Someone jumps up. Roll on #L1R. You see a religious carving atop a cupboard. Roll on #RATT1.",
    exits: "random",
    unique: false,
  },
  {
    roll: [5, 3],
    name: "Holding Cell",
    description:
      "Part of this room has been sectioned off with wooden bars to create a cell.",
    encounter:
      "Roll a D6. 1-4 there is a prisoner here. Roll on #ENP1. After roll on #IAUT1.",
    exits: "reinforced doors",
    unique: false,
  },
  {
    roll: [5, 4],
    name: "Training Room",
    description:
      "There is a bashed up mannequin and a pole covered in cut marks here.",
    encounter:
      "A WARRIOR is practicing here, slashing at the pole. You must fight them. AFter roll on #IAUT1. <event:combat:WARRIOR>",
    exits: "random",
    unique: true,
  },
  {
    roll: [5, 5],
    name: "Abattoir",
    description:
      "Two large carcasses of unidentifiable animals hang from the ceiling to one side.",
    encounter:
      "A butcher works away at one, turns and attacks, cleaver raised (use ARTISAN stats). <event:combat:ARTISAN>",
    exits: "wooden doors",
    unique: true,
  },
  {
    roll: [5, 6],
    name: "Dump",
    description:
      "This space has been used to dump rubbish and stone, piles of which fill two corners.",
    encounter:
      "You can rummage through the rubbish. Roll on #RUPT1 and then on #IAUT1.",
    exits: "archways",
    unique: false,
  },
  {
    roll: [6, 1],
    name: "Apothecary",
    description:
      "A table is covered in jars and bottles. Scrolls full of script are tacked to the walls.",
    encounter:
      "You must face the APOTHECARY. If you survive search the table. Roll on #POT1 and #POT2. <event:combat:APOTHECARY>",
    exits: "random",
    unique: true,
  },
  {
    roll: [6, 2],
    name: "Damp Space",
    description:
      "There is a leak dripping down from above so the space is abandoned and wet.",
    encounter:
      "Fight a fungal creature living here. Roll a D6. 1-3 MUSTY BLOATER, 4-6 FUNGAL GEIST.",
    exits: "wooden doors",
    unique: false,
  },
  {
    roll: [6, 3],
    name: "Jail",
    description:
      "There are some metal bars set into the stone floor forming two dirty prison cells.",
    encounter:
      "A JAILOR jumps up. You must face them. If you survive roll on #ENP1-2. <event:combat:JAILOR>",
    exits: "reinforced doors",
    unique: false,
  },
  {
    roll: [6, 4],
    name: "Chapel",
    description:
      "Set high on some shelves are burning candles above a large wooden statue.",
    encounter:
      "A DARK CLERIC stands and attacks. After you can make an offering to Maduva for 1 FP. <event:combat:DARK CLERIC>",
    exits: "curtains",
    unique: true,
  },
  {
    roll: [6, 5],
    name: "Empty Space",
    description: "This cold stone space is bare and seems to have no function.",
    encounter: "There is nobody here or anything of interest.",
    exits: "archways",
    unique: false,
  },
  {
    roll: [6, 6],
    name: "Stove Room",
    description:
      "To one side is a hot stove, some chairs, and a large, muddy hemp rug and a clay tankard.",
    encounter:
      "2 seated people jump up and attack. Roll on #L1G-1 and #L1M-1. After roll on #TCT1+2.",
    exits: "wooden doors",
    unique: false,
  },
];
