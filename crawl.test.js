const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

test('normalizeURL protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
  })
  
  test('normalizeURL slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
  })
  
  test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
  })
  
  test('normalizeURL http', () => {
    const input = 'http://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
  })


// Parsing link
test('getURL noUrl', () => {
    const input = '<head>This is head</head><p>And this is a para<p>'
    const baseURL = 'boot.dev'
    const actual = getURLsFromHTML(input, baseURL)
    const expected = []
    expect(actual).toEqual(expected)
})

test('getURL slashbaseUrl', () => {
    const input = '<head>This is head</head><a href="https://www.w3schools.com/git/git_commit.asp?remote=github">link1</a><a href="/git/git_pull_from_remote.asp?remote=github">link2</a>'
    const baseURL = 'https://www.w3schools.com/'
    const actual = getURLsFromHTML(input, baseURL)
    const expected = ['https://www.w3schools.com/git/git_commit.asp?remote=github', 
    'https://www.w3schools.com/git/git_pull_from_remote.asp?remote=github'
    ]
    expect(actual).toEqual(expected)
})