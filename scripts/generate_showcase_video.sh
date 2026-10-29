#!/usr/bin/env bash
set -e

OUTPUT="public/video/mahima-batparss-showcase.mp4"
TMP_DIR="public/video/frames"
mkdir -p "$TMP_DIR"

echo "Rendering storyboard frames..."

# Scene 1 (0-4s): The Mystery
ffmpeg -y -f lavfi -i color=c=0xFAF7F2:s=1920x1080:d=4 -vf "
drawbox=x=860:y=300:w=200:h=200:color=0xC6A56B@0.8:t=fill,
drawtext=text='A birthday surprise\, designed with memories.':fontcolor=0x3F3040:fontsize=52:x=(w-text_w)/2:y=(h-text_h)/2+180,
drawtext=text='MAHIMA  x  BATPARSS':fontcolor=0xC88F91:fontsize=28:x=(w-text_w)/2:y=(h-text_h)/2+250
" -c:v libx264 -pix_fmt yuv420p "$TMP_DIR/scene1.mp4"

# Scene 2 (4-9s): Interactive Cake
ffmpeg -y -f lavfi -i color=c=0x29262B:s=1920x1080:d=5 -vf "
drawbox=x=760:y=500:w=400:h=180:color=0xF8F4EE:t=fill,
drawbox=x=820:y=380:w=280:h=120:color=0xE8D8C5:t=fill,
drawtext=text='One little thing before we begin...':fontcolor=0xC6A56B:fontsize=36:x=(w-text_w)/2:y=200,
drawtext=text='Make a wish and blow out the candles':fontcolor=0xF8F4EE:fontsize=48:x=(w-text_w)/2:y=260,
drawtext=text='HAPPY BIRTHDAY\, MAHIMA!':fontcolor=0xC88F91:fontsize=54:x=(w-text_w)/2:y=760
" -c:v libx264 -pix_fmt yuv420p "$TMP_DIR/scene2.mp4"

# Scene 3 (9-15s): Welcome & Chaos
ffmpeg -y -f lavfi -i color=c=0xF8F4EE:s=1920x1080:d=6 -vf "
drawtext=text='BATPARSS PRESENTS':fontcolor=0xC6A56B:fontsize=28:x=(w-text_w)/2:y=360,
drawtext=text='Mahima Birthday Special':fontcolor=0x3F3040:fontsize=64:x=(w-text_w)/2:y=430,
drawtext=text='One birthday girl. One chaotic gang. So many stories.':fontcolor=0xC88F91:fontsize=34:x=(w-text_w)/2:y=530,
drawtext=text='Ekta group. Onek gula pagol. Countless memories.':fontcolor=0x29262B:fontsize=30:x=(w-text_w)/2:y=620
" -c:v libx264 -pix_fmt yuv420p "$TMP_DIR/scene3.mp4"

# Scene 4 (15-22s): Sreemangal Chronicles
PHOTO="public/images/sreemangal/tour-01.jpg"
ffmpeg -y -loop 1 -i "$PHOTO" -t 7 -vf "
scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,
drawbox=x=0:y=780:w=1920:h=300:color=0x3F3040@0.85:t=fill,
drawtext=text='SREEMANGAL CHRONICLES':fontcolor=0xC6A56B:fontsize=34:x=120:y=830,
drawtext=text='Somewhere between the journey and the destination':fontcolor=0xF8F4EE:fontsize=42:x=120:y=890,
drawtext=text='Sylhet Bangladesh - Batparss Tour':fontcolor=0xE8D8C5:fontsize=26:x=120:y=960
" -c:v libx264 -pix_fmt yuv420p "$TMP_DIR/scene4.mp4"

# Scene 5 (22-28s): The Sealed Letter
ffmpeg -y -f lavfi -i color=c=0xE8D8C5:s=1920x1080:d=6 -vf "
drawbox=x=660:y=280:w=600:h=400:color=0xF8F4EE:t=fill,
drawtext=text='There is one more thing we wanted to tell you...':fontcolor=0x3F3040:fontsize=44:x=(w-text_w)/2:y=200,
drawtext=text='A Letter from Batparss':fontcolor=0xC88F91:fontsize=32:x=(w-text_w)/2:y=450,
drawtext=text='Private and confidential for the birthday girl':fontcolor=0xA78B9A:fontsize=24:x=(w-text_w)/2:y=520
" -c:v libx264 -pix_fmt yuv420p "$TMP_DIR/scene5.mp4"

# Scene 6 (28-35s): Closing
ffmpeg -y -f lavfi -i color=c=0x3F3040:s=1920x1080:d=7 -vf "
drawtext=text='MAHIMA  x  BATPARSS':fontcolor=0xC6A56B:fontsize=36:x=(w-text_w)/2:y=380,
drawtext=text='An interactive birthday experience.':fontcolor=0xF8F4EE:fontsize=52:x=(w-text_w)/2:y=460,
drawtext=text='Designed with friendship. Built with memories.':fontcolor=0xC88F91:fontsize=34:x=(w-text_w)/2:y=550
" -c:v libx264 -pix_fmt yuv420p "$TMP_DIR/scene6.mp4"

# Concatenate all scenes into final video
cat << 'EOF' > "$TMP_DIR/concat.txt"
file 'scene1.mp4'
file 'scene2.mp4'
file 'scene3.mp4'
file 'scene4.mp4'
file 'scene5.mp4'
file 'scene6.mp4'
EOF

ffmpeg -y -f concat -safe 0 -i "$TMP_DIR/concat.txt" -c copy "$OUTPUT"
rm -rf "$TMP_DIR"
echo "Showcase video generated at: $OUTPUT"
