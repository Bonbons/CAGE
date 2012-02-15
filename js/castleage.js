// CAGE stuff working on Castle Age site
var CastleAge = {
	bqh : null,
	signed_request : null,
	userId : null,
	inGuild : null,
	startInterval : null,
	started : false
};

com.initPort(com.port.castleAge);

var _append = '';
$.each(['css/cage.css', 'css/ca_cage.css', 'css/ca_stats.css', 'css/ca_general.css', 'css/ca_monster.css', 'css/ui.selectmenu.css', 'css/settings.css'], function(_i, _e) {
	_append += '<link rel="stylesheet" type="text/css" href="' + getPath(_e) + '" >';
});
_append += '<link id="cageTheme" rel="stylesheet" type="text/css" href="' + getPath('css/dark-hive/jquery-ui.css') + '" >';
_append += '<script type="text/javascript" language="javascript" src="' + getPath('js/jquery.js') + '"></script>';

$(document.body).append($('<input>').attr({
	'id' : 'signed_request',
	'type' : 'hidden'
})).append(_append);
_append = _css = undefined;

// Add CAGE container
$('center:first').prepend('<div id="cageContainer"><div id="cageStatsContainer"></div><div id="cageToolsContainer" class="ui-widget-content ui-corner-bottom"></div></div>');
$('#main_bntp, #nvbar_div_end, #hinvite_help').remove();
$('#nvbar_table').empty();

//rework stats
$('#cageStatsContainer')
	.append('<div style="border-bottom: 1px solid #CAA47F;width: 126px;top: 52px;z-index: 1;left: 49px;position: absolute;"><strong style="display: inline-block;float: left;font-family: serif;font-style: italic;font-size: 13px;color: #4B3715;">Gold</strong></div>')
	.append('<div style="border-bottom: 1px solid #CAA47F;width: 110px;top: 52px;z-index: 1;left: 216px;position: absolute;"><strong style="display: inline-block;float: left;font-family: serif;font-style: italic;font-size: 13px;color: #4B3715;">Energy</strong></div>')
	.append('<div style="border-bottom: 1px solid #CAA47F;width: 111px;top: 52px;z-index: 1;left: 366px;position: absolute;"><strong style="display: inline-block;float: left;font-family: serif;font-style: italic;font-size: 13px;color: #4B3715;">Health</strong></div>')
	.append('<div style="border-bottom: 1px solid #CAA47F;width: 110px;top: 52px;z-index: 1;left: 518px;position: absolute;"><strong style="display: inline-block;float: left;font-family: serif;font-style: italic;font-size: 13px;color: #4B3715;">Stamina</strong></div>')

tools.Page.runtime.allPages();

CastleAge.startInterval = window.setInterval(function() {
	if(CastleAge.signed_request !== null && CastleAge.userId !== null) {
		window.clearInterval(CastleAge.startInterval);
		window.setInterval(function() {
			com.send(com.task.alive, com.port.facebook, null);
		}, 600000);
		initTools();
		var _startURL = $('#current_pg_url').attr('value');
		if(_startURL.indexOf('?') !== -1) {
			_startURL = _startURL.substring(0, _startURL.indexOf('?'));
		}
		console.log("URL:" + _startURL);
		if(tools.Page.runtime[_startURL]) {
			tools.Page.runtime[_startURL]();
		}
		_startURL = undefined;
	} else {
		com.send(com.task.castleAgeReady, com.port.facebook);
	}
}, 100);
