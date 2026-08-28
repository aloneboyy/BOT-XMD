const config = require('../config');

function isSudo(number) {
    if (!number) return false;
    const clean = number.toString().replace(/[^0-9]/g, '');
    const sudoList = Array.isArray(config.SUDO) ? config.SUDO : [];
    return sudoList.some(n => n.toString().replace(/[^0-9]/g, '') === clean);
}

module.exports = { isSudo };
