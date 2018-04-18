(function() {
  "use strict";

  window.addEventListener("DOMContentLoaded", function() {

    //define vars by dom
    var $formInclude = document.forms["form-include"];
    var $formInput = document.querySelectorAll("input");
    var $table = document.querySelector("table");
    var $tBody = $table.querySelector("tbody");


    //define local vars
    var arrUser = [];
    var user;
    var id = null;

    $formInclude.addEventListener("submit", formInclude);
    
    var $formUpdate = document.forms["form-update"];
    $formUpdate.addEventListener("submit", formUpdate);

    function formInclude(e) {
      e.preventDefault();

      var elements = e.target.elements;
      var name, age, city;
      var $hasNoUser = document.querySelector('.no-user');

      if(!!$hasNoUser){
        $table.classList.remove('no-user');
      }

      // create id user
      id ? id++ : (id = 1);

      //sending params to new function obj
      user = new User(id, elements.name.value, elements.age.value, elements.city.value);

      //add user obj to array
      arrUser.push(user);

      //only new position in array
      updateContent(arrUser);

      addEvent();

      //reset form to default
      $formInclude.reset();
    }

    function addEvent(){

      // var $formUpdate = document.forms["form-update"];
    
      // if(!!$formUpdate){
      //   $formUpdate.addEventListener("submit", formUpdate);
      // }


      var $editUser = document.querySelectorAll('.edit-user');
      var $removeUser = document.querySelectorAll('.remove-user');

      for(var x = 0; x < $editUser.length; x++){
        $editUser[x].addEventListener('click', clickEdit);
      }

      for(var x = 0; x < $removeUser.length; x++){
        $removeUser[x].addEventListener('click', clickRemove);
      }
    }

    function clickEdit(e){
      e.preventDefault();
      var editId = this.getAttribute('id');
      updateContent(arrUser, editId);
    }

    function clickRemove(e){
      e.preventDefault();
      var removeId = this.getAttribute('id');
      var arrFilter = arrUser.filter(data => data.id != removeId);

      arrUser = arrFilter;
      updateContent(arrUser);
    }

    function formUpdate(e) {
      e.preventDefault();
      var elements = e.target.elements;
      var updateId;
      var dataId = [...elements].filter(d => d.tagName === 'BUTTON');
 
      dataId.forEach(data => {
        if(data.getAttribute('type') === 'submit'){
          updateId = data.getAttribute('id');
        }
      });

      updateId = parseInt(updateId, 10);

      arrUser.forEach(data => {
        if(data.id === updateId){
          data.name = elements.name.value;
          data.age = elements.age.value;
          data.city = elements.city.value;
        }
      });

      updateContent(arrUser);
    }

    //create user obj
    function User(id, name, age, city) {
      this.id = id;
      this.name = name;
      this.age = age;
      this.city = city;
    }

    // update table tr
    function updateContent(arr, id){
      var content = '';
      id = parseInt(id, 10);

      arr.forEach(data => {
        if(data.id === id){
          content += createRowEdit(data);
        } else {
          content += createRow(data);        
        }

      });
      
      $tBody.innerHTML = content;

      addEvent();
    }

    //creating dom by params array
    function createRow(data) {
      var rowContent =
        '<tr class="row" id="' + data.id + '">' +
            '<td>' +
            '<strong>' + data.id + '</strong>' +
            '</td>' +
            '<td class="col">' + data.name + '</td>' +
            '<td class="col">' + data.age + '</td>' +
            '<td class="col">' + data.city + '</td>' +
            '<td class="col">' +
              '<button type="button" class="btn btn-default mr-1 edit-user" id="' + data.id + '">' +
                '<i class="fas fa-pencil-alt"></i>' +
              '</button>' +
              '<button type="button" class="btn btn-default remove-user" id="' + data.id + '">' +
                '<i class="fas fa-times"></i>' +
              '</button>' +
            '</td>' +
        '</tr>';

      return rowContent;
    }

    function createRowEdit(data){
      var rowContent =
          '<tr class="row" id="' + data.id + '">' +
                '<td>' +
                  '<strong>' + data.id + '</strong>' +
                '</td>' +
                '<td class="col">' + 
                  '<div class="col-md-12">' + 
                    '<input type="text" name="name" class="form-control" id="name" value="' + data.name + '" required />' +
                  '</div>' +
                '</td>' +
                '<td class="col">' + 
                  '<div class="col-md-12">' + 
                    '<input type="text" name="age" class="form-control" id="age" value="' + data.age + '" required />' +
                  '</div>' +
                '</td>' +
                '<td class="col">' + 
                  '<div class="col-md-12">' + 
                    '<input type="text" name="city" class="form-control" id="city" value="' + data.city + '" required />' +
                  '</div>' +
                '</td>' +
                '<td class="col">' +
                  '<button type="submit" class="btn btn-default update-user" id="' + data.id + '">' +
                    '<i class="fas fa-check"></i>' +
                  '</button>' +
                '</td>' +
            '</tr>';

      return rowContent;
    }

  });
})();