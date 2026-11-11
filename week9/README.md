# week9
Course LLM was used to refine interactions (i.e. making variable collection smoother) and for debugging. Project was programmed in low light, so sensitivity variables may be too low for brighter settings.


Think about the position of the camera and what it captures. Will you show the body or outline of control points? What information will you control or change? How do the gestures and positions you’re tracking map to the experience?
My intention was for the camera to only capture a person's head and shoulders, mostly to make it easier to hide the hand from the camera to prevent it from tracking when it is not supposed. I did not want to show the control points, as I wanted the interaction to seem "magical." I decided to build upon my homework from last week because I found myself wanting to use a left and right swiping motion to switch between the shapes while making it, so I thought this would be a great opportunity to actually implement such a feature. I think it makes the interaction more entertaining, since you can physically scroll through the options without touching the physical interface, making it seem more like an interactive mirror (the original inspiration came from Random International's "Blur Mirror").

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
