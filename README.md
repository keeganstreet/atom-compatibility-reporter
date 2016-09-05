# Compatibility Reporter package for Atom

> Generate a report on the Web Platform features that your website uses, and the browser support of each feature, using data from [Can I Use](http://caniuse.com/).

Compatibility Reporter crawls through your CSS, JavaScript and HTML and builds up an Abstract Syntax Tree (AST) for each file. It then searches through the relevant parts of each file (such as declaration property names and values in CSS, identifier names in JavaScript, and element and attribute names in HTML), to identify which features are in use. It then extracts support data for each of these features from the Can I Use database for each browser you requested.

To start, right-click a directory in Tree View and select Generate Compatibility Report.

![Compatibility Reporter report](https://raw.githubusercontent.com/keeganstreet/atom-compatibility-reporter/master/styles/screenshot.png)

## Settings

### Browsers

List of browsers to include in the report, written in [Browserslist](https://github.com/ai/browserslist) format. For example, `last 1 version, > 10%` will generate results for all browser versions that are the last version of each major browser, or have a usage of over 10% in global usage statistics.

### Exclude VCS Ignored Files

This setting tells Compatibility Reporter to exclude files that are ignored by the version control system, for example anything in the `.gitignore` file.

### Exclude Ignored Names

This setting tells Compatibility Reporter to exclude files that are set to be ignored in the Atom core config.

### Custom Ignored Names

Use this configuration option to define additional file patterns for this package to ignore.

### File Filters (CSS)

List of string glob patterns for files that should be parsed as CSS.

### File Filters (JavaScript)

List of string glob patterns for files that should be parsed as JavaScript.

### File Filters (HTML)

List of string glob patterns for files that should be parsed as HTML.

## More information

For more information, refer to the [Compatibility Reporter npm package](https://github.com/keeganstreet/compatibility-reporter).
