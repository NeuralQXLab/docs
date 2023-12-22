function FindProxyForURL(url, host)
{
  if (shExpMatch(url, "jupyterhub.idris.fr/*")) {
    return "SOCKS localhost:9156";
  } else {
    return "DIRECT";
  }
}
