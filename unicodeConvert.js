var uD = new Object();
var sW = new Object();
var cR = new Object();
var iW = new Object();
iW["cha"] = "chha";
iW["chu"] = "chhu";
iW["chha"] = "chha";
iW["ma"] = "ma";
iW["aba"] = "aba";
iW["nam"] = "naam";
iW["ram"] = "raam";
iW["pani"] = "pani";
iW["lai"] = "laaii";
iW["pai"] = "paaii";
iW["dai"] = "daaii";
iW["bhai"] = "bhaaii";

function translateWords(sent, html) {
  if (sW["smartconverter_on"] == "true")
    sent = sent.replace(/\s*\./g, " .").replace(/\s*\?/g, " ?");
  var words = sent.split(" ");
  var rVal = "";
  var subs;
  for (i = 0; i < words.length; i++) {
    words[i] = words[i].replace(/ri\^/g, "ari^");
    /*special 'tri's need 'a' injected: 'tari' */ if (
      sW["smartconverter_on"] == "true"
    ) {
      if (hasSW(words[i]));
      else if (iW[words[i]]) words[i] = iW[words[i]];
      else if (words[i].length > 3) {
        var ec_0, ec_1, ec_2, ec_3;
        ec_0 = words[i].charAt(words[i].length - 1).toLowerCase();
        ec_1 = words[i].charAt(words[i].length - 2).toLowerCase();
        ec_2 = words[i].charAt(words[i].length - 3).toLowerCase();
        ec_3 = words[i].charAt(words[i].length - 4).toLowerCase();
        if (
          (ec_0 == "a" || ec_0 == "e" || ec_0 == "u") &&
          ec_1 == "h" &&
          ec_2 == "c"
        )
          /*cha->chha, chu->chhu*/ words[i] =
            words[i].substring(0, words[i].length - 3) + "chh" + ec_0;
        else if (ec_0 == "y")
          /*y->ee, ry=ree*/ words[i] =
            words[i].substring(0, words[i].length - 1) + "ree";
        else if (ec_0 == "a" && ec_1 == "h" && ec_2 == "h");
        else if (ec_0 == "a" && ec_1 == "n" && ec_2 == "k");
        else if (ec_0 == "a" && ec_1 == "n" && ec_2 == "h");
        else if (ec_0 == "a" && ec_1 == "n" && ec_2 == "r");
        else if (ec_0 == "a" && ec_1 == "r" && ec_2 == "d" && ec_3 == "n");
        else if (ec_0 == "a" && ec_1 == "r" && ec_2 == "t" && ec_3 == "n");
        else if (
          ec_0 == "a" &&
          (ec_1 == "m" ||
            (!isVowel(ec_1) && !isVowel(ec_3) && ec_1 != "y" && ec_2 != "e"))
        )
          /*ntra->nothing..swatantra*/ words[i] += "a";
        if (ec_0 == "i" && !isVowel(ec_1))
          /*ending i->ee*/ words[i] =
            words[i].substring(0, words[i].length - 1) + "ee";
      }
    }
    subs = words[i].split("/");
    for (j = 0; j < subs.length; j++)
      if (subs[j].length != 0) rVal += getAllUnicode(subs[j], html);
    rVal += " ";
  }
  return rVal;
}
function hasSW(s) {
  var sIndex;
  for (sIndex = s.length - 2; sIndex >= 0; sIndex--) {
    if (sW[s.substring(sIndex)]) return true;
  }
  return false;
}
function getUnicode(t, ll, html) {
  var u = "";
  var stopPos = 0;
  var ar = t.split("+");
  if (
    ll &&
    ar &&
    ar.length > 1 &&
    sW["smartconverter_on"] == "true" &&
    ar[ar.length - 1] == "2381"
  )
    /* remove trailing short characther so that swagatam = swagatama */ stopPos = 1;
  if (ar)
    for (k = 0; k < ar.length - stopPos; k++)
      if (ar[k].length > 0 && !html) u += String.fromCharCode(ar[k]);
      else if (ar[k].length > 0 && html) u += "&#" + ar[k] + ";";
  return u;
}
function getAllUnicode(s, html) {
  var allUnicode = "";
  var u;
  var tryString = s;
  tryString = tryString
    .replace(/T/g, "^^t^^")
    .replace(/D/g, "^^d^^")
    .replace(/N/g, "^^n^^")
    .replace(/SH/g, "^^sh^^")
    .replace(/Sh/g, "^^sh^^");
  tryString = tryString.toLowerCase();
  tryString = tryString
    .replace(/\^\^t\^\^/g, "T")
    .replace(/\^\^d\^\^/g, "D")
    .replace(/\^\^n\^\^/g, "N")
    .replace(/\^\^sh\^\^/g, "Sh");
  var nextTryString = "";
  while (tryString.length > 0) {
    u = uD[tryString];
    if (u || tryString.length <= 1) {
      if (u)
        allUnicode += getUnicode(
          u,
          !(nextTryString.replace(/^\s+|\s+|\\$/, "").length > 0),
          html
        );
      else allUnicode += tryString;
      tryString = nextTryString;
      nextTryString = "";
    } else {
      nextTryString = tryString.charAt(tryString.length - 1) + nextTryString;
      tryString = tryString.substring(0, tryString.length - 1);
    }
  }
  if (allUnicode.length == 0) return s;
  else return allUnicode;
}

