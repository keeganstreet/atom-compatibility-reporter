'use babel';

import fs from 'fs';
import Handlebars from 'handlebars';
import Mustache from 'mustache';
require('../templates/results-view.js');

export default class ResultsView {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('compatibility-reporter', 'pane-item');

    const panelHeading = document.createElement('div');
    panelHeading.classList.add('panel-heading');

    this.panelHeadingSpinner = document.createElement('div');
    this.panelHeadingSpinner.classList.add('loading', 'loading-spinner-tiny', 'inline-block');
    panelHeading.appendChild(this.panelHeadingSpinner);

    this.panelHeadingText = document.createElement('div');
    this.panelHeadingText.textContent = 'Processing files';
    this.panelHeadingText.classList.add('inline-block');
    panelHeading.appendChild(this.panelHeadingText);

    this.element.appendChild(panelHeading);

    this.resultDiv = document.createElement('div');
    this.resultDiv.classList.add('results-view');
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

  processResult(results, browsers, directoryPath) {
    // Handlebars template is pre-processed to avoid unsafe eval
    const template = Handlebars.templates['results-view.html'];
    const caniuse = require('caniuse-db/data.json');
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

    Handlebars.registerHelper('browserFeatureSupportIcon', function(browser, feature) {
      var status = feature.stats[browser.browserId][browser.browserVersion],
        icons = '';

      // Remove note numbers
      status = status.replace(/ ?\#[0-9]+/g, '');

      if (status.indexOf('y') !== -1) {
        icons += '<span class="icon icon-check"></span>';
      }

      if (status.indexOf('a') !== -1) {
        icons += '<span class="icon-asterisk">*</span>';
      }

      if (status.indexOf('n') !== -1 || status.indexOf('p') !== -1) {
        icons += '<span class="icon icon-x"></span>';
      }

      if (status.indexOf('u') !== -1) {
        icons += '<span class="icon icon-question"></span>';
      }

      return icons;
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
      results: sortedResults,
      input: {
        directoryPath: directoryPath,
        excludeVcsIgnoredFiles: atom.config.get('compatibility-reporter.excludeVcsIgnoredFiles'),
        excludeIgnoredNames: atom.config.get('compatibility-reporter.excludeIgnoredNames'),
        customIgnoredNames: atom.config.get('compatibility-reporter.customIgnoredNames'),
        fileFiltersCSS: atom.config.get('compatibility-reporter.fileFiltersCSS'),
        fileFiltersJavaScript: atom.config.get('compatibility-reporter.fileFiltersJavaScript'),
        fileFiltersHTML: atom.config.get('compatibility-reporter.fileFiltersHTML')
      }
    });

    this.resultDiv.innerHTML = html;

    this.resultDiv.querySelector('.open-settings').addEventListener('click', function(e) {
      e.preventDefault();
      atom.workspace.open('atom://config/packages/compatibility-reporter');
    });

    const occurance = this.resultDiv.querySelectorAll('.occurance');
    Object.keys(occurance).forEach(key => {
      const item = occurance[key];
      item.addEventListener('dblclick', function() {
        atom.workspace.open(item.dataset.file, {
          initialLine: parseInt(item.dataset.line, 10) - 1,
          initialColumn: parseInt(item.dataset.column, 10) - 1
        });
      });
    });

    const rows = this.resultDiv.querySelectorAll('.features-table tr');
    let columns = [];
    Object.keys(rows).forEach(rowIndex => {
      const cellsInRow = rows[rowIndex].querySelectorAll('th, td');
      Object.keys(cellsInRow).forEach(columnIndex => {
        const item = cellsInRow[columnIndex];
        if (!columns[columnIndex]) {
          columns[columnIndex] = [];
        }
        columns[columnIndex][rowIndex] = item;
        item.addEventListener('mouseenter', function() {
          Object.keys(columns[columnIndex]).forEach(key => {
            columns[columnIndex][key].classList.add('hover-column');
          })
        });
        item.addEventListener('mouseleave', function() {
          Object.keys(columns[columnIndex]).forEach(key => {
            columns[columnIndex][key].classList.remove('hover-column');
          })
        });
      });
    });

    this.panelHeadingText.innerHTML = Mustache.render('Identified {{length}} features.', sortedResults);
    this.panelHeadingSpinner.style.display = 'none';
  }
};
