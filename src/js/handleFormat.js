'use strict';

/**
 * @param {String} commandName - name of the command for execCommand()
 * @param {String} [valueArg=null] - argument parameter for execCommand(). Default to null.
 * */
function handleFormat(commandName, valueArg=null) {
    document.execCommand(commandName, false, valueArg);
}

export default handleFormat