'use strict';

module.exports = function (t, a) {
	a.deep(t('${x.raz} \\${$\\{ f${prik()}oo ${maroko}\n\\$mis\\1k\\2o' +
		'${markas()}${x.moled}ech${}eloo$${x.su}elo${marko'),
		{ literals: ['', ' ${$\\{ f', 'oo ', '\n$mis\\1k\\2o', '', 'ech', 'eloo$',
			'elo${marko'], substitutions: ['x.raz', 'prik()', 'maroko', 'markas()',
				'x.moled', '', 'x.su'] }, "#1");

	a.deep(t('ula${melo}far${ulo}'), { literals: ['ula', 'far', ''],
		substitutions: ['melo', 'ulo'] }, "#2");

	a.deep(t('${melo}far${ulo}ula'), { literals: ['', 'far', 'ula'],
		substitutions: ['melo', 'ulo'] }, "#3");
};
