// monster stats
tools['Page'].runtime['battle_monster.php'] = function () {

	console.log('Page: battle_monster.php');

	// add health percentage to monster name
	var _health = $('img[src*="monster_health_background.jpg"],[src*="nm_red.jpg"]').parent()[0];
	var _monstername = $('#app_body div:contains("\'s Life"):last, #app_body div:contains("\'s life"):last');
	if(_health && _health.style && _health.style.width !== "" && _monstername && _monstername.text()) {
		_monstername.text(_monstername.text() + ' (' + _health.style.width.substr(0,5) + '%)');
	}

	// add percentage to defense/forcefield/..
	var _defense = $('img[src*="bar_dispel.gif"],[src*="nm_green.jpg"],[src*="seamonster_ship_health.jpg"]').parent()[0];
	var _defText = $('#app_body div:textEquals("Party Health/Strength "):first, #app_body div:textEquals("Skaar\'s Mana Forcefield "):first, #app_body div:textEquals("Illvasa, Plateau City\'s Defense "):first, #app_body div:textEquals("Castle Defense"):first, #app_body div:textEquals("Your Ship\'s Defense"):first');
	if(_defense && _defense.style && _defense.style.width !== "" && _defText && _defText.text()) {
		_defText.text(_defText.text() + ' (' + _defense.style.width.substr(0,5) + '%) ');
	}
	// fix for monster timer
	addFunction(new Function($('#monsterTicker').next('script').html()), null, true, true);

};