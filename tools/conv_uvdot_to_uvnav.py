#!/usr/bin/env python3
import json
from chompjs import parse_js_objects

with open("data.js", "r") as f:
    n = f.read()

# places
# transfers
orig_metadata = {}
orig_routes = {}

network = {"places": {}, "operators": {}, "warps": []}

print("[*] Parsing UVDOT Network...")
objects = parse_js_objects(n)
for index, obj in enumerate(objects):
    match index:
        case 2:
            orig_metadata = obj
        case 3:
            orig_routes = obj

print("[*] Converting...")
for destination, route in orig_routes.items():
    if "UltraStar" in destination:
        continue

    network["places"][destination] = {
        "coordinates": route[0],
        "methods": {},
        "type": "Town",
    }
    methods = network["places"][destination]["methods"]
    for m_type, connections in route[1].items():
        m_type = (
            m_type.replace("roadways", "street")
            .replace("iceways", "iceway")
            .replace("railways", "railway")
            .replace("walkways", "walk")
        )
        methods[m_type] = {}
        method = methods[m_type]
        for dest, connection in connections.items():
            if "Main Entrance" in "".join(connection[0]):
                continue
            method[dest.replace("UltraStar Station", "")] = {
                "distance": connection[1],
                "methodNames": connection[0],
            }

for key, method in orig_metadata.items():
    if "UltraStar Station Main Entrance" in key:
        continue

    if "Warp" in key:
        network["warps"].append(key.replace(" Warp", ""))

    network["operators"][key.replace(" Warp", "")] = method["operator"]

print("[*] Dumping...")
with open("network.json", "w") as f:
    json.dump(network, f)
