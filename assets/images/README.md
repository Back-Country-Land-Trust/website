# Site images

Put approved site media in this folder. Use clear names and keep the original master files in an organization-controlled archive outside the public GitHub repository.

## Recommended naming

```text
logo-bclt.svg
hero-wrights-field.jpg
roadrunner-wrights-field.jpg
native-plant-restoration.jpg
volunteer-workday.jpg
california-poppy.jpg
```

## Before uploading

- Confirm that Back Country Land Trust owns the image or has permission to publish it.
- Do not upload images that reveal sensitive species locations, private access routes, security details, or information that should remain nonpublic.
- Remove unnecessary metadata when it could disclose sensitive location information.
- Prefer landscape images at least 1800 pixels wide for hero use.
- Compress photographs for the web before uploading. Aim for a useful balance of quality and file size; avoid multi-megabyte files when possible.
- Add meaningful `alt` text in the relevant HTML page. Describe what the image shows and why it matters; do not begin with “image of.”

## Replacing a placeholder

The initial site uses CSS-only visual placeholders so it can be published without copying photographs from Wix screenshots. To use a real image:

1. Upload the approved image to this folder.
2. In the relevant HTML page, replace the placeholder `div` with an `img` element, or update the CSS background image.
3. Include concise, accurate alternative text for content images.
4. Preview on desktop and a narrow mobile screen before publishing.

Example:

```html
<img src="assets/images/hero-wrights-field.jpg"
     alt="Wright's Field grassland and surrounding mountains near Alpine, California">
```

For a page inside a subfolder, use `../assets/images/filename.jpg`.
