// Required
const { JSDOM } = require('jsdom')

// Functions
async function crawlPage(basicURL) {
    const webpage = await fetch(basicURL, {})
    // const webpagejson = await webpage.json()
    try {
        if(webpage.status >= 400){
            console.log('Error: 400+')
        } 
        const conttype = webpage.headers.get('content-type')
        if (!conttype.includes('text/html')) {
            console.log('Content type not supported')
        } else {
            const requrls = getURLsFromHTML(await webpage.text(), basicURL)
            for(let x of requrls){
                console.log(x)
            }
        }
    } catch (err) {
        console.log(`An unexpected error orrcured: ${err.message}`)
    }
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
  