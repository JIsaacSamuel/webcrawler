const { crawlPage } = require('./crawl.js')

function main(){
    // if (process.argv.length < 3){
    //   console.log('no website provided')
    // }
    // if (process.argv.length > 3){
    //   console.log('too many arguments provided')
    // }
  
    // const baseURL = process.argv[2]
  
    // console.log(`starting crawl of: ${baseURL}...`)
    const readline = require('node:readline').createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      readline.question(`Enter link to crawl: `, name => {
        try {
            const requrl = new URL(name)
            console.log(`starting crawl of: ${name}...`)
            crawlPage(name)
        } catch (err) {
            console.log(err.message)
        }
        readline.close();
      });
}
  
main()