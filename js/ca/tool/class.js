tool('Class');

tools.Class.runtime = {
	powersEquip : [],
	powersOwn : {},
	classId : null,
	classes : {
		1 : 'warrior',
		2 : 'rogue',
		3 : 'mage',
		4 : 'cleric'
	},
	classSet : null
};

tools.Class.start = function() {
	get('guild_class_power_equipment.php', function(_data) {
		tools.Class.showClass(_data);
	});
};
tools.Class.showClass = function(_data) {
	$('#cageClasses, #cageClassPower, #cageClassSave, #cageClassPowerSelector').empty();
	//Get current class and setup class selector
	tools.Class.runtime.classId = parseInt($('input[name="class_id"]', _data).val(), 10);
	tools.Class.runtime.classSet = tools.Class.runtime.classes[tools.Class.runtime.classId];
	var _classes = ['cleric', 'mage', 'rogue', 'warrior'];
	$.each(tools.Class.runtime.classes, function() {
		var _set = this.toString(), _img = $('<img id="cageClassImg' + _set + '" src="http://image4.castleagegame.com/graphics/g_char_select' + _set + '.jpg">');
		if(_set === tools.Class.runtime.classSet) {
			$('#cageClasses').append(_img.css({
				'opacity' : 0,
				'cursor' : 'no-drop'
			}).fadeTo('slow', 1));
		} else {
			_img.click(function() {
				$('div.cageClassPowerSlot *, #cageClasses > img, #cageClassPowerSelector').hide('fast');
				$('#cageClassPower').show('slow');
				tools.Class.changeClass(_set);
			}).hover(function() {
				$(this).stop().animate({
					'opacity' : 1
				}, 'slow');
			}, function() {
				$(this).stop().animate({
					'opacity' : 0
				}, 'slow');
			});
		}
		$('#cageClasses').append(_img);
	});

	$('#cageClassPower').append((new Array(1 + parseInt($('#guild_class_max_slots', _data).val(), 10))).join('<div class="cageClassPowerSlots"><div class="cageClassPowerSlot"></div></div>'));
	// available powers
	tools.Class.runtime.powersOwn = {};
	$('input[id^="slot_image_"]', _data).each(function() {
		var _key = /\d+_\d+_\d+/.exec($(this).attr('id'))[0]
		tools.Class.runtime.powersOwn[_key] = {
			small : 'http://image4.castleagegame.com/graphics/' + $(this).val(),
			big : $(this).next('div.imgButton').find('img').attr('src')
		};
		$('#cageClassPowerSelector').append('<img src="' + tools.Class.runtime.powersOwn[_key].big + '">')
	});
	console.log(tools.Class.runtime.powersOwn);
	// equipped powers
	$('div[id^="open_power_slot"]', _data).each(function(_index) {
		var _oc = $('div:first', this).attr('onClick'), _t;
		if(_oc !== undefined) {
			var _t = _oc.match(/\d+/g), _e = _t[0] + '_' + _t[1] + '_' + _t[2];
			tools.Class.runtime.powersEquip.push(_e);
			$('div.cageClassPowerSlot:eq(' + _index + ')').append($('<img src="' + tools.Class.runtime.powersOwn[_e].small + '">').click(function() {
				//console.log($(this).parent().data('slot'));
				//console.log($(this).position().top);
				//var _slot = $(this).parent().data('slot'), _top = 60 * (_slot + 1) + _slot;
				$('#cageClassPower').hide('slow');
				$('#cageClassPowerSelector').show('slow');
			}).fadeTo('slow', 1)).append('<div class="cageClassPowerText">' + $('#item_desc_' + _e, _data).text().trim() + '</div>');
		}
		$('div.cageClassPowerSlot:eq(' + _index + ')').data('slot', _index);
	});
	// save
	$('#cageClassSave').append($('<div style="cursor:pointer;display:inline-block;width:125px;overflow:hidden;background-image:url(http://image4.castleagegame.com/graphics/class_savenew.jpg);"><img style="opacity:0" src="http://image4.castleagegame.com/graphics/class_savenew_rollover.jpg"></div>').click(function() {
		//save
	}).hover(function() {
		$('img', this).stop().animate({
			'opacity' : 1
		}, 'slow');
	}, function() {
		$('img', this).stop().animate({
			'opacity' : 0
		}, 'slow');
	}));
	// cancel
	$('#cageClassSave').append($('<div style="cursor:pointer;display:inline-block;width:133px;overflow:hidden;background-image:url(http://image4.castleagegame.com/graphics/class_cancelnew.jpg);"><img style="opacity:0" src="http://image4.castleagegame.com/graphics/class_cancelnew_rollover.jpg"></div>').click(tools.Class.done).hover(function() {
		$('img', this).stop().animate({
			'opacity' : 1
		}, 'slow');
	}, function() {
		$('img', this).stop().animate({
			'opacity' : 0
		}, 'slow');
	}));

	$('#cageClassContainer').animate({
		'top' : 139
	}, 'slow');
}
tools.Class.changeClass = function(_class) {

	get('guild_class_power_equipment.php?action=chooseClass&' + _class + '=' + _class, function(_data) {
		tools.Class.showClass(_data);
	});
};
tools.Class.done = function() {
	$('#cageClassContainer').animate({
		'top' : -200
	}, 'slow');
	tools.Class.fbButton.enable();
};
tools.Class.init = function() {
	$('#cageContainer').append('<div id="cageClassContainer" class="ui-widget-content"><div id="cageClasses" style="width:603px;height:50px;background-image:url(http://image4.castleagegame.com/graphics/g_char_selectchar_plate.gif);"></div><div id="cageClassPower"></div><div id="cageClassPowerSelector"></div><div id="cageClassSave"></div></div>');
	tools.Class.fbButton.add('Class', function() {
		tools.Class.fbButton.disable();
		tools.Class.start();
	});
};
