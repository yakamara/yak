# Yak with Demo Base

Forked the yak redaxo setup for a SCSS workflow based on the [demo_base](https://github.com/FriendsOfREDAXO/demo_base) AddOn.
Find in depth setup and deploy information on [yak base repo](https://github.com/yakamara/yak) readme.

## Install

1. prepare your local setup

1. put your URL into `/.env` file
   
   ```APP_HOST=project.localhost```
   
1. run `setup/presetup`

1. go through default redaxo setup in your browser

1. update core in Back End

1. install [demo_base](https://github.com/FriendsOfREDAXO/demo_base) AddOn, can get uninstalled afterwards

1. run `npm install`

### Further requirements

* node and npm installed
* developer AddOn installed (should already in with setup)
* ydeploy AddOn installed (should already in with setup)

## Development

Now to really use your SCSS and JS gulp workflow. You need to change the binded resources.

1. in `src/templates/00 . Header [4]/template.php` replace `redaxo-demo.css` with `style.css`. You can remove the original redaxo-demo.css.

1.  in `src/templates/03 . TEMPLATE [3]/template.php` replace all JS integrations and set the created `js/main.min.js` as single JS resource. You can remove the original `/resources/js` directory.
 
1. `npm run dev`

## Build

For production settings, without sourcemaps, you will need to build CSS and JS once.

1. `npm run build`
