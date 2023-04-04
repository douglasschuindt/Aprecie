﻿import pymsteams
from discord import SyncWebhook

from Aprecie import settings

class Notificacoes():

    @staticmethod
    def notificar_no_chat_discord(reconhecedor, reconhecido, pilar):
        if not settings.CHAT_WEBHOOK_URL \
            or not reconhecido.usuario_id_do_chat \
            or not reconhecedor.usuario_id_do_chat:
            return

        mensagem = '**<@{0}>** acabou de ser reconhecido(a) em **{1}** por **<@{2}>**. Olha lá: http://aprecie.digix.com.br' \
            .format(reconhecido.usuario_id_do_chat, pilar.nome, reconhecedor.usuario_id_do_chat)

        webhook = SyncWebhook.from_url(settings.CHAT_WEBHOOK_URL)
        webhook.send(content=mensagem)

    @staticmethod
    def notificar_no_chat_msteams(reconhecedor, reconhecido, pilar, descritivo):
        if not settings.CHAT_WEBHOOK_URL_TEAMS \
            or not reconhecido.usuario_id_do_chat \
            or not reconhecedor.usuario_id_do_chat:
            return

        myTeamsMessage = pymsteams.connectorcard(settings.CHAT_WEBHOOK_URL_TEAMS)
        # create the section
        myMessageSection = pymsteams.cardsection()
        # Section Title
        myMessageSection.title(f"{pilar.nome}")
        # Activity Elements
        myMessageSection.activityTitle(reconhecido.nome)
        
        # myMessageSection.activityImage(reconhecido.foto)

        # Facts are key value pairs displayed in a list.
        myMessageSection.addFact("feito por", reconhecedor.nome)
        # Section Text
        myMessageSection.text(descritivo)
        # Add your section to the connector card object before sending
        myTeamsMessage.addSection(myMessageSection)
        myTeamsMessage.summary("Resumo")
        myTeamsMessage.send()