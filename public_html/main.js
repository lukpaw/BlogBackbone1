(function($) {
  // Override function syncro data with the server, because we do not have a server
  Backbone.sync = function(method, model, success, error) {
    success();
  };
   
  // Definition of the Employee model
  var Employee = Backbone.Model.extend({
    defaults : {
      firstName : '',
      lastName : '',
      email : ''
    }
  });
 
  // Definition of the Employee List
  var EmployeeList = Backbone.Collection.extend({
    model : Employee
  });
 
  // Defintion of the Single Employee View
  // It can be consist of li tag
  var EmployeeView = Backbone.View.extend({
    tagName : 'li',
    // Service of event for Delete buttons exists in every Employee
    // Click in button cause calling function deleteEmployee
    events : {
      'click button.delete' : 'deleteEmployee'
    },
    // View constructor
    initialize : function() {
      var self = this;
      // If in model will be removed element we have to remove li for this Employee
      this.model.bind('remove', function() {
        $(self.el).remove();
      });
    },
    // Function responsible for drawing view this.el
    // in this case li with content
    render : function() {
      $(this.el).html(//
      // Display view of the fields from Employee model
      '<span>' + //
      '  ' + this.model.get('firstName') + ' ' + //
      '  ' + this.model.get('lastName') + ' ' + //
      '  ' + this.model.get('email') + ' ' + //
      '</span>' + '    ' + //
      // Every displayed Employee will be attached button Delete (to remove this Employee) 
      '<button type="button" class="delete">Delete</button>');
      return this;
    },
    // Function cause removing instance of Employee
    // in this case will be called event remove
    // and view for this Employee will be remove too
    deleteEmployee : function() {
      this.model.destroy();
    }
  });
 
  // View definition for the Employee List
  var EmployeeListView = Backbone.View.extend({
    // Do not be create new element html
    // but attach this.el directly to body element
    el : $('body'),
    // Event service for button add under form
    // Click on this button cause calling function addEmployee
    events : {
      'click button#add' : 'addEmployee'
    },
    // View constructor
    initialize : function() {
      // Creating instance of the list
      this.employeeList = new EmployeeList();
      // If instance of model Employee is added to the list
      // adding event trigger function which create for this instance
      // EmplyeeView, which is attached to ul element existing in this.el (that is body)
      this.employeeList.bind('add', function(employee) {
        var employeeView = new EmployeeView({
          model : employee
        });
        $('ul', this.el).append(employeeView.render().el);
      });
      // Manual call drawing this.el view (body)
      this.render();
    },
    // Function responsible for drawing this.el view
    // in this case that is body with content
    render : function() {
      $(this.el).append(//
      '<div style="width: 250px; text-align: right; border: 1px gray solid;">' + //
      '  <div style="width: 100%; text-align: left; background-color: lightgray;">New Employee</div>' + //
      // Form with Employee fields and Add button
      '  <form>' + //
      '    First name: <input type="text" id="firstName" value="John" /><br/> ' + //
      '    Last name: <input type="text" id="lastName" value="Smith" /><br/> ' + //
      '    Email: <input type="text" id="email" value="john.smith@yahoo.com" /><br/> ' + //
      '    <button type="button" id="add" style="width: 70px;">Add</button>' + //
      '  </form>' + //
      '</div>');
      // Adding under form ul, in which are attached li view
      // for single instance Employee model
      $(this.el).append('<ul></ul>');
    },
    // Function casue adding new instance Employee to the list
    // in this case it will be call event add for this list
    // and will be added new EmployeeView to the EmployeeListView
    addEmployee : function() {
      // New instance Employee model and setting values of fields
      // read from form after press Add button 
      var employee = new Employee();
      employee.set({
        firstName : $('input#firstName').val(),
        lastName : $('input#lastName').val(),
        email : $('input#email').val()
      });
      // Adding instance Employee model to the list (it casue add event on the list)
      this.employeeList.add(employee);
    }
  });
 
  // Create application through the instance main EmployeeListView
  var employeeListView = new EmployeeListView();
})(jQuery);