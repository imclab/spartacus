define([
  'jquery',
  'underscore',
  'backbone',
  'i18n-abide-utils',
  'log',
  'nunjucks',
  'templates',
], function($, _, Backbone, i18n, log, nunjucks){

  var console = log('view', 'base');
  var prefix = 'Webpay | ';

  var BaseView = Backbone.View.extend({

    el: $('#app'),
    gettext: i18n.gettext,
    format: i18n.format,
    setTitle: function setTitle(title) {
      // Update the title element in the page.
      $('title').text(prefix + title);
    },
    template: function(template, data){
      // Builds the specified template with data.
      data = data || {};
      // Add gettext to context.
      _.extend(data, {
        gettext: i18n.gettext,
        format: i18n.format
      });
      return nunjucks.render(template, data);
    },
    renderTemplate: function renderTemplate(template, data) {
      // Chainable shortcut for rendering the template.
      this.$el.html(this.template(template, data));
      console.log('Replacing $el with rendered content');
      return this;
    }
  });
  return BaseView;
});
