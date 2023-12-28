// Required
const { JSDOM } = require('jsdom')

// Functions
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
    getURLsFromHTML
}
  