# week2 notes
For the starrySky animation, I had initially intended for the entire scene to rotate about the center of the window. However, I couldn't get it to work the way I had envisioned it, so I decided to have only the moon rotate. I then added the horizon and trees to make the moon's rotation look more natural. I also wanted the moon to look more like a crescent, but I chose to use arc() instead to avoid a bezier curve.

For the sunRise animation, I wanted to include a sun that would rise and set, but I decided it was too similar to the starrySky animation, so I settled for simply having the moving clouds.

For the raindrops, I wanted to make them actual raindrop shapes, but couldn't figure out how to accomplish this, so I settled for the circles. Since they were now circles, they were more reminiscent of snow, so I changed my theme accordingly.

Finally, the bounce, which was inspired by the old DVD player idle screen, works exactly as intended. However, I felt it was boring so I added a small interaction to try and manipulate it to finally hit the corner.

## Getting Started

Open `index.html` in your web browser and start editing `sketch.js`.

## Running Locally

For projects with media files, use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using VS Code Live Server extension
# Right-click index.html -> "Open with Live Server"
```

## Resources

- [p5.js 2.0](https://beta.p5js.org/)
- [p5.js Reference](https://p5js.org/reference/)
