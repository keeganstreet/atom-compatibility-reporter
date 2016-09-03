'use babel';

import { CompositeDisposable } from 'atom';
import utils from './utils';
import compatibilityReporter from 'compatibility-reporter';
import browserslist from 'browserslist';

export default {
  resultsView: null,
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that generates the report
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'compatibility-reporter:generate': (event) => this.generate(event)
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {},

  generate(event) {
    utils.setDirectoryPath(event.target);
    utils.loadIgnoredPatterns();

    let fileFiltersCSS = atom.config.get('compatibility-reporter.fileFiltersCSS') || [];
    if (typeof fileFiltersCSS === 'string') {
      fileFiltersCSS = [fileFiltersCSS];
    }

    let fileFiltersJavaScript = atom.config.get('compatibility-reporter.fileFiltersJavaScript') || [];
    if (typeof fileFiltersJavaScript === 'string') {
      fileFiltersJavaScript = [fileFiltersJavaScript];
    }

    let fileFiltersHTML = atom.config.get('compatibility-reporter.fileFiltersHTML') || [];
    if (typeof fileFiltersHTML === 'string') {
      fileFiltersHTML = [fileFiltersHTML];
    }

    let browsers = browserslist(atom.config.get('compatibility-reporter.browsers'));

    compatibilityReporter.report({
      files: utils.filesInDirectory(),
      browsers: browsers,
      fileFilters: {
        css: fileFiltersCSS,
        javascript: fileFiltersJavaScript,
        html: fileFiltersHTML
      }
    }).then(results => console.log(results));
  }
};
