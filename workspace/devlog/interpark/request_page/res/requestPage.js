jQry = jQuery.noConflict();

function request() {
    const form = document.createElement("form");

    let charset = getCharset();
    let parameterType = getParameterType();
    let url = getUrl();
    let parameters = getQueryString().split("&");

    form.setAttribute("charset", charset);
    form.setAttribute("method", parameterType);
    form.setAttribute("action", url);

    for(let i=0; i < parameters.length; i++) {
        const equalIndex = parameters[i].indexOf("=");
        let name = parameters[i].substring(0, equalIndex);
        console.log("name : " + name);
        let value = parameters[i].substring(equalIndex + 1, parameters[i].length);
        console.log("value : " + value);

        let param = document.createElement("input");

        param.setAttribute("type", "hidden");
        param.setAttribute("name", name);
        param.setAttribute("value", value);

        form.appendChild(param);
    }

    document.body.appendChild(form);
    form.submit();
}

function getUrl() {
    return jQry("#url").val();
}

function getQueryString() {
    return jQry("#parameter").val();
}

function setQueryString(queryString) {
    jQry("#parameter").val(queryString);
}

function getParameterType() {
    if(jQry("#getBtn").parents("label").hasClass("active") === true)
        return "GET";

    if(jQry("#postBtn").parents("label").hasClass("active") === true)
        return "POST";
}

function getCharset() {
    return jQry("#charset").html();
}

function setCharset(charset) {
    jQry("#charset").html(charset);
}

function encode() {
    setQueryString(encodeURIComponent(getQueryString()));
}

function decode() {
    setQueryString(decodeURIComponent(getQueryString()));
}