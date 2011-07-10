function startCAGE() {
	$('div.fixedAux').css({
		'width': 245,
		'border': 0
	}).empty()
		.append(
			$('<div id="cageGeneralContainer" class="ui-corner-br ui-state-default"></div>')
				.append($('<div id="cageGeneralImageContainer" class="ui-state-active ui-corner-all"></div>')
						.append('<img id="cageGeneralImage" class="ui-corner-all" />'))
					.append('<span id="cageGeneralName" class="ui-state-active ui-corner-right"></span>'))
		.append('<div id="cageToolsContainer" class="ui-state-default ui-corner-right"></div>');
	console.log('init fb');
	initTools();
	com.send(com.task.signed, com.port.castleAge, $('input[name="signed_request"]').attr('value'));
	com.send(com.task.getGeneral, com.port.castleAge, null);
}
