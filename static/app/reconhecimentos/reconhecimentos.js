define([
	'jquery',
	'template',
	'text!app/reconhecimentos/reconhecimentosTemplate.html',
	'sessaoDeUsuario',
	'app/helpers/iconesDosValoresHelpers'
], function($, template, reconhecimentosTemplate, sessaoDeUsuario) {
	'use strict';

	var _self = {};

	_self.inicializar = function(sandbox, colaboradorId, valorId) {
		$('#conteudo')
			.off()
			.on('click', '[data-js="voltar-ao-perfil"]', function() {
				voltarParaPerfil(colaboradorId);
			});

		$.getJSON('/reconhecimentos/' + colaboradorId + '/' + valorId, {}, function(resposta) {
			template.exibir(reconhecimentosTemplate, resposta);

			if (sessaoDeUsuario.id !== colaboradorId) {
				$('p[data-js="reconhecer"], button[data-js="reconhecer"]').show();
				$('#conteudo').on('click', 'button[data-js="reconhecer"]', reconhecer);
			}
		});
	};

	function reconhecer() {
		require([
			'app/models/reconhecerViewModel',
			'growl',
			'roteador'
		], function(ReconhecerViewModel, growl, roteador) {
			var reconhecerViewModel = new ReconhecerViewModel();
			validarOperacao(reconhecerViewModel);

			$.post('/reconhecimentos/reconhecer/', reconhecerViewModel, function() {
				growl.deSucesso().exibir('Reconhecimento realizado com sucesso');
				roteador.atualizar();
			});
		});
	}

	function validarOperacao(reconhecerViewModel) {
		if (reconhecerViewModel.situacao === '')
			throw new ViolacaoDeRegra('A situação deve ser informada');

		if (reconhecerViewModel.comportamento === '')
			throw new ViolacaoDeRegra('O comportamento que a pessoa exibiu deve ser informado');

		if (reconhecerViewModel.impacto === '')
			throw new ViolacaoDeRegra('O impacto que isso gerou deve ser informado');
	}

	function voltarParaPerfil(reconhecidoId) {
		require(['roteador'], function(roteador) {
			roteador.navegarPara('/perfil/' + reconhecidoId);
		});
	}

	return _self;
});