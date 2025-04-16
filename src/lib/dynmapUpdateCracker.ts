export async function getUpdate(): Promise<DynmapPing> {
  const time = Date.now();
  const res = await fetch(
    "https://ultravanilla.world/up-binary/world/world/" + time,
  );
  if (!res.ok) throw new Error("Could not fetch dynmap binary world");

  const bin = new Uint8Array(await res.arrayBuffer());
  const dictionary = await getDictionary(Math.floor(time / 604800) * 604800);
  return decode(bin, dictionary);
}

export async function getUpdateByProxy(): Promise<DynmapPing> {
  const res = await fetch("/api/update");
  return res.json();
}

const MSB = 0x80;
const REST = 0x7f;
const MATH_POW_4 = Math.pow(2, 4 * 7);
const MATH_POW_5 = Math.pow(2, 5 * 7);
const MATH_POW_6 = Math.pow(2, 6 * 7);
const MATH_POW_7 = Math.pow(2, 7 * 7);
const TEXT_DECODER = new TextDecoder();

enum DynmapUpdateType {
  tile,
  chat,
  playerjoin,
  playerquit,
  daynight,
  component,
}

enum DynmapPingBitfield {
  HasStorm = 0b00000001,
  IsThundering = 0b00000010,
}

interface HasCoords {
  x: number;
  y: number;
  z: number;
}

interface DynmapUpdateBase {
  type: keyof typeof DynmapUpdateType;
  timestamp: number;
}

interface DynmapUpdateTile extends DynmapUpdateBase {
  type: "tile";
  name: string;
}

interface DynmapUpdateChat extends DynmapUpdateBase {
  type: "chat";
  account: string;
  channel: string;
  message: string;
  playerName: string;
  source: "player" | "plugin";
}

enum DynmapChatSource {
  player,
  plugin,
}

interface DynmapUpdatePlayerJoin extends DynmapUpdateBase {
  type: "playerjoin";
  playerName: string;
  account: string;
}

interface DynmapUpdatePlayerQuit extends DynmapUpdateBase {
  type: "playerquit";
  playerName: string;
  account: string;
}

interface DynmapUpdateComponent extends DynmapUpdateBase, HasCoords {
  type: "component";
  msg: string;
  id: string;
  label: string;
  icon: string;
  set: string;
  desc: string;
  dim: string;
  minzoom: number;
  maxzoom: number;
  ctype: string;
}

interface DynmapUpdateDayNight extends DynmapUpdateBase {
  type: "daynight";
  isday: boolean;
}

interface DynmapPing {
  confighash: number;
  currentcount: number;
  servertime: number;
  timestamp: number;
  hasStorm: boolean;
  isThundering: boolean;
  players: DynmapPlayer[];
  updates: DynmapUpdate[];
}

interface DynmapPlayer extends HasCoords {
  account: string;
  name: string;
  world: string;
  type: "player";

  sort: number;
  health: number;
  armor: number;
}

type DynmapUpdate =
  | DynmapUpdateTile
  | DynmapUpdateChat
  | DynmapUpdatePlayerJoin
  | DynmapUpdatePlayerQuit
  | DynmapUpdateDayNight
  | DynmapUpdateComponent;

async function getDictionary(time: number): Promise<string[]> {
  const res = await fetch(
    "https://ultravanilla.world/up-dictionary/world/world/" + time,
  );
  if (!res.ok) throw new Error("Could not fetch dynmap dictionary world");

  const dict = await res.json();
  return dict;
}

