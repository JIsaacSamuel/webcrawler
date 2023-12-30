// Required
const { JSDOM } = require('jsdom')

// Functions
async function crawlPage(baseURL, currentURL, pages) {
  const currentUrlObj = new URL(currentURL)
  const baseUrlObj = new URL(baseURL)
  if (currentUrlObj.hostname !== baseUrlObj.hostname){
    return pages
  }
  
  const normalizedURL = normalizeURL(currentURL)

  // if we've already visited this page
  // just increase the count and don't repeat
  // the http request
  if (pages[normalizedURL] > 0){
    pages[normalizedURL]++
    return pages
  }

  // initialize this page in the map
  // since it doesn't exist yet
  if (currentURL === baseURL){
    // don't count the base URL as a link to itself
    pages[normalizedURL] = 0
  } else {
    pages[normalizedURL] = 1
  }

  // fetch and parse the html of the currentURL
  // console.log(`crawling ${currentURL}`)
  let htmlBody = ''
  try {
    const resp = await fetch(currentURL)
    if (resp.status > 399){
      console.log(`Got HTTP error, status code: ${resp.status}`)
      return pages
    }
    const contentType = resp.headers.get('content-type')
    if (!contentType.includes('text/html')){
      console.log(`Got non-html response: ${contentType}`)
      return pages
    }
    htmlBody = await resp.text()
  } catch (err){
    console.log(err.message)
  }

  const nextURLs = getURLsFromHTML(htmlBody, baseURL)
  for (const nextURL of nextURLs){
    pages = await crawlPage(baseURL, nextURL, pages)
  }

  return pages
}

function normalizeURL(url) {
    const list = url.split('//')
    const link = list[1].toLowerCase()
    return link[link.length - 1] === '/' ? link.substring(0, link.length - 1) : link
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const strdoc = new JSDOM(htmlBody)
    strdoc.window.document.querySelectorAll('a').forEach(link => {
        try {
            urls.push(new URL(link, baseURL).href)
        } catch (err) {
            console.log(`Following error occured: ${err.message}`)
        }
    })
    return urls
}

// Exports
module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}
  