---
layout: post
comments: true
title: "working with kodi api"
date: "2017-10-12 23:39:00 +0300"
---


# 1. Get channel group ids

```json
{
  "jsonrpc": "2.0",
  "method": "PVR.GetChannelGroups",
  "params": {

    "channeltype": "tv",

    "limits": {
      "start": 0,
      "end": 75
    }
  },
  "id": "GetGroups"
}
```


#### Result: channelgroupid = 1

```json
{
    "id": "GetGroups",
    "jsonrpc": "2.0",
    "result": {
        "channelgroups": [
            {
                "channelgroupid": 1,
                "channeltype": "tv",
                "label": "All channels"
            }
        ],
        "limits": {
            "end": 1,
            "start": 0,
            "total": 1
        }
    }
}
```


# 2. Get Channels names and their kodi IDS + numbers

```json
{
  "jsonrpc": "2.0",
  "method": "PVR.GetChannels",
  "params": {

    "channelgroupid": 1,
    "properties": ["channelnumber"]

  },
  "id": "GetGroups"
}
```


#### Result: list will all channel ids

```json
{
    "id": "GetGroups",
    "jsonrpc": "2.0",
    "result": {
        "channels": [
            {
                "channelid": 30,
                "channelnumber": 1,
                "label": "LRT Televizija"
            },
            {
                "channelid": 227,
                "channelnumber": 2,
                "label": "LRT Televizija"
            },
            {
                "channelid": 204,
                "channelnumber": 3,
                "label": "LRT Lituanica"
            },
            {
                "channelid": 44,
                "channelnumber": 4,
                "label": "LRT Kultūra"
            }
        ],
        "limits": {
            "end": 3,
            "start": 0,
            "total": 4
        }
    }
}

```
