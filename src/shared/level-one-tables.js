export const enp1 = {
  name: "Encounter Prisoner Table 1",
  dice: "2d6",
  data: [
    {
      roll: [2],
      result:
        "Lying face down is a man. He is motionless so you cut the binds on his hands, but he turns and attacks. Face an INFERNAL MONK. <event:combat:INFERNAL MONK>",
    },
    {
      roll: [3],
      result:
        "A sickly man is chained to a wall. He begs to be released and you do so, but he is crazed and attacks. Face a LABOURER with no loot. <event:combat:LABOURER>",
    },
    {
      roll: [4],
      result:
        "A shackled prisoner, long dead, hangs from his arms high up on the wall as if a warning of what's to come.",
    },
    {
      roll: [5],
      result:
        "There is a cell here and inside a person chained up. You approach but see they are slumped forward and realize they are dead.",
    },
    {
      roll: [6],
      result:
        "Bars across a section of the room form a cell. Inside is a slumped body and they have been dead for a while.",
    },
    {
      roll: [7],
      result:
        "There is a bound priosner here. They look emaciated and are close to death. If you give them a ration they survive. Liberate 1 prisoner.",
    },
    {
      roll: [8],
      result:
        "Inside a cage here is a wounded man. If you have some material to bandage the injury, he survives and can escape. Liberate 1 prisoner.",
    },
    {
      roll: [9],
      result:
        "A bound woman lays in the dirt. She wakes and looks terrified, the door is locked (lock -2). Pick the lock and she escapes. Liberate 1 prisoner.",
    },
    {
      roll: [10],
      result:
        "Shackled to a wall a thin man pleads to be freed and you comply. He runs back the way you came. Liberate 1 prisoner.",
    },
    {
      roll: [11],
      result:
        "A man is shackled to the wall here. He pleads for help. You smash the chain and he thanks you and escapes. Liberate 1 prisoner.",
    },
    {
      roll: [12],
      result:
        "Two prisoners are trapped in the cell here. You grab the key from the far wall and free them. Liberate 2 prisoners.",
    },
  ],
};

export const ext1 = {
  name: "Exit Type Table 1",
  dice: "d66",
  data: [
    {
      roll: [1, 1],
      result: "Wooden Doors",
    },
    {
      roll: [1, 2],
      result: "Wooden Doors",
    },
    {
      roll: [1, 3],
      result: "Metal Doors",
    },
    {
      roll: [1, 4],
      result: "Archways",
    },
    {
      roll: [1, 5],
      result: "Reinforced Doors",
    },
    {
      roll: [1, 6],
      result: "Portcullises",
    },
    {
      roll: [2, 1],
      result: "Wooden Doors",
    },
    {
      roll: [2, 2],
      result: "Wooden Doors",
    },
    {
      roll: [2, 3],
      result: "Wooden Doors",
    },
    {
      roll: [2, 4],
      result: "Metal Doors",
    },
    {
      roll: [2, 5],
      result: "Archways",
    },
    {
      roll: [2, 6],
      result: "Curtains",
    },
    {
      roll: [3, 1],
      result: "Reinforced Doors",
    },
    {
      roll: [3, 2],
      result: "Wooden Doors",
    },
    {
      roll: [3, 3],
      result: "Wooden Doors",
    },
    {
      roll: [3, 4],
      result: "Wooden Doors",
    },
    {
      roll: [3, 5],
      result: "Metal Doors",
    },
    {
      roll: [3, 6],
      result: "Archways",
    },
    {
      roll: [4, 1],
      result: "Reinforced Doors",
    },
    {
      roll: [4, 2],
      result: "Curtains",
    },
    {
      roll: [4, 3],
      result: "Archways",
    },
    {
      roll: [4, 4],
      result: "Wooden Doors",
    },
    {
      roll: [4, 5],
      result: "Wooden Doors",
    },
    {
      roll: [4, 6],
      result: "Wooden Doors",
    },
    {
      roll: [5, 1],
      result: "Archways",
    },
    {
      roll: [5, 2],
      result: "Reinforced Doors",
    },
    {
      roll: [5, 3],
      result: "Wooden Doors",
    },
    {
      roll: [5, 4],
      result: "Archways",
    },
    {
      roll: [5, 5],
      result: "Wooden Doors",
    },
    {
      roll: [5, 6],
      result: "Wooden Doors",
    },
    {
      roll: [6, 1],
      result: "Metal Doors",
    },
    {
      roll: [6, 2],
      result: "Archways",
    },
    {
      roll: [6, 3],
      result: "Portcullises",
    },
    {
      roll: [6, 4],
      result: "Curtains",
    },
    {
      roll: [6, 5],
      result: "Archways",
    },
    {
      roll: [6, 6],
      result: "Wooden Doors",
    },
  ],
};

