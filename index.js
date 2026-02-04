require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  Partials
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

client.once('ready', () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  try {
    // 🔒 evita doble reply (esto es CLAVE)
    if (interaction.replied || interaction.deferred) return;

    if (interaction.customId === 'general') {
      await interaction.reply({
        content: '📩 Ticket general creado',
        ephemeral: true
      });
    }

  } catch (error) {
    console.error('❌ Error en interacción:', error);
  }
});

client.login(process.env.DISCORD_TOKEN);

const http = require("http");

const PORT = process.env.PORT || 8000;

http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Bot activo y funcionando");
}).listen(PORT, () => {
  console.log(`🌐 Servidor web escuchando en el puerto ${PORT}`);
});
