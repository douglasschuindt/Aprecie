var configuracoes = {
	baseUrl: 'static',

	deps: [
		'app/excecoes/violacaoDeRegra',
		'app/excecoes/erroInesperado',
		'app/helpers/string',
	],

	paths: {
		'text': 'app/lib/requirejs-text/text',
		'jquery': 'app/lib/jquery/dist/jquery',
		'jquery-ui': 'app/lib/jquery-ui/jquery-ui',
		'jquery.inputmask': 'app/lib/jquery.inputmask/dist/jquery.inputmask.bundle',
		'jquery.blockui': 'app/lib/blockUI/jquery.blockUI',
		'handlebars': 'app/lib/handlebars/handlebars.amd',
		'director': 'app/lib/director/build/director',
		'sandbox': 'app/sandbox',
		'gerenciadorDeModulos': 'app/gerenciadorDeModulos',
		'roteador': 'app/roteador',
		'configuracoes': 'app/configuracoes',
		'template': 'app/helpers/template',
		'cookie': 'app/helpers/cookie',
		'growl': 'app/helpers/growl',
		'sessaoDeUsuario': 'app/models/sessaoDeUsuario'
	},

	shim: {
		'jquery': {
			exports: '$'
		},

		'jquery-ui': {
			deps: ['jquery'],
			exports: '$'
		},

		'jquery.inputmask': {
			deps: ['jquery'],
			exports: '$'
		},

		'director': {
			exports: 'Router'
		}
	}
};

// TODO: Automatizar essa feiura na build
var ehDebug = document.getElementById('ehDebug').value === 'True';
configuracoes.urlArgs = ehDebug ? 'antiCache=' + (new Date()).getTime() : 'antiCache=4';

require.config(configuracoes);

require([
	'roteador',
	'configuracoes',

	// TODO: Colocar no "deps" do RequireJS
	'jquery.inputmask'
], function(roteador, configuracoes) {
	'use strict';

	roteador.configurar();
	configuracoes.configurarDebug(ehDebug);
	configuracoes.configurarErros();
	configuracoes.configurarErrosDeRequisicao();
	configuracoes.registrarHelpersGlobaisDoHandlebars();

	if (roteador.paginaAtual() === '')
		roteador.navegarPara('/login');
});