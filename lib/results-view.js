'use babel';

import fs from 'fs';
import Handlebars from 'handlebars';
require('../templates/results-view.js');

export default class ResultsView {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('compatibility-reporter');

    this.resultDiv = document.createElement('div');
    this.element.appendChild(this.resultDiv);
  }

  getTitle() {
    return 'Compatibility Report';
  }

  getIconName() {
    return 'graph';
  }

  serialize() {}

  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  processResult(results, browsers) {
    const template = Handlebars.templates['results-view.html'];
    const caniuse = JSON.parse(fs.readFileSync(__dirname + '/../node_modules/compatibility-reporter/node_modules/caniuse-db/data.json', { encoding: 'utf8' }));
    let sortedResults = [];
    const supportStatusLabels = {
      y: 'Supported',
      a: 'Partial support',
      n: 'Not supported',
      p: 'Not supported, but has a polyfill',
      u: 'Support unknown',
      x: '(requires prefix to work)',
      d: '(disabled by default)'
    };

    Object.keys(results).forEach(function(result) {
      results[result].occurances.forEach(function(occurance) {
        occurance.relativePath = atom.project.relativizePath(occurance.file)[1];
      });
      sortedResults.push({
        id: result,
        value: results[result]
      });
    });

    // Sort features alphabetically
    sortedResults = sortedResults.sort(function(a, b) {
      var titleA = a.value.title.toUpperCase(),
      titleB = b.value.title.toUpperCase();

      if (titleA < titleB) {
        return -1;
      } else if (titleA > titleB) {
        return 1;
      } else {
        return 0;
      }
    });

    Handlebars.registerHelper('browserFeatureSupport', function(browser, feature) {
      var status = feature.stats[browser.browserId][browser.browserVersion];

      // Remove note numbers
      status = status.replace(/ ?\#[0-9]+/g, '');

      // Replace each character with the full-text label
      return status.replace(/([a-z])/g, function(replacement) {
        return supportStatusLabels[replacement] || '';
      });
    });

    Handlebars.registerHelper('browserFeatureSupportClassname', function(browser, feature) {
      var status = feature.stats[browser.browserId][browser.browserVersion];

      // Remove note numbers
      status = status.replace(/ ?\#[0-9]+/g, '');

      // Prepend each status character with "support-status-"
      return status.replace(/([a-z])/g, 'support-status-$1');
    });

    const html = template({
      browsers: browsers.map(function(browser) {
        var browserArray = browser.split(' ');
        return {
          browser: browser,
          browserId: browserArray[0],
          browserName: caniuse.agents[browserArray[0]].browser,
          browserVersion: browserArray[1]
        };
      }),
      results: sortedResults
    });

    this.resultDiv.innerHTML = html;
  }
};
