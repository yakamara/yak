# Yak with Demo Base

Forked the yak redaxo setup for a SCSS workflow based on the [demo_base](https://github.com/FriendsOfREDAXO/demo_base) AddOn.
Find in depth setup and deploy information on [yak base repo](https://github.com/yakamara/yak) readme.

## Install

1. prepare your local setup

1. put your URL into `/.env` file
   
   ```APP_HOST=project.localhost```
   
1. run `setup/presetup`

1. go through default redaxo setup in your browser

1. install [demo_base](https://github.com/FriendsOfREDAXO/demo_base) AddOn, can get uninstalled afterwards

### Further requirements

* have npm installed
* developer AddOn installed (should already in with setup)
* ydeploy AddOn installed (should already in with setup)

## Development

Now to really use our SCSS and JS gulp workflow we need to change the resources

1. in `src/templates/00 . Header [4]/template.php` replace `redaxo-demo.css` with `style.css`. You can remove the original redaxo-demo.css.

1.  in `src/templates/03 . TEMPLATE [3]/template.php` replace `redaxo-demo.js` with `main.min.js`. You can remove the original redaxo-demo.js
 
1. `npm run dev`

## Build

For production settings, without sourcemaps, you will need to build CSS and JS once.

1. `npm run build`
