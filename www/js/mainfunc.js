    // ########################################
    // ## globale Variablen
    // ########################################
    var sendmethod    = 'POST';
    var serverurl     = 'http://192.168.178.100/cnmza/serverload';
    var soapfunction2 = 'func';
    var soapfunction3 = 'Token';
    var user          = 'username';
    var pass          = 'pass'; 
    // einstiegspunkt
    window.onload = token; 


  // ####################################################
  // ## legt die ankommende xml in eine string variable
  // ####################################################
function readBody(xhr) 
{
      var data;
      if (!xhr.responseType || xhr.responseType === "text") 
      {
          data = xhr.responseText;
      } 
      else if (xhr.responseType === "document") 
      {
          data = xhr.responseXML;
      } 
      else 
      {
          data = xhr.response;
      }
      return getvalue(data);
}
function getFunction() 
{
    if(localStorage.getItem('Token')=== false|| localStorage.getItem('Token')== 'false'){token();}
    // ###############################################################################
    // ## abrufen und einbinden neuer funktionen
    // ###############################################################################
    $('#function').append(localStorage.getItem('item_func1'));
    // ###############################################################################
    // ## instanzierung und öffnen der verbindung zum soapserver
    // ###############################################################################
    var xhr = new XMLHttpRequest();
    xhr.open(sendmethod, serverurl, true);
    var src =
    // ###############################################################################
    // ## aufbau den xml string
    // ###############################################################################
            '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"'+
            ' xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'+
            ' xmlns:urn="urn:math">'+
              '<soapenv:Body>'+
              // ## urn:<soapfunktion
                '<urn:'+soapfunction2+' soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">'+
                // ## übergebende variablen
                    '<a xsi:type="xsd:string">'+ '57955721585' +'</a>'+
                '</urn:'+soapfunction2+'>'+
              '</soapenv:Body>'+
            '</soapenv:Envelope>';
    // ###################################################
    // ## weiteres vorgehen nach dem absenden wenn sich 
    // ## der readystate ändert
    // ###################################################
    xhr.onreadystatechange = function () 
    {
      if (xhr.readyState == 4) 
      {
        if (xhr.status == 200) 
        {
          save(readBody(xhr),'func');
          $('#function').empty();
          $('#function').append(readBody(xhr));
          getinfo();
        }
        }
    };
    // #######################################################
    // ## verifizierung und absenden der xml
    // #######################################################
    xhr.setRequestHeader("Authorization", 'Basic '+ btoa(user+':'+pass));
    xhr.send(src);
}
function token(a=0)
{
    if(localStorage.getItem('Token') == 'false' || localStorage.getItem('Token') == null)
    {
      // ###############################################################################
      // ## abrufen und einbinden neuer funktionen
      // ###############################################################################
      $('#answer').empty();
      if(a==1){$('#answer').append('<h1><center>Falsche Login-Daten');}
      $('#answer').append('<center><form method="POST" action="">'
                               +'<table>'
                               +'  <tbody>'
                               +'    <tr>'
                               +'      <th>'
                               +'        <label for="login">Benutzer</label>'
                               +'      </th>'
                               +'      <td>'
                               +'        <input id="login" name="login">'
                               +'      </td>'
                               +'    </tr>'
                               +'    <tr>'
                               +'      <th>'
                               +'        <label for="pass">Passwort</label>'
                               +'      </th>'
                               +'        <td>'
                               +'          <input id="pass" name="pass" type="password">'
                               +'        </td>'
                               +'      </tr>'
                               +'        <tr>'
                               +'          <td>'
                               +'        </td>'
                               +'        <td>'
                               +'          <input type="button" value="Login" onclick="getToken();" />'
                               +'        </td>'
                               +'      </tr>'
                               +'    </tbody>'
                               +'  </table>'
                               +'</form>');
    
    }
    else
    {
    getFunction();
    }
}
function getToken()
  {
    // ###############################################################################
    // ## instanzierung und öffnen der verbindung zum soapserver
    // ###############################################################################
    var xhr      = new XMLHttpRequest();
    var userlog  = btoa(document.getElementById("login").value);
    var passlog  = btoa(document.getElementById("pass").value);
    xhr.open(sendmethod, serverurl, true);
    var src =
    // ###############################################################################
    // ## aufbau den xml string
    // ###############################################################################
            '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"'+
            ' xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"'+
            ' xmlns:urn="urn:math">'+
              '<soapenv:Body>'+
              // ## urn:<soapfunktion
                '<urn:'+soapfunction3+' soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">'+
                // ## übergebende variablen
                    '<a xsi:type="xsd:string">'+ userlog +'</a>'+
                    '<b xsi:type="xsd:string">'+ passlog +'</b>'+
                '</urn:'+soapfunction3+'>'+
              '</soapenv:Body>'+
            '</soapenv:Envelope>';
    // ###################################################
    // ## weiteres vorgehen nach dem absenden wenn sich 
    // ## der readystate ändert
    // ###################################################
    xhr.onreadystatechange = function () 
    {
      if (xhr.readyState == 4) 
      {
        if (xhr.status == 200) 
        {
          saveToken(readBody(xhr));
          var check = saveToken(readBody(xhr));
          if(check)
          {
            getFunction();
          }
          else
          { 
            token(1);
          }
        }
        else
        {
          $('#answer').empty();
          $('#answer').append('<h1><center>Keine Verbindung zum Login-Server');
        }
      }
    }
    // #######################################################
    // ## verifizierung und absenden der xml
    // #######################################################
    xhr.setRequestHeader("Authorization", 'Basic '+ btoa(user+':'+pass));
    xhr.send(src);

}
// ######################################################
// ## liest die eingehende result meldung vom server aus
// ######################################################
function getvalue(xml)
{
    xmlDoc = $.parseXML( xml ),
    $xml = $( xmlDoc ),
    value = $xml.find( "Result" );
    tmp =value.text();
    if(tmp==''){return false }
    if(tmp!=''){return tmp}; 
}
// ##############################################################
// ## daten schreiben
// ##############################################################
function save(dom, index)
{
      i= index+1;
      localStorage.setItem('item_'+i, dom);

}
function saveToken(dom)
{
    if(dom==false){return false;}
    localStorage.setItem('Token', dom);
    return true;
}
function clean()
{
    localStorage.clear();
}
function reload()
{
  location.reload();
}
function geterror(xml)
{
    xmlDoc = $.parseXML( xml ),
    $xml = $( xmlDoc ),
    value = $xml.find( "faultcode" );
    tmp =value.text();
    saveToken(tmp,true);
  
}
