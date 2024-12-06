// load all cookies as an array of key value pairs
var cookies = document.cookie
                      .split('; ')
                      .map(x => x.split('='));

// turn cookies into a Map
cookies = new Map(cookies);

function SetCookie(key, value, timeoutDays){
    var expiryString = "";
    if(timeoutDays){
        const d = new Date();
        d.setTime(d.getTime() + (timeoutDays*24*60*60*1000));
        expiryString = `expires=${d.toUTCString()}`;
    }
    
    document.cookie = `${key}=${value};SameSite=strict;${expiryString}`;
    cookies.set(key, value);
}
      
function GetCookie(key) { return cookies.get(key); }
