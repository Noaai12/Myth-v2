module.exports = {
  config: {
    nama: "admin",
    penulis: "Hady Zen",
    kuldown: 10,
    peran: 2,
    tutor: "<list/add/del>"
  },
  Alya: async function(api, message, args) {
    const fs = require('fs');
    const noah = JSON.parse(fs.readFileSync('config.json', 'utf8'));

    switch (args[0]) {
      case 'list':
        api.sendMessage(noah.admin.join('\n'), message.threadID, message.messageID);
        break;
      case 'add':
        if (args.length < 2) return api.sendMessage('Masukkan nama admin!', message.threadID, message.messageID);
        noah.admin.push(args[1]);
        fs.writeFileSync('config.json', JSON.stringify(noah, null, 2));
        api.sendMessage('Admin berhasil ditambahkan!', message.threadID, message.messageID);
        break;
      case 'del':
        if (args.length < 2) return api.sendMessage('Masukkan nama admin!', message.threadID, message.messageID);
        const index = noah.admin.indexOf(args[1]);
        if (index !== -1) {
          noah.admin.splice(index, 1);
          fs.writeFileSync('config.json', JSON.stringify(noah, null, 2));
          api.sendMessage('Admin berhasil dihapus!', message.threadID, message.messageID);
        } else {
          api.sendMessage('Admin tidak ditemukan!', message.threadID, message.messageID);
        }
        break;
      default:
        api.sendMessage('Perintah tidak valid! Gunakan <list/add/del>', message.threadID, message.messageID);
    }
  }
};
