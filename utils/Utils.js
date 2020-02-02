export default {
    normalizeBeforeSend(object) {
        let temp = {};
        for (let key in object) {
            if (key !== '_id')
                temp[key] = new String(object[key]);
        }
        return temp;
    },

    networkErrorHandler(error, context){
        let errorObj;
        if (error.response) {
            errorObj = {type: 'response', error: error.response.data}
        }else if(error.request){
            errorObj = {type: 'request', error: error.request}
        }else{
            errorObj = {type: 'left', error: error.message};
        }
        context.commit('setLastError', errorObj, {root: true});
        return  errorObj;
    },

    generateErrorText(error) {
        let msg = '';
        switch (error.type) {
            case 'response':
                msg += `ошибка сервера`
        }
    }
}

