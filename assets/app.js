const svgs = require.context('./svgs', false, /\.svg$/);
svgs.keys().forEach(svgs);

import './styles/style.scss';
import './scripts/components/index';

