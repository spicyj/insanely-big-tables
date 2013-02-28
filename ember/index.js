App = Ember.Application.create();

App.Record = Ember.Object.extend({
  init: function () {
    this.set('key', Math.random());
    this.set('value', Math.random()*100);
  }
});

App.DataController = Ember.ArrayProxy.create({
  timer: null,
  amount: null,
  content: [
    App.Record.create(),
    App.Record.create()
  ]
});

App.RecordView = Ember.View.extend({
  tagName: 'tr',
  record: null,
  click: function (ev) {
    $('.error').each(function (i, el) {
      $(el).removeClass('error');
    });
    $(ev.target).parent().addClass('error');
  }
});

App.ButtonView = Ember.View.extend({
  tagName: 'button',
  classNames: ['btn']
});

App.InsButtonView = App.ButtonView.extend({
  click: function () {
    App.DataController.unshiftObject(App.Record.create());
  }
});

App.AddButtonView = App.ButtonView.extend({
  click: function () {
    App.DataController.pushObject(App.Record.create());
  }
});

App.StartButtonView = App.ButtonView.extend({
  click: function () {
    var timer = App.DataController.get('timer'),
        amount = App.DataController.get('amount'),
        i = 0;
    console.log(timer, amount);
    (function adding() {
      App.DataController.unshiftObject(App.Record.create());
      i += 1;
      if (i < amount) setTimeout(adding, timer);
    })();

  }
});

App.TimerInputView = Ember.TextField.extend({
  attributeBindings: ['placeholder'],
  placeholder: 'timer, ms',
  valueBinding: 'App.DataController.timer'
});

App.AmountInputView = Ember.TextField.extend({
  attributeBindings: ['placeholder'],
  placeholder: 'amount',
  valueBinding: 'App.DataController.amount'
});

App.TotalView = Ember.TextField.extend({
  attributeBindings: ['readonly'],
  classNames: ['total'],
  readonly: 'readonly',
  valueBinding: 'App.DataController.content.length'
});