function translate(source, destination, html, smart) {
  html = false;
  var input = source.value;
  var beginIndex = 0;
  var endIndex = -1;
  var engTokens = new Object();
  var token = "";
  var tokenCount = 1;
  var mask = "";
  while (beginIndex > -1 && endIndex < input.length - 1) {
    beginIndex = input.indexOf("{", endIndex + 1);
    if (beginIndex > -1) {
      endIndex = input.indexOf("}", beginIndex + 1);
      if (endIndex == -1) endIndex = input.length - 1;
      token = input.substring(beginIndex, endIndex + 1);
      mask = "$-" + tokenCount + "-$";
      engTokens[mask] = token.substring(1, token.length - 1);
      input = input.replace(token, mask);
      endIndex = endIndex - token.length + mask.length;
      tokenCount++;
    }
  }
  var nonSmartTokens = new Object();
  var unicode = translateWords(input, html);
  for (mask in engTokens) {
    unicode = unicode.replace(
      translateWords(mask, html).replace(" ", ""),
      engTokens[mask]
    );
  }
  console.log(unicode);
  destination.value = unicode;
}
function isVowel(c) {
  c = c.toLowerCase();
  if ((c && c == "a") || c == "e" || c == "i" || c == "o" || c == "u")
    return true;
  return false;
}
function smartConverter(smartflag) {
  if (smartflag) {
    for (var specialWord in sW) uD[specialWord] = sW[specialWord];
    sW["smartconverter_on"] = "true";
  } else {
    for (var specialWord in sW) if (uD[specialWord]) uD[specialWord] = null;
    sW["smartconverter_on"] = null;
  }
}
cR["ba"] = "2348";
cR["bha"] = "2349";
cR["ca"] = "2325";
cR["cha"] = "2330";
cR["chha"] = "2331";
cR["Da"] = "2337";
cR["da"] = "2342";
cR["dha"] = "2343";
cR["Dha"] = "2338";
cR["fa"] = "2347";
cR["ga"] = "2327";
cR["gha"] = "2328";
cR["gya"] = "2332+2381+2334";
cR["ha"] = "2361";
cR["ja"] = "2332";
cR["jha"] = "2333";
cR["ka"] = "2325";
cR["kha"] = "2326";
cR["ksha"] = "2325+2381+2359";
cR["la"] = "2354";
cR["ma"] = "2350";
cR["Na"] = "2339";
cR["na"] = "2344";
cR["Nepala"] = "2344+2375+2346+2366+2354";
cR["nga"] = "2329";
cR["pa"] = "2346";
cR["pha"] = "2347";
cR["qa"] = "2325";
cR["ra"] = "2352";
cR["sa"] = "2360";
cR["sha"] = "2358";
cR["Sha"] = "2359";
cR["ta"] = "2340";
cR["Ta"] = "2335";
cR["Tha"] = "2336";
cR["tha"] = "2341";
cR["va"] = "2357";
cR["wa"] = "2357";
cR["xa"] = "2325+2381+2360";
cR["ya"] = "2351";
cR["yna"] = "2334";
cR["za"] = "2332";
uD["*"] = "2306";
uD["**"] = "2305";
uD["."] = "2404";
uD["\\"] = "2381";
uD["0"] = "2406";
uD["1"] = "2407";
uD["2"] = "2408";
uD["3"] = "2409";
uD["4"] = "2410";
uD["5"] = "2411";
uD["6"] = "2412";
uD["7"] = "2413";
uD["8"] = "2414";
uD["9"] = "2415";
uD["a"] = "2309";
uD["aa"] = "2310";
uD["ai"] = "2320";
uD["am"] = "2309+2381";
uD["au"] = "2324";
uD["aum"] = "2384";
uD["e"] = "2319";
uD["i"] = "2311";
uD["ii"] = "2312";
uD["o"] = "2323";
uD["om"] = "2384";
uD["oo"] = "2314";
uD["ri^"] = "2381+2352+2367+";
uD["rr"] = "2352+2381+8205";
uD["rree"] = "2400";
uD["rri"] = "2315";
uD["u"] = "2313";
for (var conso in cR) {
  if (!uD[conso]) uD[conso] = cR[conso];
  if (!uD[conso + "a"]) uD[conso + "a"] = cR[conso] + "+2366";
  var consoMinusA = conso.substring(0, conso.length - 1);
  var consoVal = cR[conso];
  if (!uD[consoMinusA + "i"]) uD[consoMinusA + "i"] = consoVal + "+2367";
  if (!uD[consoMinusA + "ee"]) uD[consoMinusA + "ee"] = consoVal + "+2368";
  if (!uD[consoMinusA + "u"]) uD[consoMinusA + "u"] = consoVal + "+2369";
  if (!uD[consoMinusA + "oo"]) uD[consoMinusA + "oo"] = consoVal + "+2370";
  if (!uD[consoMinusA + "ri"]) uD[consoMinusA + "ri"] = consoVal + "+2371";
  if (!uD[consoMinusA + "e"]) uD[consoMinusA + "e"] = consoVal + "+2375";
  if (!uD[consoMinusA + "ai"]) uD[consoMinusA + "ai"] = consoVal + "+2376";
  if (!uD[consoMinusA + "o"]) uD[consoMinusA + "o"] = consoVal + "+2379";
  if (!uD[consoMinusA + "au"]) uD[consoMinusA + "au"] = consoVal + "+2380";
  if (!uD[consoMinusA]) uD[consoMinusA] = consoVal + "+2381";
}
cR = null;

