$(function () {
  $('#post-comment').hide();
  $('#btn-comment').on('click',function (event) {
    event.preventDefault();

    $('#post-comment').show();
  })

  $('#btn-like').on('click',function(e){
    e.preventDefault();
    var imgId = $(this).data('id');

    $.post('/images/' + imgId + '/like').done(function(data){
      $('.likes-count').text(data.likes);
    });

  });

  $('#btn-delete').on('click', function (e) {  
    e.preventDefault();

    var self = $(this);

    var remove = confirm('Are you sure you want to delete this image?');
    if(remove){
      var imgId = self.data('id');
      $.ajax({
        url : '/images/' + imgId,
        type: 'DELETE'
      }).done(function (result) {  
        
        if(result){
          self.removeClass('btn-danger').addClass('btn-success');
          self.find('i').removeClass('fa-times').addClass('fa-check');
          self.append('<span>Deleted!</span>');
        }
      });
    }
  })
  
});