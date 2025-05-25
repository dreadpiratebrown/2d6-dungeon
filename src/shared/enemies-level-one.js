export const enemiesl1 = [
  {
    name: "APOTHECARY",
    hp: 12,
    xp: 35,
    shift: 1,
    treasure: "Roll on #POT1",
    interrupts: [
      {
        name: "Blinding Smoke",
        primary: [1, 4],
        secondary: [],
        modifier: -2,
      },
      {
        name: "Glowing Shield",
        primary: [],
        secondary: [2],
        modifier: -2,
      },
    ],
    maneuvers: [
      {
        name: "FIRE BOMB",
        dice: [4, 5],
        damage: "d6-2",
      },
      {
        name: "GAS CLOUD",
        dice: [1, 5],
        damage: "d6-2",
        special: "You may not attack next turn",
      },
    ],
    mishap:
      "One of the vials smashes at your feet but nothing happens. You gain an extra attack.",
    prime:
      "They retrive a larger bottle and throw it. Flames burst up around you. Lose D6 HP.",
  },
  {
    name: "ARTISAN",
    hp: 3,
    xp: 5,
    shift: 1,
    treasure: "Roll on #PT1-2 + 2D6 SC",
    interrupts: [
      {
        name: "Deflect",
        primary: [],
        secondary: [1],
        modifier: -2,
      },
      {
        name: "Distract",
        primary: [],
        secondary: [6],
        modifier: -1,
      },
    ],
    maneuvers: [
      {
        name: "JAB",
        dice: [5, 4],
        damage: "d6-3",
      },
    ],
    mishap:
      "They grab up a length of wood, but it is brittle and crumbles in their hand. Gain an extra attack.",
    prime:
      "The artisan pulls a handful of nails from a pocket and throws them in your face. Take 2 damage.",
  },
  {
    name: "BLACKSMITH",
    hp: 6,
    xp: 9,
    shift: 1,
    treasure: "Roll on #MIT1 and #PT1",
    interrupts: [
      {
        name: "Crossed Arms",
        primary: [],
        secondary: [3, 6],
        modifier: -2,
      },
    ],
    maneuvers: [
      {
        name: "HAMMER BLOW",
        dice: [4, 3],
        damage: "d6-1",
      },
    ],
    mishap:
      "As the blacksmith attacks they catch their happer in their apron. You kick out and cause D3 damage.",
    prime:
      "The blacksmith pulls out a large hook and throws it at you. It catches your arm. Lose D3 HP.",
  },
  {
    name: "CRAZED PREACHER",
    hp: 4,
    xp: 5,
    shift: 1,
    treasure: "Roll on #RPT1",
    interrupts: [
      {
        name: "Bible Block",
        primary: [4],
        secondary: [],
        modifier: -2,
      },
    ],
    maneuvers: [
      {
        name: "WILD SCRATCH",
        dice: [4, 3],
        damage: "d6-3",
      },
    ],
    mishap:
      "The wild preacher becomes caught up in their robes and misses a round of combat.",
    prime:
      "They jump forward and somehow latch on to you and are able to perform WILD SCRATCH twice.",
  },
  {
    name: "CULTIST",
    hp: 5,
    xp: 6,
    shift: 1,
    treasure: "Roll on #RPT1",
    interrupts: [
      {
        name: "Robe Swoop",
        primary: [],
        secondary: [4],
        modifier: -1,
      },
    ],
    maneuvers: [
      {
        name: "PUNCH",
        dice: [5, 4],
        damage: "d6-2",
      },
    ],
    mishap:
      "The Cultist pulls a dagger and throws it but it falls at your feet. You throw it back for 2 damage.",
    prime:
      "They pull a long chain and fling it at you and it wraps around your arm causing 1 damage.",
  },
  {
    name: "DARK CLERIC",
    hp: 12,
    xp: 28,
    shift: 1,
    treasure: "Roll on #RPT2 + 10 GC",
    interrupts: [
      {
        name: "Dark Magic Haze",
        primary: [],
        secondary: [1, 2, 3],
        modifier: 0,
        special:
          "The DARK CLERIC heals 1 point of damage if injured and gains 1 point if not.",
      },
    ],
    maneuvers: [
      {
        name: "NECROTIC PROD",
        dice: [3, 2],
        damage: "d6-1",
      },
      {
        name: "STAFF BASH",
        dice: [4, 3],
        damage: "d6-2",
      },
    ],
    mishap:
      "The cleric swings his staff but it misses and slips from their hands. Gain 1 extra attack.",
    prime:
      "The air turns cold as the cleric raises their staff. You feel a chill run through you. Lose 2 HP.",
  },
  {
    name: "FUNGAL GEIST",
    hp: 5,
    xp: 6,
    shift: 1,
    treasure: "D3 Geist Mushrooms",
    interrupts: [
      {
        name: "Rubbery Hide",
        primary: [],
        secondary: [4],
        modifier: -2,
      },
    ],
    maneuvers: [
      {
        name: "MYCELIUM LASH",
        dice: [3, 3],
        damage: "d6-3",
      },
    ],
    mishap:
      "The geist attempts a volley of kicks all of which fall short allowing you to prod it hard causing 2 damage.",
    prime:
      "The geist raises its cap revealing narrow gills from which it fires a series of darts. Lose D3 HP.",
  },
  {
    name: "GIANT HORNED ANACONDA",
    hp: 15,
    xp: 30,
    shift: 1,
    treasure: "None",
    interrupts: [
      {
        name: "Scale Block",
        primary: [],
        secondary: [2, 5],
        modifier: -2,
      },
    ],
    maneuvers: [
      {
        name: "SMOTHER",
        dice: [5, 3],
        damage: "d6-2",
        special: "miss next round (once per combat)",
      },
      {
        name: "HORN JAB",
        dice: [2, 3],
        damage: "d6-2",
      },
    ],
    mishap:
      "The snake snaps back and tries to bash you with its head, but instead smashes the wall for D3 damage.",
    prime:
      "The snake rises high on its tail and sweeps down performing a successful HORN JAB.",
  },
  {
    name: "GUARD",
    hp: 7,
    xp: 13,
    shift: 1,
    treasure: "Roll on #PT1-1",
    interrupts: [
      {
        name: "Shield Block",
        primary: [],
        secondary: [3, 5],
        modifier: -1,
      },
    ],
    maneuvers: [
      {
        name: "STAB",
        dice: [5, 3],
        damage: "d6-3",
      },
      {
        name: "SWIPE",
        dice: [6, 2],
        damage: "d6-2",
      },
    ],
    mishap:
      "The guard lunges carelessly, opens his side and you elbow them hard causing 1 damage.",
    prime:
      "With an unexpected move the guard disarms you. Lose 1 turn as you grab it back up off the ground.",
  },
  {
    name: "GUARD DOG",
    hp: 6,
    xp: 8,
    shift: 1,
    treasure: "None",
    interrupts: [
      {
        name: "Body Barge",
        primary: [],
        secondary: [4],
        modifier: -2,
      },
    ],
    maneuvers: [
      {
        name: "BITE",
        dice: [4, 3],
        damage: "d6-2",
      },
    ],
    mishap:
      "The dog skids as it lunges and you are able to get in an extra attack with +1 damage.",
    prime:
      "The dog thrusts forward and clamps its jaws around your arm causing D3 damage.",
  },
  {
    name: "HUGE INFECTED RAT",
    hp: 5,
    xp: 9,
    shift: 1,
    treasure: "None",
    interrupts: [
      {
        name: "Pounce",
        primary: [],
        secondary: [1, 6],
        modifier: -1,
      },
    ],
    maneuvers: [
      {
        name: "INFECTED BITE",
        dice: [4, 3],
        damage: "d6-3",
        special: "Next two turns lose 1 HP",
      },
      {
        name: "SLASH",
        dice: [2, 3],
        damage: "d6-2",
      },
    ],
    mishap:
      "The creature is sickly and seems to cough and spits blood causing it D3 damage.",
    prime:
      "The rat evades your defence and scurries up your leg and bites your neck using INFECTED BITE.",
  },
  {
    name: "HUGE RAT",
    hp: 3,
    xp: 2,
    shift: 1,
    treasure: "A rat tail without becoming bloodied",
    interrupts: [],
    maneuvers: [
      {
        name: "BITE",
        dice: [2, 5],
        damage: "d6-4",
      },
    ],
    mishap:
      "The rat attacks but sliips and rollson its back. You bring down your boot and crush its head, killing it.",
    prime:
      "The rat pounces and lands on your face. It bites you before you brush it off. Lose 1 HP.",
  },
  {
    name: "HUGE SPIDER",
    hp: 2,
    xp: 2,
    shift: 1,
    treasure: "None",
    interrupts: [],
    maneuvers: [
      {
        name: "FANG PUNCTURE",
        dice: [5, 4],
        damage: "d6-3",
      },
    ],
    mishap:
      "The spider falls as its web breaks and you spin and slice it in two, killing it instantly.",
    prime:
      "The spider jumps, spins a web, and pings onto your back where it sinks in its fangs. Lose 1 HP.",
  },
  {
    name: "INFERNAL MONK",
    hp: 6,
    xp: 15,
    shift: 1,
    treasure: "Roll on #RPT1+1",
    interrupts: [
      {
        name: "Heat Wave",
        primary: [2, 5],
        secondary: [],
        modifier: -1,
      },
    ],
    maneuvers: [
      {
        name: "MACE BASH",
        dice: [3, 3],
        damage: "d6-2",
      },
      {
        name: "FIRE WHIP",
        dice: [2, 6],
        damage: "d6-1",
      },
    ],
    mishap:
      "Their whip lashes the air and flings back in their face causing them 2 damage.",
    prime:
      "A second fire whip appears on their other hand and together they strike you. Lose 3 HP.",
  },
  {
    name: "JAILOR",
    hp: 6,
    xp: 10,
    shift: 1,
    treasure: "Roll on #PT1+1",
    interrupts: [
      {
        name: "Barge",
        primary: [],
        secondary: [2],
        modifier: -2,
      },
    ],
    maneuvers: [
      {
        name: "SHARP KICK",
        dice: [5, 1],
        damage: "d6-2",
      },
      {
        name: "PUNCH",
        dice: [3, 3],
        damage: "d6-3",
      },
    ],
    mishap:
      "The jailor swings but appears tired and falls back on their haunches giving you an extra attack.",
    prime:
      "With a whip of their fist the chain shoots out and lashes your knuckles. Lose 1 HP if not wearing gloves.",
  },
  {
    name: "LABOURER",
    hp: 4,
    xp: 5,
    shift: 1,
    treasure: "Roll on #PT1-2",
    interrupts: [
      {
        name: "Shove",
        primary: [2],
        secondary: [],
        modifier: -2,
      },
    ],
    maneuvers: [
      {
        name: "UPPERCUT",
        dice: [2, 5],
        damage: "d6-3",
      },
    ],
    mishap:
      "The labourer flays wildly and loses their balance. You quickly counter gaining an extra attack.",
    prime:
      "The labourer barrels past your defence swinging wildly and a punch lands. Take 1 damage.",
  },
  {
    name: "MEDIC",
    hp: 4,
    xp: 5,
    shift: 1,
    treasure: "Roll on #PT1-2 + Malako leaves",
    interrupts: [
      {
        name: "Nimble Move",
        primary: [3, 4],
        secondary: [],
        modifier: -1,
      },
    ],
    maneuvers: [
      {
        name: "STAB",
        dice: [3, 3],
        damage: "d6-2",
      },
    ],
    mishap:
      "There must be blood on the medic's shoes for they lose their footing and fall. Gain 1 extra attack.",
    prime:
      "The medic whips the apron free, throws it over your head and stabs you causing 2 damage.",
  },
  {
    name: "MERCHANT",
    hp: 5,
    xp: 6,
    shift: 1,
    treasure: "A wallet with D6 GC and D6 SC",
    interrupts: [
      {
        name: "Divert Blow",
        primary: [2, 5],
        secondary: [],
        modifier: -1,
      },
    ],
    maneuvers: [
      {
        name: "QUICK SLASH",
        dice: [1, 3],
        damage: "d6-2",
      },
    ],
    mishap:
      "They try a flurry of complex swings, trip and slash their own leg. They take one damage.",
    prime:
      "The merchant throws a potion at you that explodes. It causes D3 damage.",
  },
  {
    name: "MUSTY BLOATER",
    hp: 9,
    xp: 12,
    shift: 1,
    treasure: "D6 spores",
    interrupts: [
      {
        name: "Blinding Spore Cloud",
        primary: [3, 4, 5],
        secondary: [],
        modifier: -1,
      },
    ],
    maneuvers: [
      {
        name: "SPORE SPRAY",
        dice: [5, 3],
        damage: "d6-2",
      },
    ],
    mishap:
      "The creature seems to lose some of its swell and shrinks for a moment. It misses a round of combat.",
    prime:
      "Suddenly the Bloater swells, the pressure shooting out a shower of spores. Lose D3 HP.",
  },
  {
    name: "SCARLET COBRA",
    hp: 3,
    xp: 6,
    shift: 1,
    treasure: "None",
    interrupts: [
      {
        name: "Darts Aside",
        primary: [2, 3],
        secondary: [],
        modifier: -1,
      },
    ],
    maneuvers: [
      {
        name: "BITE",
        dice: [2, 3],
        damage: "d6-3",
        special: "Poisoned - lose 1 HP per round for 2 rounds",
      },
    ],
    mishap:
      "The snake shoots out its head in an attempted bite, but misses and you're able to slash it for D3 damage.",
    prime:
      "The cobra corners coils and whips forward past your defence successfully biting you, see BITE attack.",
  },
  {
    name: "SCOUT",
    hp: 5,
    xp: 9,
    shift: 1,
    treasure: "Roll on #PT1",
    interrupts: [
      {
        name: "Swift Jump",
        primary: [1, 6],
        secondary: [],
        modifier: -2,
      },
    ],
    maneuvers: [
      {
        name: "JAB",
        dice: [5, 3],
        damage: "d6-3",
      },
      {
        name: "QUICK CHARGE",
        dice: [6, 2],
        damage: "d6-2",
      },
    ],
    mishap:
      "The scout tries to grab your weapon but instead twists their wrist and takes 1 damage.",
    prime:
      "The scout leaps back, pulls out a short bow and looses and arrow. Take D3 damage.",
  },
  {
    name: "SHARD ROCK PYTHON",
    hp: 10,
    xp: 18,
    shift: 1,
    treasure: "None",
    interrupts: [
      {
        name: "Deflect",
        primary: [1],
        secondary: [],
        modifier: -2,
      },
    ],
    maneuvers: [
      {
        name: "STRANGLE",
        dice: [4, 3],
        damage: "d6-1",
        special: "When you attack next round you do one less damage.",
      },
    ],
    mishap:
      "The snake's slow attack allows you to bash it on the head as it tries to move in closes causing D6 damage.",
    prime:
      "The python corners you, wraps its bulk around your leg causing you to lose D6 HP.",
  },
  {
    name: "SLIMY GORGER",
    hp: 10,
    xp: 16,
    shift: 1,
    treasure: "Sticky glue like substance (need container)",
    interrupts: [
      {
        name: "Gelatinous Body",
        primary: [],
        secondary: [2, 6],
        modifier: -2,
      },
    ],
    maneuvers: [
      {
        name: "STICKY SUCTION",
        dice: [4, 3],
        damage: "d6-1",
        special: "You may not use one random piece of armour this turn.",
      },
    ],
    mishap:
      "The slime rises, but cannot take an attacking form and misses a round of combat.",
    prime:
      "The slime billows out into a wide sheet of green that engulfs you. You struggle free but lose 2 HP.",
  },
  {
    name: "THUG",
    hp: 3,
    xp: 6,
    shift: 1,
    treasure: "None",
    interrupts: [
      {
        name: "Forearm Block",
        primary: [],
        secondary: [4],
        modifier: -1,
      },
    ],
    maneuvers: [
      {
        name: "PUNCH",
        dice: [3, 2],
        damage: "d6-3",
      },
    ],
    mishap:
      "The thug tries a combo of swing and uppercut but misses and topples over. Gain 1 extra attack.",
    prime:
      "The thug manages to grip you and eyes wide they headbutt you hard, take D3 damage.",
  },
  {
    name: "VETERAN",
    hp: 10,
    xp: 30,
    shift: 1,
    treasure: "Roll on #PT1+1 and an extra D6 GC",
    interrupts: [
      {
        name: "Parry",
        primary: [3, 4],
        secondary: [],
        modifier: -2,
      },
      {
        name: "Armour Deflection",
        primary: [],
        secondary: [5, 6],
        modifier: -1,
      },
    ],
    maneuvers: [
      {
        name: "CRUSHING BLOW",
        dice: [6, 3],
        damage: "d6-1",
      },
      {
        name: "THRUST",
        dice: [3, 2],
        damage: "d6-3",
      },
    ],
    mishap:
      "The old veteran stumbles and falls. Gain 2 extra hits as he tries to rise.",
    prime:
      "Out of nowhere the veteran twists and performs a successful CRUSHING BLOW.",
  },
  {
    name: "WAR HOUND",
    hp: 10,
    xp: 25,
    shift: 1,
    treasure: "A spiked collar",
    interrupts: [
      {
        name: "Raised Legs",
        primary: [5, 6],
        secondary: [],
        modifier: -2,
      },
    ],
    maneuvers: [
      {
        name: "BITE",
        dice: [6, 2],
        damage: "d6-1",
      },
      {
        name: "SPIKE CHARGE",
        dice: [4, 3],
        damage: "d6-2",
      },
    ],
    mishap:
      "The dog seems keen on simply barking in an attempt to scare you and misses the next round.",
    prime:
      "The dog barrels into you dragging its spiked collar down your thigh causing D6 damage.",
  },
  {
    name: "WARRIOR",
    hp: 9,
    xp: 22,
    shift: 1,
    treasure: "Roll on #PT1",
    interrupts: [
      {
        name: "Bracer Block",
        primary: [4],
        secondary: [],
        modifier: -1,
      },
      {
        name: "Dodge",
        primary: [],
        secondary: [3],
        modifier: -1,
      },
    ],
    maneuvers: [
      {
        name: "FLURRY",
        dice: [4, 3],
        damage: "d6-3",
      },
      {
        name: "SLASH",
        dice: [1, 2],
        damage: "d6-2",
      },
    ],
    mishap:
      "The warrior swings but loses his balance and you kick them hard in the ribs causing D3 damage.",
    prime:
      "The warrior pulls a small dagger from his boot and flicks it at you. It glances off your cheek. Lose 1 HP.",
  },
  {
    name: "WORK DOG",
    hp: 4,
    xp: 4,
    shift: 1,
    treasure: "None",
    interrupts: [
      {
        name: "Side Swipe",
        primary: [],
        secondary: [2],
        modifier: -2,
      },
    ],
    maneuvers: [
      {
        name: "BITE",
        dice: [4, 3],
        damage: "d6-3",
      },
    ],
    mishap:
      "The dog flinches and slips as it comes forward afraid of your attack. It hits the wall taking 1 damage.",
    prime:
      "The dog wrestles through your defence and slashes you with a paw. Lose 1 HP.",
  },
];
