import os
from PIL import Image, ImageDraw, ImageFont

# Define paths
assets_dir = r"c:\Users\senth\OneDrive\Desktop\client project\bookstore-main (1)\bookstore-main\frontend\src\assets\books"
out_path = r"c:\Users\senth\OneDrive\Desktop\grid.png"

# Setup grid specs
cols, rows = 5, 4
img_w, img_h = 240, 360
margin = 40
text_h = 30

grid_w = cols * (img_w + margin) + margin
grid_h = rows * (img_h + margin + text_h) + margin

grid_img = Image.new('RGB', (grid_w, grid_h), color=(255, 255, 255))
draw = ImageDraw.Draw(grid_img)

for i in range(2, 21):
    idx = i - 2
    x = margin + (idx % cols) * (img_w + margin)
    y = margin + (idx // cols) * (img_h + margin + text_h)
    
    filename = f"book-{i}.png"
    filepath = os.path.join(assets_dir, filename)
    
    if os.path.exists(filepath):
        try:
            img = Image.open(filepath)
            img = img.resize((img_w, img_h))
            grid_img.paste(img, (x, y))
        except Exception as e:
            print(f"Error loading {filename}: {e}")
            
    # Draw label
    draw.text((x, y + img_h + 5), filename, fill=(0, 0, 0))

grid_img.save(out_path)
print(f"Saved {out_path}")