function decode(buf: Uint8Array, knownStrings: string[] = []): DynmapPing {
  let offset = 0;

  let timestamp: number;
  ({ offset, num: timestamp } = readUnsigned(buf, offset));

  let confighash: number;
  ({ offset, num: confighash } = readSigned(buf, offset));

  let currentcount: number;
  ({ offset, num: currentcount } = readUnsigned(buf, offset));

  let servertime: number;
  ({ offset, num: servertime } = readUnsigned(buf, offset));

  const bitfield = buf[offset++];
  const isThundering = (bitfield & DynmapPingBitfield.IsThundering) !== 0;
  const hasStorm = (bitfield & DynmapPingBitfield.HasStorm) !== 0;

  let numStrings: number;
  ({ offset, num: numStrings } = readUnsigned(buf, offset));
  let strings: string[] = [];
  for (let i = 0; i < numStrings; i++) {
    let str: string;
    ({ offset, str } = readLpString(buf, offset));
    strings.push(str);
  }
  strings = [...strings, ...knownStrings];

  let numPlayers: number;
  ({ offset, num: numPlayers } = readUnsigned(buf, offset));
  const players: DynmapPlayer[] = [];
  for (let i = 0; i < numPlayers; i++) {
    let sort: number;
    ({ offset, num: sort } = readUnsigned(buf, offset));
    let armor: number;
    ({ offset, num: armor } = readUnsigned(buf, offset));
    let health: number;
    ({ offset, num: health } = readUnsigned(buf, offset));

    let accountId: number;
    ({ offset, num: accountId } = readUnsigned(buf, offset));
    const account = strings[accountId];
    let nameId: number;
    ({ offset, num: nameId } = readUnsigned(buf, offset));
    const name = strings[nameId];
    let worldId: number;
    ({ offset, num: worldId } = readUnsigned(buf, offset));
    const world = strings[worldId];

    let x: number;
    ({ offset, num: x } = readSigned(buf, offset));
    const y = 64;
    let z: number;
    ({ offset, num: z } = readSigned(buf, offset));

    players.push({
      type: "player",
      sort,
      armor,
      health,
      account,
      name,
      world,
      x,
      y,
      z,
    });
  }

  let numUpdates: number;
  ({ offset, num: numUpdates } = readUnsigned(buf, offset));
  const updates: DynmapUpdate[] = [];
  for (let i = 0; i < numUpdates; i++) {
    let updTimestamp: number;
    ({ offset, num: updTimestamp } = readUnsigned(buf, offset));
    // use an offset timestamp to save bytes
    updTimestamp += timestamp;

    let typeId: number;
    ({ offset, num: typeId } = readUnsigned(buf, offset));

    const type = DynmapUpdateType[typeId];

    switch (type) {
      case "tile":
        let templateId: number;
        ({ offset, num: templateId } = readUnsigned(buf, offset));
        let zoom: number;
        ({ offset, num: zoom } = readUnsigned(buf, offset));
        let x: number;
        ({ offset, num: x } = readSigned(buf, offset));
        let y: number;
        ({ offset, num: y } = readSigned(buf, offset));

        const zoomString = zoom === 0 ? "" : "z".repeat(zoom) + "_";
        const name = strings[templateId].replace(
          "!",
          `/${Math.floor(x / 32)}_${
            Math.floor(y / 32)
          }/${zoomString}${x}_${y}.`,
        );

        updates.push({ type, timestamp: updTimestamp, name });

        break;
      case "chat":
        let accountId: number;
        ({ offset, num: accountId } = readUnsigned(buf, offset));
        let channelId: number;
        ({ offset, num: channelId } = readUnsigned(buf, offset));
        let playerNameId: number;
        ({ offset, num: playerNameId } = readUnsigned(buf, offset));
        let chatSourceId: number;
        ({ offset, num: chatSourceId } = readUnsigned(buf, offset));

        let message: string;
        ({ offset, str: message } = readLpString(buf, offset));

        updates.push({
          type,
          timestamp: updTimestamp,
          account: strings[accountId],
          channel: strings[channelId],
          playerName: strings[playerNameId],
          source: DynmapChatSource[
            chatSourceId
          ] as keyof typeof DynmapChatSource,
          message,
        });
        break;
      case "playerjoin":
      case "playerquit":
        let accountId2: number;
        ({ offset, num: accountId2 } = readUnsigned(buf, offset));
        let playerNameId2: number;
        ({ offset, num: playerNameId2 } = readUnsigned(buf, offset));
        updates.push({
          type,
          timestamp: updTimestamp,
          account: strings[accountId2],
          playerName: strings[playerNameId2],
        });
        break;
      case "daynight":
        let isDay: number;
        ({ offset, num: isDay } = readUnsigned(buf, offset));
        updates.push({
          type,
          timestamp: updTimestamp,
          isday: !!isDay,
        });
        break;
      default:
        let jsonComponent: string;
        ({ offset, str: jsonComponent } = readLpString(buf, offset));
        updates.push(JSON.parse(jsonComponent));
        break;
    }
  }

  return {
    confighash,
    currentcount,
    hasStorm,
    isThundering,
    timestamp,
    servertime,
    players,
    updates,
  };
}

function readUnsigned(
  buf: Uint8Array,
  offset: number = 0,
): { num: number; bytes: number; offset: number } {
  let bytes = 0;

  let byte = buf[offset];
  let num = 0;

  num += byte & REST;
  if (byte < MSB) {
    bytes = 1;
    return { num, bytes, offset: offset + bytes };
  }

  byte = buf[offset + 1];
  num += (byte & REST) << 7;
  if (byte < MSB) {
    bytes = 2;
    return { num, bytes, offset: offset + bytes };
  }

  byte = buf[offset + 2];
  num += (byte & REST) << 14;
  if (byte < MSB) {
    bytes = 3;
    return { num, bytes, offset: offset + bytes };
  }

  byte = buf[offset + 3];
  num += (byte & REST) << 21;
  if (byte < MSB) {
    bytes = 4;
    return { num, bytes, offset: offset + bytes };
  }

  byte = buf[offset + 4];
  num += (byte & REST) * MATH_POW_4;
  if (byte < MSB) {
    bytes = 5;
    return { num, bytes, offset: offset + bytes };
  }

  byte = buf[offset + 5];
  num += (byte & REST) * MATH_POW_5;
  if (byte < MSB) {
    bytes = 6;
    return { num, bytes, offset: offset + bytes };
  }

  byte = buf[offset + 6];
  num += (byte & REST) * MATH_POW_6;
  if (byte < MSB) {
    bytes = 7;
    return { num, bytes, offset: offset + bytes };
  }

  byte = buf[offset + 7];
  num += (byte & REST) * MATH_POW_7;
  if (byte < MSB) {
    bytes = 8;
    return { num, bytes, offset: offset + bytes };
  }

  throw new RangeError("Could not decode varint");
}

function readSigned(
  buf: Uint8Array | Uint8Array,
  offset: number = 0,
): { num: number; bytes: number; offset: number } {
  const result = readUnsigned(buf, offset);
  const num = result.num;
  result.num = num & 1 ? (num + 1) / -2 : num / 2;
  return result;
}

function readLpString(
  buf: Uint8Array,
  offset: number = 0,
): { str: string; bytes: number; offset: number } {
  let strLength: number;
  let bytes: number;
  ({ offset, bytes, num: strLength } = readUnsigned(buf, offset));
  const str = TEXT_DECODER.decode(buf.slice(offset, offset + strLength));

  offset += strLength;

  return { str, offset, bytes: strLength + bytes };
}
