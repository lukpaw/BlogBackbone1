(function($) {
  // Nadpisujemy funkcje synchronizujaca dane z serwerem, gdyz nie mamy czesci serwerowej
  Backbone.sync = function(method, model, success, error) {
    success();
  };
   
  // Definicja modelu Employee
  var Employee = Backbone.Model.extend({
    defaults : {
      firstName : '',
      lastName : '',
      email : ''
    }
  });
 
  // Definicja listy skadajaca sie z elementow Employee
  var EmployeeList = Backbone.Collection.extend({
    model : Employee
  });
 
  // Definicja widoku dla jednego Employee
  // Bedzie ona skladala sie z tagu li
  var EmployeeView = Backbone.View.extend({
    tagName : 'li',
    // Obsluga zdarzenia przyciskow Delete wystepujacych przy kazdym Employee
    // Klikniecie w przycisk spowoduje wywolanie funkcji deleteEmployee
    events : {
      'click button.delete' : 'deleteEmployee'
    },
    // Konstruktor widoku
    initialize : function() {
      var self = this;
      // Jezeli w modul nastapi usuniecie musimy usunac li z danym Employee
      this.model.bind('remove', function() {
        $(self.el).remove();
      });
    },
    // Funkcja odpowiedzialna za narysowanie widoku this.el
    // czyli w tym przypadku li z zawartoscia
    render : function() {
      $(this.el).html(//
      // Wyswietlenie w widoku poszczegolnych pol z modelu Employee
      '<span>' + //
      '  ' + this.model.get('firstName') + ' ' + //
      '  ' + this.model.get('lastName') + ' ' + //
      '  ' + this.model.get('email') + ' ' + //
      '</span>' + '    ' + //
      // Przy kazdym wyswietlonym Employee bedzie przycisk pozwalajacy
      // na jego usuniecie 
      '<button type="button" class="delete">Delete</button>');
      return this;
    },
    // Funkcja powoduje usuniecie danej instancji Employee
    // w konsekwencji zostanie zawolane zdarzenie remove
    // i zostanie usuniety rowniez widok dla tego Employee
    deleteEmployee : function() {
      this.model.destroy();
    }
  });
 
  // Definicja widoku dla listy Employee
  var EmployeeListView = Backbone.View.extend({
    // Nie bedzie tworzony nowy element html
    // tylko dolaczamy this.el bezposrednio do body
    el : $('body'),
    // Obsluga zdarzenia przycisku add pod formularzem
    // Klikniecie w przycisk powoduje wywolanie funkcji addEmployee
    events : {
      'click button#add' : 'addEmployee'
    },
    // Konstruktor widoku
    initialize : function() {
      // Stworzenie instancji listy
      this.employeeList = new EmployeeList();
      // W przypadku gdy nastepuje dodanie do listy instancji modelu Employee
      // zdarzenie dodania uruchamia funkcje ktora tworzy dla tej instancji
      // widok EmployeeView, ktory jest dolaczany do elemenu ul bedacego
      // w this.el (czyli body)
      this.employeeList.bind('add', function(employee) {
        var employeeView = new EmployeeView({
          model : employee
        });
        $('ul', this.el).append(employeeView.render().el);
      });
      // Reczne wywolanie rysowania widok this.el (body)
      this.render();
    },
    // Funkcja odpowiedzialna za narysowanie widoku this.el
    // czyli w tym przypadku body z zawartoscia
    render : function() {
      $(this.el).append(//
      '<div style="width: 250px; text-align: right; border: 1px gray solid;">' + //
      '  <div style="width: 100%; text-align: left; background-color: lightgray;">New Employee</div>' + //
      // Fomularza z polami Employee oraz przyciskiem Add
      '  <form>' + //
      '    First name: <input type="text" id="firstName" value="John" /><br/> ' + //
      '    Last name: <input type="text" id="lastName" value="Smith" /><br/> ' + //
      '    Email: <input type="text" id="email" value="john.smith@yahoo.com" /><br/> ' + //
      '    <button type="button" id="add" style="width: 70px;">Add</button>' + //
      '  </form>' + //
      '</div>');
      // Dodanie pod formularzem ul, do ktorego beda doklejane widoki li
      // dla pojedynczych instancji modelu Employee
      $(this.el).append('<ul></ul>');
    },
    // Funkcja powoduje dodanie nowej instancji Employee do listy
    // w konsekwnecji zostanie zawolane zdarzenie add dla listy
    // i zostanie dodany nowy widok EmployeeView do EmployeeListView
    addEmployee : function() {
      // Nowa instancja modelu Employee i ustawienie jej wartosci pol
      // pobranych z formularza po wcisnieciu przycisku Add
      var employee = new Employee();
      employee.set({
        firstName : $('input#firstName').val(),
        lastName : $('input#lastName').val(),
        email : $('input#email').val()
      });
      // Dodanie instacji modelu Employee do Listy (to powoduje zdarzenie add na liscie)
      this.employeeList.add(employee);
    }
  });
 
  // Stworzenie naszej aplikacji poprzez instancje
  // glownego widoku EmployeeListView
  var employeeListView = new EmployeeListView();
})(jQuery);