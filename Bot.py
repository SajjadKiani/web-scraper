
from telegram.ext.updater import Updater
from telegram.update import Update
from telegram.ext.callbackcontext import CallbackContext
from telegram.ext.commandhandler import CommandHandler
from telegram.ext.messagehandler import MessageHandler
from telegram.ext.filters import Filters

updater = Updater("5568379439:AAGWvl2n-5ux2GMcQU-NKC2TYQZQZq61Iks",
				use_context=True)

def bot(data):

    def start(update: Update, context: CallbackContext):
        update.message.reply_text(data)

    updater.dispatcher.add_handler(CommandHandler('start', start))

    updater.start_polling()

if __name__ == '__main__':
    print ('starting bot')