function selectAll(txtbox) {
  if (txtbox.createTextRange) {
    /*IE*/ t = txtbox.createTextRange();
    if (t.select) t.select();
    if (t.execCommand) t.execCommand("copy");
  }
  if (txtbox.setSelectionRange) {
    /*Mozilla*/ txtbox.setSelectionRange(0, txtbox.value.length);
  } else if (txtbox.createTextRange) {
    /*Opera 8*/ var r = txtbox.createTextRange();
    r.select();
  }
  if (txtbox.focus) txtbox.focus();
}
var liveConverstion;

function translateToUnicode(source) {
  var input = source;
  var beginIndex = 0;
  var endIndex = -1;
  var engTokens = new Object();
  var token = "";
  var tokenCount = 1;
  var mask = "";
  while (beginIndex > -1 && endIndex < input.length - 1) {
    beginIndex = input.indexOf("{", endIndex + 1);
    if (beginIndex > -1) {
      endIndex = input.indexOf("}", beginIndex + 1);
      if (endIndex == -1) endIndex = input.length - 1;
      token = input.substring(beginIndex, endIndex + 1);
      mask = "$-" + tokenCount + "-$";
      engTokens[mask] = token.substring(1, token.length - 1);
      input = input.replace(token, mask);
      endIndex = endIndex - token.length + mask.length;
      tokenCount++;
    }
  }
  var unicode = translateWords(input, false);
  for (mask in engTokens) {
    unicode = unicode.replace(
      translateWords(mask, false).replace(" ", ""),
      engTokens[mask]
    );
  }
  return unicode;
}
