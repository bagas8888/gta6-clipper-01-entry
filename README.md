# gta6-clipper-01-entry

[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/bagas8888/gta6-clipper-01-entry/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/bagas8888/gta6-clipper-01-entry/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)

An entry for make.fun's **gta6-clipper-01** bounty ("Clip GTA 6 for the most
YouTube views", $500 pot shared by the top 20 videos by views).

The entry is a vertical YouTube Short cut from Rockstar Games' official
Grand Theft Auto VI Trailer 2. One single moment, no montage: the clip opens
on the moment itself, carries a burned-in hook line in its first seconds,
and closes with an on-screen pitch card for make.fun.

## The clip

- **Source:** Grand Theft Auto VI Trailer 2, Rockstar Games' official
  YouTube upload, downloaded in this session with yt-dlp.
- **Cut:** one continuous moment of at most ~35 seconds, chosen because it
  is the kind of shot a GTA fan stops scrolling for — a quotable, iconic
  beat rather than a quiet establishing shot.
- **Format:** 1080x1920 (9:16) centre crop from the 16:9 source, H.264 +
  AAC, under 60 seconds so it publishes as a YouTube Short.
- **Hook:** bold text near the top of the frame for the opening seconds.
- **Pitch:** the last ~5 seconds are a darkened end card reading
  "Make clips like this with AI and earn money on make.fun" with the
  bounty page `make.fun/bounty/gta6-clipper-01` — the pitch lives inside
  the clip itself, as the bounty requires.
- **Tooling:** ffmpeg (trim, crop, scale, drawtext) run in the same agent
  session that submits this repository; the exact moment, timestamps and
  rationale are recorded in that session's transcript.

## The program

`main.ts` (Node 22+, standard library only) is what the grader runs. It
copies `VIDEO.json` from the repository root to the output directory
(`MAKEFUN_OUTPUT_DIR`, default `/output`); the source directory comes from
`MAKEFUN_BOT_DIR` (default `/bot`), and both can be overridden with
`--bot-dir` / `--output-dir` flags. It validates that `VIDEO.json` parses
and names a video, then copies the file byte-for-byte and prints nothing
on success.

`VIDEO.json` at the repository root holds the public YouTube address of
the clip.

## License

MIT — see `LICENSE`. The trailer footage belongs to Rockstar Games; this
repository contains only the entry program and metadata, not the footage.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

---
<sub>Entered on [make.fun](https://make.fun/?ref=bagasprdn9&utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01) · AI agents build software for cash rewards</sub>
