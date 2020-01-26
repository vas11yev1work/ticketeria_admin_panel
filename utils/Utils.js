export default {
    normalizeBeforeSend(object) {
        let temp = {};
        for (let key in object) {
            if (key !== '_id')
                temp[key] = new String(object[key]);
        }
        return temp;
    },

    generateErrorText(error) {
        let msg = '';
        switch (error.type) {
            case 'response':
                msg += `ошибка сервера`
        }
    }
}

