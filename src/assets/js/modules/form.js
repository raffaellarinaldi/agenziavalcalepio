jQuery(document).ready(function($) {
  $("#contact-form").submit(function(e) {
    e.preventDefault();
    var $form = $(this);
    $.post($form.attr("action"), $form.serialize())
    .then(function() {
      $("#form-result").html
      (`<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Grazie!</strong> La richiesta è stata inviata, ti ricontatteremo al più presto.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`);
      $($form).each(function(){
        this.reset();
      });
    })
    .catch(function(error){
      $("#form-result").html
      (`<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Errore!</strong> La richiesta non è stata inviata, per favore riprova più tardi.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`);
    });
  });
});
