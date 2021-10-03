extractHostname = (url) => {
    let hostname = url.indexOf("//") > -1 ? url.split('/')[2] : url.split('/')[0];
    // find & remove port number
    hostname = hostname.split(':')[0];
    // find & remove "?"
    hostname = hostname.split('?')[0];
    return hostname;
  };

  setByteLengthPerOrigin = (origin, byteLength) => {
    const stats = localStorage.getItem('stats');
    const statsJson = null === stats ? {} : JSON.parse(stats);
    let bytePerOrigin = undefined === statsJson[origin] ? 0 : parseInt(statsJson[origin]);
    statsJson[origin] = bytePerOrigin + byteLength;
    localStorage.setItem('stats', JSON.stringify(statsJson));
  console.log(stats);
  };


  listener = (details) => {
    const responseHeadersFileType = details.responseHeaders.find(element => element.name.toLowerCase() === "content-type");
    if (responseHeadersFileType === "application/octet-stream" || responseHeadersFileType === "video/mp4" ){

       if (typeof(browser) === 'undefined'){
    const responseHeadersContentLength = details.responseHeaders.find(element => element.name.toLowerCase() === "content-length");
    const contentLength = undefined === responseHeadersContentLength ? {value: 0}
      : responseHeadersContentLength;
     const requestSize = parseInt(contentLength.value, 10);
     setByteLengthPerOrigin(origin, requestSize);

     }else{
      
      let filter = chrome.webRequest.filterResponseData(details.requestId);

      filter.ondata = event => {
        const origin = extractHostname(!details.originUrl ? details.url : details.originUrl);
        setByteLengthPerOrigin(origin, event.data.byteLength);
    
        filter.write(event.data);
      };
    
      filter.onstop = () => {
        filter.disconnect();
      };
    
      return {};}
    
     
}
}


    

  chrome.webRequest.onHeadersReceived.addListener(
    listener,             
    {urls: ['<all_urls>']}, 
    ['responseHeaders'],
    
    

                
    
  )

