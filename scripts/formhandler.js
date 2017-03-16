var modal_pop = false;
//var powerEmail = '';
var $ = window.jQuery;
(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();
            var strength = $('#strengthLevel').val();
            var flavor = $('#flavorshot').find(':selected').val();
            var size = $('input[name=size]:checked').val();
            var email = $('input[name=emailAddress]').val();
            console.log(email);
            //HANDLE MODAL
            if (strength == 100 && email != '' && flavor != '' && size === 'coffeezilla' && modal_pop === false) {

                console.log('Modal displays');
                modal_pop = true;
                $('#myModal').modal('show');
            } else if (strength == 100 && email == '' && flavor != '' && size === 'coffeezilla' && modal_pop === false) {
                //HANDLE MODAL
                console.log('enter email id');
                //  $('#sorrymsg').css('display','block');
                alert('enter your email id');
                //modal_pop = true;

            } else {
                var data = {};
                $(this).serializeArray().forEach(function(item) {
                    data[item.name] = item.value;
                    console.log(item.name + ' is ' + item.value);
                });
                console.log(data);
                fn(data);
                this.reset();
                this.elements[0].focus();
                modal_pop = false;
                $('#powerup').hide();
                $('#range-label').empty();
                $('#range-label').append('Caffeine Rating: 30');
                $('#range-label').css('color', 'green');
            }
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);

$('#strengthLevel').change(function(event) {
    event.preventDefault();
    //var label = document.getElementById('["range-label"]');
    $('#range-label').empty();
    $('#range-label').append('Caffeine Rating: ' + this.value);
    if (this.value <= 33) {
        $('#range-label').css('color', 'green');
    } else if (this.value > 33 && this.value <= 66) {
        $('#range-label').css('color', 'yellow');
    } else {
        $('#range-label').css('color', 'red');
    }
});

$('#claim-bonus').on('click', function() {
    $('#myModal').modal('hide');
    $('#powerup').show();
});

$('#no-bonus').on('click', function() {
    $('#myModal').modal('hide');
});
