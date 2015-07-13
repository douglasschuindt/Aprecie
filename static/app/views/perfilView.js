define([
	'jquery',
	'handlebars',
	'text!partials/perfilTemplate.html',
	'sessaoDeUsuario',
	'app/views/iconesDosValoresHelpers'
], function($, Handlebars, perfilTemplate, sessaoDeUsuario) {
	'use strict';

	var perfilView = {};

	perfilView.exibir = function(colaboradorId) {
		var data = {
			id_do_reconhecido: colaboradorId
		};

		$.getJSON('/reconhecimentos/funcionario/', data, function(reconhecimentosDoColaborador) {
			var template = Handlebars.compile(perfilTemplate);
			$('#conteudo').empty().html(template(reconhecimentosDoColaborador));

			$('#conteudo').off()
				.on('click', 'span[data-js="abrirJustificativa"]', abrirJustificativa)
				.on('click', 'button[data-js="reconhecer"]', reconhecer)
				.on('click', 'button[data-js="fecharJustificativa"]', fecharJustificativa);

			if (sessaoDeUsuario.id !== colaboradorId) {
				$('span[data-js="abrirJustificativa"]').show();
				$('#conteudo').on('click', 'button[data-js="fecharJustificativa"]', fecharJustificativa);
			}
		});
	};

	function abrirJustificativa() {
		var objetoClicado = this;

		require(['growl'], function(growl) {
			var valorId = $(objetoClicado).data('valor-id');

			$('#valorId').val(valorId);

			$('div[data-js="justificativa"]').dialog({
				title: 'Justificativa',
				width: 320,
				autoOpen: true,
				appendTo: '#conteudo',
				modal: true,
				close: function() {
					growl.esconder();
				}
			});
		});
	}

	function reconhecer() {
		require([
			'app/models/reconhecerViewModel',
			'growl'
		], function(ReconhecerViewModel, growl) {
			var reconhecerViewModel = new ReconhecerViewModel();
			validarOperacao(reconhecerViewModel);

			$.post('/reconhecimentos/reconhecer/', reconhecerViewModel, function() {
				fecharJustificativa();
				growl.deSucesso().exibir('Reconhecimento realizado com sucesso');
				perfilView.exibir(reconhecerViewModel.id_do_reconhecido);
			});
		});
	}

	function validarOperacao(reconhecerViewModel) {
		if (reconhecerViewModel.justificativa === '')
			throw new ViolacaoDeRegra('Sua justificativa deve ser informada');
	}

	function fecharJustificativa() {
		$('div[data-js="justificativa"]').dialog('close');
	}

	return perfilView;
});