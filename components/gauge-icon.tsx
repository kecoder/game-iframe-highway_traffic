import React from 'react';
import { Gauge } from 'lucide-react';

export function renderToStaticMarkup(component: React.ReactElement): string {
  const div = document.createElement('div');
  // @ts-ignore - This is a hack to get the SVG markup
  const reactDOMServer = { renderToStaticMarkup: (el: React.ReactElement) => '' };
  const svgString = reactDOMServer.renderToStaticMarkup(component);
  div.innerHTML = svgString;
  return div.innerHTML;
}

export const GaugeIcon: React.FC = () => {
  return <Gauge color="#00F3FF" size={24} />;
};

export default GaugeIcon;
