#!/usr/bin/env bash
set -e

echo "=== MAHIMA x BATPARSS CINEMATIC SHOWCASE VIDEO GENERATOR ==="

OUTPUT="public/video/mahima-batparss-showcase.mp4"
TMP_DIR="public/video/frames_render"
rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"

if ! command -v ffmpeg &> /dev/null; then
    echo "Error: ffmpeg is not installed or not in PATH."
    exit 1
fi

PHOTO_SREEMANGAL="public/images/sreemangal/tour-01.jpg"
PHOTO_TEA="public/images/sreemangal/tea-garden-01.jpg"
PHOTO_GROUP="public/images/batparss/group-01.jpg"
PHOTO_CANDID="public/images/batparss/candid-01.jpg"

if [ ! -f "$PHOTO_SREEMANGAL" ]; then
    echo "Error: Required asset $PHOTO_SREEMANGAL not found."
    exit 1
fi

echo "[1/6] Rendering Scene 1: The 3D Mystery Opening (0-4s)..."
ffmpeg -y -f lavfi -i color=c=0xFAF7F2:s=1920x1080:d=4 -vf "
vignette=PI/4,
drawbox=x=840:y=320:w=240:h=200:color=0xC88F91@0.85:t=fill,
drawbox=x=940:y=320:w=40:h=200:color=0xC6A56B:t=fill,
drawbox=x=840:y=400:w=240:h=40:color=0xC6A56B:t=fill,
drawtext=text='A birthday surprise\, designed with memories.':fontcolor=0x3F3040:fontsize=50:x=(w-text_w)/2:y=620,
drawtext=text='MAHIMA  x  BATPARSS':fontcolor=0xC88F91:fontsize=26:x=(w-text_w)/2:y=690
" -c:v libx264 -pix_fmt yuv420p -r 30 "$TMP_DIR/s1.mp4"

echo "[2/6] Rendering Scene 2: 3D Cake & Candle Extinguishing (4-9s)..."
ffmpeg -y -f lavfi -i color=c=0x29262B:s=1920x1080:d=5 -vf "
vignette=PI/3,
drawbox=x=760:y=540:w=400:h=160:color=0xFAF7F2:t=fill,
drawbox=x=820:y=420:w=280:h=120:color=0xC88F91:t=fill,
drawbox=x=890:y=330:w=140:h=90:color=0xFAF7F2:t=fill,
drawbox=x=955:y=270:w=10:h=60:color=0xC6A56B:t=fill,
drawtext=text='One-Action Candle Extinguish':fontcolor=0xC6A56B:fontsize=32:x=(w-text_w)/2:y=180,
drawtext=text='HAPPY BIRTHDAY\, MAHIMA!':fontcolor=0xF8F4EE:fontsize=56:x=(w-text_w)/2:y=760,
drawtext=text='A little surprise\, made with love by Batparss':fontcolor=0xC88F91:fontsize=28:x=(w-text_w)/2:y=830
" -c:v libx264 -pix_fmt yuv420p -r 30 "$TMP_DIR/s2.mp4"

echo "[3/6] Rendering Scene 3: Batparss Friendship & Chaos (9-14s)..."
ffmpeg -y -loop 1 -i "$PHOTO_GROUP" -t 5 -vf "
scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,
vignette=PI/3,
drawbox=x=0:y=680:w=1920:h=400:color=0x29262B@0.88:t=fill,
drawtext=text='BATPARSS PRESENTS':fontcolor=0xC6A56B:fontsize=28:x=120:y=740,
drawtext=text='One birthday girl. One chaotic gang. So many stories.':fontcolor=0xF8F4EE:fontsize=46:x=120:y=790,
drawtext=text='Ekta group. Onek gula pagol. Countless memories.':fontcolor=0xC88F91:fontsize=32:x=120:y=860
" -c:v libx264 -pix_fmt yuv420p -r 30 "$TMP_DIR/s3.mp4"

echo "[4/6] Rendering Scene 4: Sreemangal Chronicles (14-23s)..."
ffmpeg -y -loop 1 -i "$PHOTO_SREEMANGAL" -t 9 -vf "
scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,
vignette=PI/4,
drawbox=x=0:y=720:w=1920:h=360:color=0x3F3040@0.85:t=fill,
drawtext=text='SREEMANGAL CHRONICLES':fontcolor=0xC6A56B:fontsize=32:x=120:y=780,
drawtext=text='Somewhere between the journey and the destination':fontcolor=0xF8F4EE:fontsize=46:x=120:y=830,
drawtext=text='Sylhet\, Bangladesh - Our Group Tour':fontcolor=0xE8D8C5:fontsize=28:x=120:y=900
" -c:v libx264 -pix_fmt yuv420p -r 30 "$TMP_DIR/s4.mp4"

echo "[5/6] Rendering Scene 5: The Keepsake Letter (23-28s)..."
ffmpeg -y -f lavfi -i color=c=0xE8D8C5:s=1920x1080:d=5 -vf "
vignette=PI/3,
drawbox=x=660:y=280:w=600:h=400:color=0xFAF7F2:t=fill,
drawbox=x=920:y=440:w=80:h=80:color=0xC6A56B:t=fill,
drawtext=text='There is one more thing we wanted to tell you...':fontcolor=0x3F3040:fontsize=44:x=(w-text_w)/2:y=200,
drawtext=text='A Letter from Batparss':fontcolor=0xC88F91:fontsize=32:x=(w-text_w)/2:y=730,
drawtext=text='[Private and preserved for the birthday girl]':fontcolor=0x3F3040:fontsize=22:x=(w-text_w)/2:y=780
" -c:v libx264 -pix_fmt yuv420p -r 30 "$TMP_DIR/s5.mp4"

echo "[6/6] Rendering Scene 6: Final 3D Visual & Project Title (28-35s)..."
ffmpeg -y -f lavfi -i color=c=0x3F3040:s=1920x1080:d=7 -vf "
vignette=PI/3,
drawtext=text='MAHIMA  x  BATPARSS':fontcolor=0xC6A56B:fontsize=44:x=(w-text_w)/2:y=380,
drawtext=text='An Interactive Birthday Experience':fontcolor=0xF8F4EE:fontsize=56:x=(w-text_w)/2:y=460,
drawtext=text='Designed with friendship. Built with memories.':fontcolor=0xC88F91:fontsize=34:x=(w-text_w)/2:y=550
" -c:v libx264 -pix_fmt yuv420p -r 30 "$TMP_DIR/s6.mp4"

echo "Concatenating into final 35s 1080p MP4..."
cat << 'EOF' > "$TMP_DIR/list.txt"
file 's1.mp4'
file 's2.mp4'
file 's3.mp4'
file 's4.mp4'
file 's5.mp4'
file 's6.mp4'
EOF

ffmpeg -y -f concat -safe 0 -i "$TMP_DIR/list.txt" -c copy "$OUTPUT"
rm -rf "$TMP_DIR"

echo "SUCCESS: Cinematic showcase video generated at: $OUTPUT"
ls -lh "$OUTPUT"