export const iaut1 = {
  name: "Interruptions and the Unexpected Table 1",
  dice: "d66",
  data: [
    {
      roll: [1, 1],
      result:
        "There is a lever beside the far exit. If you decide to pull it roll D6. 1 = Nothing happens. 2-3 = Any portcullises in the room open. 4-5 = All portcullises in adjoining rooms open. 6 = The lever snaps. If you have suitable items and can fix it with Inventive Usage, roll again.",
    },
    {
      roll: [1, 2],
      result:
        "At the back of the room is a recess and inside is a small shrine with a miniature statue of a god standing before an offering pan. Roll on #GOT1 to idenitfy the god. Only small items may be placed in the pan as offerings and when correctly applied gain 1 FP.",
    },
    {
      roll: [1, 3],
      result:
        "Tucked into a crack in the wall is a small piece of paper that reads, 'The guard Amis stole it' (Quest for Amis). If you fight a GUARD roll a D6. 1-3 = It's not him, 4-6 = It is Amis so you take extra care when searching his body if you win the fight, roll on #STIT1.",
    },
    {
      roll: [1, 4],
      result:
        "You cross the room but stgger as the floor falls away from beneath you. You grab for the ledge. Roll 2D6 and add your Precision. On a 7 or higher you grab hold and climb free. On a 6 or lower you fall in and lose 3 health points and then climb out.",
    },
    {
      roll: [1, 5],
      result:
        "There is a box set into the wall here with a makeshift panel door. It is closed and has a rough lock -3. It can be opened with Lock Picks, but not removed from its housing or smashed open. If opened gain 30 XP and roll on #CT1.",
    },
    {
      roll: [1, 6],
      result:
        "You begin rummaging through the room when suddenly in barges an unexpected visitor. Roll on #L1P and face the enemy. They were carrying something, roll on #BT1-2",
    },
    {
      roll: [2, 1],
      result:
        "Something that has caught your eye is a stone basin in the corner of the room. It is full of clear water. Above it is a symbol. Roll on #SST1. If you can place a related item to the symbol in the water it tranforms into a LQ random gem. Roll on #GMT1. One use only.",
    },
    {
      roll: [2, 2],
      result:
        "There is a crack in the wall here and inside is a rolled up piece of cloth. It is tricky to remove, so make a precision check %PC10(2) to avoid pushing it deeper. If successful, you unravel the cloth and find a Lock Pick +2 (4).",
    },
    {
      roll: [2, 3],
      result:
        "Without realising it you stand on a pressure plate in the middle of the room. If there are any portcullises here, they rise into the ceiling. Otherwise, the next portcullis you encounter is raised, as a distant sound rattles through the dungeon.",
    },
    {
      roll: [2, 4],
      result:
        "Hidden behind a screen at the back is a wooden shrine with a relief carving of a god. There is a slot below the image where a small offering can be placed. Roll on #GOT1 to identify the god and when one offering is correctly applied gain 1 FP.",
    },
    {
      roll: [2, 5],
      result:
        "Thrown into a corner is a rag. You hold it up and see the shadowy outline of a god traced on it and realise this is a holy shroud (Holy Shroud Quest). Roll on #GOT1 to identify the god. If you place this at a shrine or altar to that god you gain 2 FP for that god.",
    },
    {
      roll: [2, 6],
      result:
        "There is a narrow hole here and you put your hand in to take out a pendant. It has three hollow recesses that appear to have once held gems. You may place three gems in the pendant and roll on #GCT1. There may be risks involved.",
    },
    {
      roll: [3, 1],
      result:
        "There is a chest here which you notice has a trap mechanism. You can try to disarm it. Roll 2D6 and add your Precision. If you roll an 8 or higher you succeed and take no damage. On a 7 or lower a blade slices your hand. Lose 2 health points. Inside is a vial of ink and 4D6 + 20 SC.",
    },
    {
      roll: [3, 2],
      result:
        "There are some metal objects in a drawer here. One of them is half of an ornate broken item. Roll on #HAOIT1 (Ornate Item Quest). If you should find another half of the same item then triple its value, as it magically welds together when connected, and gain 30 XP.",
    },
    {
      roll: [3, 3],
      result:
        "You pull back a crate and find someone has carved out a concealed hollow in the wall. You need to work free two metal bars that prevent access to the hole. Make a Precision check %PC8(2) or you give up. If successful gain 20 XP and inside is a bag. Roll on #BT1.",
    },
    {
      roll: [3, 4],
      result:
        "On a ledge high up is a golden statue. You can climb for it. If so, you must remain focused. Roll 2D6 and add your Discipline. On a 9 or higher you reach and grab it. On an 8 or lower you fall and lose 1 HP. You can keep trying. The idol is worth 3D6 GC.",
    },
    {
      roll: [3, 5],
      result:
        "There is a dropped silver disc here worth 3D6 + 20 SC. It has three indentations where gems can be placed. If you have none now you may try later but if you do place three gems in these slots roll on #GCT1. There may be risks involved.",
    },
    {
      roll: [3, 6],
      result:
        "After a careful search you find a concealed door and behind it is a small altar to a god, an image of whom is carved on the wall. There is a slot for small items. Roll on #GOT1 to identify the god and when offerings are correctly applied gain 1 FP.",
    },
    {
      roll: [4, 1],
      result:
        "There is a lever on the wall here. If you pull it roll D6. 1-2 = A pit opens up beneath you and you fall in, lose 2 HP. 3-4 = A pit opens up in the next room and you avoid any enemies if any are found there. 5-6 = A compartment opens and reveals a box. Roll on #CT1.",
    },
    {
      roll: [4, 2],
      result:
        "Mounted on a wall is a large wooden relief showing a god. Roll on #GOT1 to identify the god. There are some hooks here on which to hang offerings. Only offerings that can be hung award 1 FP.",
    },
    {
      roll: [4, 3],
      result:
        "Hidden to one side is a body you recognise as a warden from your town. His blue arm band is gone. Add Warden Revenge Quest. If you encounter a GUARD roll D6. 1-3 = the GUARD wears a blue arm band and you swing into a rage +1 Shift. Once found, cross off quest and take the band.",
    },
    {
      roll: [4, 4],
      result:
        "You do not notice at first, but when you glance up you see a bag slung over a beam. It is out of reach, but if you have some way of pulling it down through Inventive Usage, then inside you find a couple of items. Roll on #POT2 and #SCT1.",
    },
    {
      roll: [4, 5],
      result:
        "There is an old rough stone, water filled basin set in the wall here. Above it is a symbol. Roll on #SST1. If you can place a related item in the water it transforms into a MQ random gem. Roll on #GMT1.",
    },
    {
      roll: [4, 6],
      result:
        "In the corner of the room there is a wooden panel showing a painting of a god. Roll on #GOT1 to identify it. Beneath the panel is a place where offerings can be left, and when applied correctly gain 1 FP.",
    },
    {
      roll: [5, 1],
      result:
        "You spot a stone in the wall that appears out of place. You take a closer look and find it is loose. Behind it is half a cheese wrapped in some cloth. Gain 1 ration. There is also a little dried meat.",
    },
    {
      roll: [5, 2],
      result:
        "There is a chalk board here that reads 'Krelas the Cleric is delivering the package today' (Krelas Quest). If you encounter a DARK CLERIC roll D6. 1-3 = The cleric is Krelas and if you defeat him, you find a package containing a piece of armour on his person. Roll on #ART2.",
    },
    {
      roll: [5, 3],
      result:
        "There are some crates in the corner of the room. One is carefully balanced and looks valuable. Make a Precision Check %PC9(2) or it tumbles and smashes its contents. If successful gain 20 XP and inside is a Potion of Resist Magic and a Potion of Speed.",
    },
    {
      roll: [5, 4],
      result:
        "A woman runs into the room and says, 'Help me, they have my father.' (Father Quest) You explain that it is better that you find him and she leaves. If you release a male prisoner roll D6. 1-3 = He is her father. Gain 10 GC when you calculate liberated prisoners.",
    },
    {
      roll: [5, 5],
      result:
        "There are several stacked backpacks here that look like raid spoils. As you approach you hold your nose as something is off and the place seems a mess. As if sensing your presence, a HUGE RAT jumps out of the pile and you must fight. Inside the pack there are 4D6 SC in an old pouch. <event:combat:HUGE RAT>",
    },
    {
      roll: [5, 6],
      result:
        "A box on the wall opens out to show an ornate carved bone shrine. Roll on #GOT1 to identify the god. There is a small ledge where you can place small offerings only. When correctly applied gain 1 FP.",
    },
    {
      roll: [6, 1],
      result:
        "You check a space behind a counter and accidentally stand on a pressure plate. A cloud of gas billows forth. Roll 2D6 and add your Precision. If the total is 7 or under then the cloud engulfs you and you lose 3 HP.",
    },
    {
      roll: [6, 2],
      result:
        "You must have been making too much noise for there is a shout and in bursts a foe. Roll on #L1P+1 and face the enemy. If you survive you find they were also carrying a bag. Roll on #BT1.",
    },
    {
      roll: [6, 3],
      result:
        "You notice beneath your feet a loose stonne and when you lift if you find a concealed compartment. It looks just big enough to house a potion in a glass bottle. The metal lid may become jammed though, make a precision check %PC8(1). If successful gain 30 XP and roll on #POT2.",
    },
    {
      roll: [6, 4],
      result:
        "Tucked to one side is a body. It has been looted apart from a slip of paper with a header that reads 'Contract' and below 'collect me 5 rats tails' (Rat Tails Quest). If you collect 5 rat tails you can return this to the exterminator back at the town and collect 5 GC.",
    },
    {
      roll: [6, 5],
      result:
        "There is a tall cabinet standing to one side. Its doors are thick and heavy and as you pull it open it tips over. Roll 2D6 and add your Discipline. If you roll over 7 you avoid the falling cabinet. Otherwise it bashes into you and you lose 2 HP.",
    },
    {
      roll: [6, 6],
      result:
        "There is a statue of a god in the corner of the room. Roll on #GOT1 to identify it. Beneath the god is a place where offerings can be left and when applied correctly gain 1 FP. There is also a small pouch and casket here. Both are empty.",
    },
  ],
};

