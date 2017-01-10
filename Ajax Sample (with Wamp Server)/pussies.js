$(document).ready(function(){
	$('#generate').click(function(){
		$.get('pussies.mst', function (template) {
			Mustache.parse(template);

			$.ajax({
				url: 'pussies.json',
				dataType: 'json',
				complete: function (data) {
					notie.alert(1, 'PUSSIES GENERATED!!!', 3);
					data.responseJSON.forEach(function(item){
						var rendered = Mustache.render(template, item);
						$(rendered)
						.data(item)
						.appendTo($("#image-grid")).mouseenter(function(){
							var name = $(this).data('name') || "Pussy";
							var meow = $(this).data('meow') || "Meow! Meow!";
							notie.alert(4, name + ' says: "' + meow + '"', 2);
						});
					});
					$("#image-grid").masonry({
						itemSelector: '.image-grid-item',
						gutter: 10,
						columnWidth: 200
					});
				},
				failure: function (error) {
					notie.error('NO PUSSIES!!!');
				}
			});
		});
	});
});