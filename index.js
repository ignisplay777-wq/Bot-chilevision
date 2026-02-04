require('dotenv').config();
const {
  Client,
  GatewayIntentBits,
  Partials,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

// 🔧 CONFIGURACIÓN
const PANEL_CHANNEL_ID = '1468368365419757643';
const CANAL_PRIVADO_ID = '1468376954037211197';

// ✅ BOT LISTO
client.once('ready', () => {
  console.log(`📺 Bot Chilevisión conectado como ${client.user.tag}`);
});

// 📩 COMANDO !panel
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.content !== '!panel') return;
  if (message.channel.id !== PANEL_CHANNEL_ID) return;

  const embed = new EmbedBuilder()
    .setTitle('📺 Chilevisión Noticias')
    .setDescription(
      '**¿Por qué vienes a Chilevisión?**\nServidor oficial de **Chileviva Roleplay**'
    )
    .setColor('#e50914');

  const botones = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('trabajar')
      .setLabel('🛠️ A trabajar')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('noticias')
      .setLabel('📰 A ver noticias')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('publicidad')
      .setLabel('📣 A publicitar mi negocio')
      .setStyle(ButtonStyle.Success)
  );

  await message.channel.send({
    embeds: [embed],
    components: [botones]
  });
});

// 🔘 BOTONES
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  const opciones = {
    trabajar: '🛠️ A trabajar',
    noticias: '📰 A ver noticias',
    publicidad: '📣 A publicitar mi negocio'
  };

  if (!opciones[interaction.customId]) return;

  const canal = await interaction.guild.channels.fetch(CANAL_PRIVADO_ID);

  const embedResultado = new EmbedBuilder()
    .setTitle('📥 Nueva solicitud Chilevisión')
    .addFields(
      { name: '👤 Usuario', value: interaction.user.tag },
      { name: '📌 Motivo', value: opciones[interaction.customId] }
    )
    .setColor('#e50914')
    .setTimestamp();

  await canal.send({ embeds: [embedResultado] });

  await interaction.reply({
    content: '✅ Tu solicitud fue enviada al equipo de Chilevisión.',
    ephemeral: true
  });
});

// 🔐 LOGIN
client.login(process.env.TOKEN);