export const l1a = {
  name: "Level 1 Animals",
  dice: "d6",
  data: [
    {
      roll: [1],
      result: "HUGE SPIDER <event:combat:HUGE SPIDER>",
    },
    {
      roll: [2],
      result: "HUGE RAT <event:combat:HUGE RAT>",
    },
    {
      roll: [3],
      result: "HUGE INFECTED RAT <event:combat:HUGE INFECTED RAT>",
    },
    {
      roll: [4],
      result: "WORK DOG <event:combat:WORK DOG>",
    },
    {
      roll: [5],
      result: "GUARD DOG <event:combat:GUARD DOG>",
    },
    {
      roll: [6],
      result: "SHARD ROCK PYTHON <event:combat:SHARD ROCK PYTHON>",
    },
  ],
};

export const l1ce = {
  name: "Level 1 Crate Encounters",
  dice: "d6",
  data: [
    {
      roll: [1],
      result:
        "A SLIMY GORGER drops from the ceiling, gaining advantage and attacks first. <event:combat:SLIMY GORGER>",
    },
    {
      roll: [2],
      result:
        "A LABOURER napping out of sight, wakes with a start and attacks. <event:combat:LABOURER>",
    },
    {
      roll: [3],
      result:
        "There's a hole in a crate and a HUGE RAT jumps out from inside and attacks. <event:combat:HUGE RAT>",
    },
    {
      roll: [4],
      result:
        "A crate topples over and you ready yourself, but on one is here and you find nothing.",
    },
    {
      roll: [5],
      result:
        "A vase has fallen out of a crate and smashed. Around it are some Ilios Petals.",
    },
    {
      roll: [6],
      result:
        "A leather bag has been hidden here behind a crate. Inside is a Potion of Healing.",
    },
  ],
};

export const l1d = {
  name: "Level 1 Dogs",
  dice: "d6",
  data: [
    {
      roll: [1],
      result: "WORK DOG <event:combat:WORK DOG>",
    },
    {
      roll: [2],
      result: "WORK DOG <event:combat:WORK DOG>",
    },
    {
      roll: [3],
      result: "GUARD DOG <event:combat:GUARD DOG>",
    },
    {
      roll: [4],
      result: "GUARD DOG <event:combat:GUARD DOG>",
    },
    {
      roll: [5],
      result: "WAR HOUND <event:combat:WAR HOUND>",
    },
    {
      roll: [6],
      result: "WAR HOUND and WORK DOG <event:combat:WAR HOUND:WORK DOG>",
    },
  ],
};

export const l1f = {
  name: "Level 1 Fungal",
  dice: "d6",
  data: [
    {
      roll: [1],
      result: "FUNGAL GEIST <event:combat:FUNGAL GEIST>",
    },
    {
      roll: [2],
      result: "FUNGAL GEIST <event:combat:FUNGAL GEIST>",
    },
    {
      roll: [3],
      result: "MUSTY BLOATER <event:combat:MUSTY BLOATER>",
    },
    {
      roll: [4],
      result: "MUSTY BLOATER <event:combat:MUSTY BLOATER>",
    },
    {
      roll: [5],
      result: "SLIMY GORGER <event:combat:SLIMY GORGER>",
    },
    {
      roll: [6],
      result: "SLIMY GORGER <event:combat:SLIMY GORGER>",
    },
  ],
};

export const l1g = {
  name: "Level 1 Guards",
  dice: "d6",
  data: [
    {
      roll: [1],
      result: "THUG <event:combat:THUG>",
    },
    {
      roll: [2],
      result: "THUG <event:combat:THUG>",
    },
    {
      roll: [3],
      result: "GUARD <event:combat:GUARD>",
    },
    {
      roll: [4],
      result: "GUARD <event:combat:GUARD>",
    },
    {
      roll: [5],
      result: "GUARD <event:combat:GUARD>",
    },
    {
      roll: [6],
      result: "GUARD and WARRIOR <event:combat:GUARD:WARRIOR>",
    },
  ],
};

export const l1m = {
  name: "Level 1 Martial",
  dice: "d6",
  data: [
    {
      roll: [1],
      result: "SCOUT <event:combat:SCOUT>",
    },
    {
      roll: [2],
      result: "GUARD <event:combat:GUARD>",
    },
    {
      roll: [3],
      result: "WARRIOR <event:combat:WARRIOR>",
    },
    {
      roll: [4],
      result: "WARRIOR <event:combat:WARRIOR>",
    },
    {
      roll: [5],
      result: "VETERAN <event:combat:VETERAN>",
    },
    {
      roll: [6],
      result: "VETERAN and GUARD <event:combat:VETERAN:GUARD>",
    },
  ],
};

export const l1p = {
  name: "Level 1 Patrols",
  dice: "d6",
  data: [
    {
      roll: [1],
      result: "LABOURER <event:combat:LABOURER>",
    },
    {
      roll: [2],
      result: "CRAZED PREACHER <event:combat:CRAZED PREACHER>",
    },
    {
      roll: [3],
      result: "GUARD <event:combat:GUARD>",
    },
    {
      roll: [4],
      result: "GUARD <event:combat:GUARD>",
    },
    {
      roll: [5],
      result: "GUARD <event:combat:GUARD>",
    },
    {
      roll: [6],
      result: "GUARD and GUARD DOG <event:combat:GUARD:GUARD DOG>",
    },
  ],
};

export const l1r = {
  name: "Level 1 Religious Enemy",
  dice: "d6",
  data: [
    {
      roll: [1],
      result: "CRAZED PREACHER <event:combat:CRAZED PREACHER>",
    },
    {
      roll: [2],
      result: "CULTIST <event:combat:CULTIST>",
    },
    {
      roll: [3],
      result: "CULTIST <event:combat:CULTIST>",
    },
    {
      roll: [4],
      result: "INFERNAL MONK <event:combat:INFERNAL MONK>",
    },
    {
      roll: [5],
      result: "DARK CLERIC <event:combat:DARK CLERIC>",
    },
    {
      roll: [6],
      result:
        "CULTIST and CRAZED PREACHER <event:combat:CULTIST:CRAZED PREACHER>",
    },
  ],
};

export const l1s = {
  name: "Level 1 Snakes",
  dice: "d6",
  data: [
    {
      roll: [1],
      result: "SCARLET COBRA <event:combat:SCARLET COBRA>",
    },
    {
      roll: [2],
      result: "SCARLET COBRA <event:combat:SCARLET COBRA>",
    },
    {
      roll: [3],
      result: "SHARD ROCK PYTHON <event:combat:SHARD ROCK PYTHON>",
    },
    {
      roll: [4],
      result: "SHARD ROCK PYTHON <event:combat:SHARD ROCK PYTHON>",
    },
    {
      roll: [5],
      result: "GIANT HORNED ANACONDA <event:combat:GIANT HORNED ANACONDA>",
    },
    {
      roll: [6],
      result: "GIANT HORNED ANACONDA <event:combat:GIANT HORNED ANACONDA>",
    },
  ],
};

export const l1w = {
  name: "Level 1 Warriors",
  dice: "d6",
  data: [
    {
      roll: [1],
      result: "THUG <event:combat:THUG>",
    },
    {
      roll: [2],
      result: "THUG <event:combat:THUG>",
    },
    {
      roll: [3],
      result: "JAILOR <event:combat:JAILOR>",
    },
    {
      roll: [4],
      result: "JAILOR <event:combat:JAILOR>",
    },
    {
      roll: [5],
      result: "JAILOR <event:combat:JAILOR>",
    },
    {
      roll: [6],
      result: "JAILOR and GUARD <event:combat:JAILOR:GUARD>",
    },
  ],
};

export const l1wo = {
  name: "Level 1 Workers",
  dice: "d6",
  data: [
    {
      roll: [1],
      result: "THUG <event:combat:THUG>",
    },
    {
      roll: [2],
      result: "LABOURER <event:combat:LABOURER>",
    },
    {
      roll: [3],
      result: "ARTISAN <event:combat:ARTISAN>",
    },
    {
      roll: [4],
      result: "MEDIC <event:combat:MEDIC>",
    },
    {
      roll: [5],
      result: "BLACKSMITH <event:combat:BLACKSMITH>",
    },
    {
      roll: [6],
      result: "ARTISAN and MEDIC <event:combat:ARTISAN:MEDIC>",
    },
  ],
};
